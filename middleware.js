import { NextResponse } from "next/server";

export function middleware(req) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  const auth = req.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");

  if (scheme === "Basic" && encoded) {
    const [u, p] = atob(encoded).split(":");
    if (u === user && p === pass) return NextResponse.next();
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Deposit Launcher"' },
  });
}

export const config = { matcher: ["/(.*)"] };
