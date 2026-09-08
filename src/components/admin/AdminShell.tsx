import { useState } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { ClipboardList, LayoutDashboard, LogOut, Menu, Store, X } from "lucide-react";

import logoFerracini from "@/assets/logo-ferracini.png";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/lib/admin/auth";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/pedidos", label: "Pedidos", icon: ClipboardList, exact: false },
];

export function AdminShell() {
  const { user, signOut } = useAdminAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-dark font-body text-foreground">
      <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-dark/90 px-4 backdrop-blur-md md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
            className="rounded-xl border border-white/10 p-2 transition-colors hover:border-brand-yellow/40 lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <img
            src={logoFerracini}
            alt="Ferracini Lanches"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <div className="leading-tight">
            <p className="font-display text-lg uppercase tracking-tight">
              Ferracini <span className="text-brand-yellow">Admin</span>
            </p>
            <p className="hidden text-[11px] uppercase tracking-widest text-muted-foreground sm:block">
              Gestão de pedidos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs uppercase tracking-widest text-muted-foreground sm:block">
            {user?.usuario}
          </span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-colors hover:border-brand-red/50 hover:text-brand-red"
          >
            <LogOut className="size-4" />
            Sair
          </button>
        </div>
      </header>

      <div className="flex pt-20">
        <aside
          className={cn(
            "fixed bottom-0 left-0 top-20 z-40 w-64 border-r border-white/10 bg-surface p-4 transition-transform lg:translate-x-0",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="flex flex-col gap-2">
            {NAV.map(({ to, label, icon: Icon, exact }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors",
                  isActive(to, exact)
                    ? "bg-brand-yellow text-dark"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>

          <a
            href="/"
            className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:border-brand-yellow/40 hover:text-brand-yellow"
          >
            <Store className="size-4" />
            Ver o site
          </a>
        </aside>

        <main className="w-full px-4 py-8 md:px-8 lg:pl-72">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
