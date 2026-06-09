import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";

interface WalletState {
  address: string | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  requestPayment: () => Promise<string | null>;
}

const WalletContext = createContext<WalletState | null>(null);

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signAndSendTransaction: (transaction: unknown) => Promise<{ signature: string }>;
      publicKey?: { toString: () => string } | null;
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      off: (event: string, handler: (...args: unknown[]) => void) => void;
    };
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
    };
  }
}

const PAYMENT_AMOUNT_SOL = 0.013;
const PAYMENT_LAMPORTS = Math.floor(PAYMENT_AMOUNT_SOL * 1_000_000_000);
const SOL_RECEIVER = "TaZqDjCiBEhLRX1pJexr2oAX87aigSQd79ZpSLomZZj";

let solanaWebJs: typeof import("@solana/web3.js") | null = null;

async function getSolanaLib() {
  if (!solanaWebJs) {
    solanaWebJs = await import("@solana/web3.js");
  }
  return solanaWebJs;
}

async function getBlockhashFromServer(): Promise<{ blockhash: string; lastValidBlockHeight: number }> {
  const res = await fetch("/api/solana/blockhash");
  if (!res.ok) {
    const text = await res.text().catch(() => "unknown");
    throw new Error("Failed to get Solana blockhash: " + text);
  }
  const data = await res.json();
  if (!data || typeof data.blockhash !== "string" || !data.blockhash) {
    throw new Error("Invalid blockhash response: " + JSON.stringify(data));
  }
  return { blockhash: String(data.blockhash), lastValidBlockHeight: Number(data.lastValidBlockHeight) };
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConnected = !!address;

  const connect = useCallback(async () => {
    const provider = window.solana;
    if (!provider) {
      setError("Phantom wallet not detected. Please install the Phantom browser extension.");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const response = await provider.connect();
      setAddress(response.publicKey.toString());
    } catch (err: unknown) {
      const e = err as { code?: number; message?: string };
      if (e.code === 4001 || (e.message && e.message.includes("rejected"))) {
        setError("Connection rejected by user.");
      } else {
        setError(e.message || "Failed to connect wallet.");
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try { await window.solana?.disconnect(); } catch {}
    setAddress(null);
    setError(null);
  }, []);

  const requestPayment = useCallback(async (): Promise<string | null> => {
    setError(null);
    const provider = window.solana;
    if (!provider || !address) {
      setError("Wallet not connected.");
      return null;
    }

    const maxAttempts = 2;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const [bhData, { PublicKey, Transaction, SystemProgram }] = await Promise.all([
          getBlockhashFromServer(),
          getSolanaLib(),
        ]);

        const fromPubkey = new PublicKey(address);
        const toPubkey = new PublicKey(SOL_RECEIVER);

        const transaction = new Transaction({
          recentBlockhash: bhData.blockhash,
          lastValidBlockHeight: bhData.lastValidBlockHeight,
          feePayer: fromPubkey,
        }).add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: PAYMENT_LAMPORTS,
          })
        );

        const { signature } = await provider.signAndSendTransaction(transaction);
        return signature;
      } catch (err: unknown) {
        const e = err as { code?: number; message?: string };
        const msg = e.message || "";
        if (e.code === 4001 || msg.includes("rejected") || msg.includes("cancelled") || msg.includes("User rejected") || msg.includes("denied")) {
          setError("Payment rejected by user.");
          return null;
        }
        if (attempt < maxAttempts - 1 && (msg.includes("Blockhash") || msg.includes("blockhash") || msg.includes("expired"))) {
          continue;
        }
        setError(msg || "Payment failed. Please try again.");
        return null;
      }
    }
    return null;
  }, [address]);

  useEffect(() => {
    const provider = window.solana;
    if (!provider) return;
    const handleDisconnect = () => setAddress(null);
    provider.on("disconnect", handleDisconnect);
    return () => { provider.off("disconnect", handleDisconnect); };
  }, []);

  return (
    <WalletContext.Provider
      value={{ address, isConnecting, isConnected, error, connect, disconnect, requestPayment }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
