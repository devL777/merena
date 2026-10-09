import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { defaultSiteAssets } from "@/lib/site-assets";
import { getProductBucket, getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Entre no painel para continuar." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Selecione uma imagem." }, { status: 400 });
  }

  const id = form.get("id");
  const file = form.get("image");
  const asset = defaultSiteAssets.find((item) => item.id === id);
  if (
    !asset ||
    !(file instanceof File) ||
    !allowedTypes[file.type] ||
    file.size > 5 * 1024 * 1024
  ) {
    return NextResponse.json(
      { error: "Use uma imagem JPG, PNG ou WebP de até 5 MB." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const path = `site-assets/${asset.id}/${Date.now()}.${allowedTypes[file.type]}`;
    const { error: uploadError } = await supabase.storage
      .from(getProductBucket())
      .upload(path, file, { contentType: file.type, upsert: true });
    if (uploadError) throw uploadError;

    const imageUrl = supabase.storage.from(getProductBucket()).getPublicUrl(path).data.publicUrl;
    const { data, error } = await supabase
      .from("site_assets")
      .update({ image_url: imageUrl })
      .eq("id", asset.id)
      .select("id, label, description, image_url, alt, recommendation, sort_order")
      .single();
    if (error) throw error;

    return NextResponse.json({ ...data, image: data.image_url });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar a foto. Confira a configuração do armazenamento." },
      { status: 503 },
    );
  }
}
