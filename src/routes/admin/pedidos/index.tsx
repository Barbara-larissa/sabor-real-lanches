import { createFileRoute } from "@tanstack/react-router";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const Route = createFileRoute("/admin/pedidos/")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white flex">
      <AdminSidebar />

      <section className="flex-1 p-10">
        <h1 className="text-5xl font-extrabold text-[#D4AF37]">
          Painel Administrativo
        </h1>

        <p className="mt-4 text-gray-400">
          Bem-vindo ao painel administrativo da Sabor Real.
        </p>
      </section>
    </main>
  );
}