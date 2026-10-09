import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Entre no painel para continuar." }, { status: 401 });
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("products")
      .select("id, name, description, image_url, sort_order")
      .order("sort_order");
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar os produtos. Confira a configuração do Supabase." },
      { status: 503 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Entre no painel para continuar." }, { status: 401 });
  }

  let body: { id?: unknown; name?: unknown; description?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  if (
    typeof body.id !== "string" ||
    !/^model-0[1-6]$/.test(body.id) ||
    typeof body.name !== "string" ||
    typeof body.description !== "string"
  ) {
    return NextResponse.json({ error: "Confira o nome e a descrição." }, { status: 400 });
  }

  const name = body.name.trim();
  const description = body.description.trim();
  if (!name || name.length > 60 || description.length > 240) {
    return NextResponse.json(
      { error: "O nome deve ter até 60 caracteres e a descrição até 240." },
      { status: 400 },
    );
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("products")
      .update({ name, description })
      .eq("id", body.id)
      .select("id, name, description, image_url, sort_order")
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Não foi possível salvar. Confira o Supabase." }, { status: 503 });
  }
}
