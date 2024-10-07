import { NextResponse } from "next/server";

export async function middleware(request) {
  const authCookie = request.cookies.get("access_token_cookie");
  if (!authCookie) {
    return NextResponse.redirect(
      new URL("/?login=false", request.url).toString()
    );
  }
  const allCookies = request.cookies.getAll();
  const cookieValue = allCookies.reduce((acc, cookie) => {
    return `${acc}${cookie.name}=${cookie.value}; `;
  }, "");

  const response = await fetch(`${process.env.BACKEND_URL}/api/auth/status`, {
    headers: {
      Cookie: cookieValue,
    },
  });
  if (response.status !== 200) {
    return NextResponse.redirect(
      new URL("/?login=false", request.url).toString()
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
