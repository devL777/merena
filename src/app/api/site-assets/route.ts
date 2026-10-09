import { NextResponse } from "next/server";
import { defaultSiteAssets } from "@/lib/site-assets";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (
    !process.env.SUPABASE_URL ||
    !(process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY)
  ) {
    return NextResponse.json(defaultSiteAssets);
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("site_assets")
      .select("id, label, description, image_url, alt, recommendation, sort_order")
      .order("sort_order");

    if (error || !data?.length) return NextResponse.json(defaultSiteAssets);

    return NextResponse.json(
      data.map((asset) => ({ ...asset, image: asset.image_url })),
    );
  } catch {
    return NextResponse.json(defaultSiteAssets);
  }
}
