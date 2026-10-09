import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
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
  if (
    typeof id !== "string" ||
    !/^model-0[1-6]$/.test(id) ||
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
    const path = `${id}/${Date.now()}.${allowedTypes[file.type]}`;
    const { error: uploadError } = await supabase.storage
      .from(getProductBucket())
      .upload(path, file, { contentType: file.type, upsert: true });
    if (uploadError) throw uploadError;

    const imageUrl = supabase.storage.from(getProductBucket()).getPublicUrl(path).data.publicUrl;
    const { data, error } = await supabase
      .from("products")
      .update({ image_url: imageUrl })
      .eq("id", id)
      .select("id, name, description, image_url, sort_order")
      .single();
    if (error) throw error;

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar a foto. Confira a configuração do armazenamento." },
      { status: 503 },
    );
  }
}
