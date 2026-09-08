import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "ferracini-admin-session";

/**
 * Autenticação local de demonstração.
 * Estrutura pronta para trocar `signIn` por uma chamada à API / Lovable Cloud
 * sem alterar as telas do painel.
 */
const DEMO_USER = "admin";
const DEMO_PASS = "ferracini";

type AdminUser = { usuario: string };

type AuthContextValue = {
  user: AdminUser | null;
  ready: boolean;
  signIn: (usuario: string, senha: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AdminUser);
    } catch {
      /* sessão inválida — ignora */
    }
    setReady(true);
  }, []);

  const signIn = useCallback(async (usuario: string, senha: string) => {
    await new Promise((r) => setTimeout(r, 350));
    if (usuario.trim().toLowerCase() !== DEMO_USER || senha !== DEMO_PASS) {
      throw new Error("Usuário ou senha inválidos.");
    }
    const next = { usuario: usuario.trim() };
    setUser(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth deve ser usado dentro de AdminAuthProvider.");
  return ctx;
}
