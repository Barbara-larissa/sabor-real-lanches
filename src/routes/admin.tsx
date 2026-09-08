import { createFileRoute } from "@tanstack/react-router";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin/auth";
import { AdminOrdersProvider } from "@/lib/admin/orders-context";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminGate() {
  const { user, ready } = useAdminAuth();

  if (!ready) {
    return <div className="min-h-screen bg-dark" />;
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <AdminOrdersProvider>
      <AdminShell />
    </AdminOrdersProvider>
  );
}

function AdminLayout() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
