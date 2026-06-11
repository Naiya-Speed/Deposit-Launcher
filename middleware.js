export default function middleware(request) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  const auth = request.headers.get("authorization") || "";
  const [scheme, encoded] = auth.split(" ");

  if (scheme === "Basic" && encoded) {
    try {
      const decoded = atob(encoded);
      const colon = decoded.indexOf(":");
      const u = decoded.slice(0, colon);
      const p = decoded.slice(colon + 1);
      if (u === user && p === pass) return; // pass through
    } catch {}
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Deposit Launcher"' },
  });
}

export const config = { matcher: ["/(.*)"] };
