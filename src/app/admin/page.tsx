"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [status, setStatus] = useState("Testando conexão...");

  useEffect(() => {
    async function testarConexao() {
      try {
        const { error } = await supabase.auth.getSession();

        if (error) {
          setStatus(`Erro: ${error.message}`);
          return;
        }

        setStatus("Supabase conectado com sucesso.");
      } catch {
        setStatus("Não foi possível conectar ao Supabase.");
      }
    }

    testarConexao();
  }, []);

  return (
    <main className="min-h-screen bg-[#f4efe5] px-6 py-16 text-[#34422d]">
      <div className="mx-auto max-w-xl rounded-2xl border border-[#34422d]/10 bg-white/50 p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#788268]">
          Merena Admin
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          Teste do Supabase
        </h1>

        <p className="mt-5 text-base text-[#66705d]">
          {status}
        </p>
      </div>
    </main>
  );
}