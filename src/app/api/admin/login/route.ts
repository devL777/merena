import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminEnvironmentReady,
  createAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";

const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 12,
};

export async function POST(request: Request) {
  if (!adminEnvironmentReady()) {
    return NextResponse.json(
      { error: "O acesso do painel ainda precisa ser configurado." },
      { status: 503 },
    );
  }

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Informe a senha." }, { status: 400 });
  }

  if (typeof body.password !== "string" || !verifyAdminPassword(body.password)) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  (await cookies()).set(ADMIN_COOKIE, createAdminSession(), sessionCookieOptions);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  (await cookies()).delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
