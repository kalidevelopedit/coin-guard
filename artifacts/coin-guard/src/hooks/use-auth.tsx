import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

type SafeUser = Omit<User, "password">;

interface AuthContextType {
  user: SafeUser | null;
  isLoading: boolean;
  apply: (data: { name: string; email: string; phone: string }) => Promise<SafeUser>;
  checkStatus: (phone: string) => Promise<SafeUser>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<SafeUser>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useQuery<SafeUser | null>({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    staleTime: Infinity,
    retry: false,
  });

  const applyMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; phone: string }) => {
      const res = await fetch("/api/auth/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 409 && json.error === "duplicate" && json.user) {
          return { ...json.user, _duplicate: true };
        }
        throw new Error(json.message || json.error || "Application failed");
      }
      return json;
    },
    onSuccess: (data: SafeUser) => {
      queryClient.setQueryData(["/api/auth/me"], data);
    },
  });

  const checkStatusMutation = useMutation({
    mutationFn: async (phone: string) => {
      const res = await apiRequest("POST", "/api/auth/check-status", { phone });
      return await res.json();
    },
    onSuccess: (data: SafeUser) => {
      queryClient.setQueryData(["/api/auth/me"], data);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/me"], null);
      queryClient.clear();
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: Partial<User>) => {
      const res = await apiRequest("PATCH", "/api/auth/user", data);
      return await res.json();
    },
    onSuccess: (data: SafeUser) => {
      queryClient.setQueryData(["/api/auth/me"], data);
    },
  });

  const apply = useCallback(
    async (data: { name: string; email: string; phone: string }) => {
      return await applyMutation.mutateAsync(data);
    },
    [applyMutation]
  );

  const checkStatus = useCallback(
    async (phone: string) => {
      return await checkStatusMutation.mutateAsync(phone);
    },
    [checkStatusMutation]
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const updateUser = useCallback(
    async (data: Partial<User>) => {
      return await updateUserMutation.mutateAsync(data);
    },
    [updateUserMutation]
  );

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        apply,
        checkStatus,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
