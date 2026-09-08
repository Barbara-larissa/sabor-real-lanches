import { useState } from "react";

import logoFerracini from "@/assets/logo-ferracini.png";
import { useAdminAuth } from "@/lib/admin/auth";

export function AdminLogin() {
  const { signIn } = useAdminAuth();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!usuario.trim() || !senha.trim()) {
      setErro("Preencha usuário e senha.");
      return;
    }
    setLoading(true);
    try {
      await signIn(usuario, senha);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6 font-body text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-surface p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <img
            src={logoFerracini}
            alt="Ferracini Lanches"
            width={96}
            height={96}
            className="h-24 w-24 object-contain"
          />
          <h1 className="mt-4 font-display text-3xl uppercase tracking-tight">
            Painel <span className="text-brand-yellow">Administrativo</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acesso restrito à equipe do Ferracini Lanches.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-usuario"
              className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground"
            >
              Usuário
            </label>
            <input
              id="admin-usuario"
              type="text"
              autoComplete="username"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm outline-none transition-colors focus:border-brand-yellow"
              placeholder="admin"
            />
          </div>

          <div>
            <label
              htmlFor="admin-senha"
              className="mb-2 block text-[11px] font-black uppercase tracking-widest text-muted-foreground"
            >
              Senha
            </label>
            <input
              id="admin-senha"
              type="password"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm outline-none transition-colors focus:border-brand-yellow"
              placeholder="••••••••"
            />
          </div>

          {erro ? (
            <p
              role="alert"
              className="rounded-xl border border-brand-red/40 bg-brand-red/15 px-4 py-3 text-sm text-foreground"
            >
              {erro}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-red px-6 py-4 text-sm font-black uppercase tracking-tighter transition-colors hover:bg-brand-red/90 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Acesso de demonstração: <span className="text-brand-yellow">admin</span> /{" "}
          <span className="text-brand-yellow">ferracini</span>
        </p>
      </div>
    </div>
  );
}
