import { NextResponse } from "next/server";
import type { NextFetchEvent } from "next/server";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { routing } from "./i18n/routing";

const locales = routing.locales;
const defaultLocale = routing.defaultLocale || "en";

// Wrap NextAuth for protected routes only
const authMiddleware = withAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
});

export default function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/trpc") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/robots.txt") ||
    /\.[\w]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Do not locale-redirect auth pages to avoid conflicts
  const isAuthRoute = /\/auth(\/.*)?$/.test(
    pathname.replace(/^\/[a-z]{2}/, ""),
  );

  //redirect to default route
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale && !isAuthRoute) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, req.url),
    );
  }

  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;

  const isSupportedLocale = (val: string): val is "en" | "vi" | "kr" =>
    (routing.locales as unknown as string[]).includes(val);
  // If cookie locale exists
  const currentLocale = pathname.split("/")[1];
  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    if (currentLocale !== cookieLocale && !isAuthRoute) {
      const rest = pathname.replace(/^\/(en|vi|kr)/, "");
      return NextResponse.redirect(
        new URL(`/${cookieLocale}${rest || "/"}`, req.url),
      );
    }
  }

  if (/^\/(en|vi|kr)\/user\//.test(pathname)) {
    return authMiddleware(req, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
