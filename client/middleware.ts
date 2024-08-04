import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";

export async function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("token")?.value || null;

  const { pathname } = req.nextUrl;

  if ((!token && pathname.startsWith("/auth")) || pathname === "/") {
    return NextResponse.next();
  } else if (!token && !pathname.startsWith("/auth") && pathname !== "/") {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }

  const authCookie = req.cookies.get("auth");
  const { role } = authCookie ? JSON.parse(authCookie.value) : null;

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const { data } = await axios.get(`/auth/verify/${role ? role : "admin"}`);
    const { message, success, user } = data;

    if (success) {
      // User is authorized

      if (pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      req.cookies.get("auth") && req.cookies.delete("auth");
      req.cookies.set("auth", JSON.stringify(user));
      return NextResponse.next();
    }
  } catch (error: any) {
    // Default to redirect to sign-in if not authorized and not in /auth path
    if (!pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }
  }

  // Continue to next if none of the conditions were met
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
