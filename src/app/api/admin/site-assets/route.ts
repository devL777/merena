import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { defaultSiteAssets } from "@/lib/site-assets";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Entre no painel para continuar." }, { status: 401 });
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("site_assets")
      .select("id, label, description, image_url, alt, recommendation, sort_order")
      .order("sort_order");
    if (error) throw error;

    return NextResponse.json(
      (data || []).map((asset) => ({ ...asset, image: asset.image_url })),
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Não foi possível carregar as fotos do site. Execute o SQL atualizado do arquivo supabase/setup.sql no Supabase.",
      },
      { status: 503 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Entre no painel para continuar." }, { status: 401 });
  }

  let body: { id?: unknown; image?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const asset = defaultSiteAssets.find((item) => item.id === body.id);
  if (!asset || typeof body.image !== "string" || !body.image.trim()) {
    return NextResponse.json({ error: "Selecione uma foto válida." }, { status: 400 });
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("site_assets")
      .update({ image_url: body.image.trim() })
      .eq("id", asset.id)
      .select("id, label, description, image_url, alt, recommendation, sort_order")
      .single();
    if (error) throw error;
    return NextResponse.json({ ...data, image: data.image_url });
  } catch {
    return NextResponse.json({ error: "Não foi possível salvar a foto do site." }, { status: 503 });
  }
}
