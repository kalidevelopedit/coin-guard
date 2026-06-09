import { AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0f14]">
      <div className="w-full max-w-md mx-4 bg-[#0d1318] border border-white/10 rounded-xl p-8 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2" data-testid="text-404">404</h1>
        <p className="text-sm text-gray-400 mb-6" data-testid="text-not-found">
          The page you are looking for does not exist.
        </p>
        <Button
          className="bg-[#22c55e] text-black font-semibold"
          onClick={() => { setLocation("/"); window.scrollTo(0, 0); }}
          data-testid="button-go-home"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
