import { NextResponse } from "next/server";
import { defaultProducts } from "@/lib/products";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (
    !process.env.SUPABASE_URL ||
    !(process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
  ) {
    return NextResponse.json(defaultProducts);
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("products")
      .select("id, name, description, image_url, sort_order")
      .order("sort_order");

    if (error || !data?.length) return NextResponse.json(defaultProducts);

    return NextResponse.json(
      data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || "",
        image: product.image_url,
        alt: `${product.name} da Merena`,
      })),
    );
  } catch {
    return NextResponse.json(defaultProducts);
  }
}
