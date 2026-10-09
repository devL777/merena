import type { Metadata } from "next";
import { adminEnvironmentReady } from "@/lib/admin-auth";
import AdminPanel from "./admin-panel";

export const metadata: Metadata = {
  title: "Painel Merena",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminPanel configured={adminEnvironmentReady()} />;
}
