import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextApiRequest, NextApiResponse } from "next";

export const publicRoutes = [
  "https://dummy-six-azure.vercel.app/",
  "https://dummy-six-azure.vercel.app/auth/new-verification",
  "https://dummy-six-azure.vercel.app/about-us",
  "https://dummy-six-azure.vercel.app/password-reset",
  "https://dummy-six-azure.vercel.app/contact-us",
  "https://dummy-six-azure.vercel.app/categories",
  "https://dummy-six-azure.vercel.app/favicon.ico" // Ensure favicon is handled
];

// Routes that require authentication
export const authRoutes = [
  "https://dummy-six-azure.vercel.app/password-reset",
  "https://dummy-six-azure.vercel.app/login",
  "https://dummy-six-azure.vercel.app/signup",
  "https://dummy-six-azure.vercel.app/password-reset"
];

// Restricted routes for logged-in users
const restrictedRoutes = [
  "https://dummy-six-azure.vercel.app/checkout",
  "https://dummy-six-azure.vercel.app/account-settings"
];

// API routes that require authentication
export const apiAuthPrefix = "/api/auth";

// Default login redirect path
export const DEFAULT_LOGIN_REDIRECT_PATH = "https://dummy-six-azure.vercel.app/";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  try {
    console.log(`Handling request for: ${nextUrl.pathname}`);

    const userLoggedIn = req.auth ? true : false;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some(route => nextUrl.pathname === route || nextUrl.pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isRestrictedRoute = restrictedRoutes.some(route => nextUrl.pathname === route || nextUrl.pathname.startsWith(route));

    if (isApiAuthRoute) {
      console.log("API auth route, proceeding without checks.");
      return null;
    }

    if (isAuthRoute) {
      if (userLoggedIn) {
        console.log("User logged in, redirecting to default path.");
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_PATH, nextUrl));
      }
      console.log("Auth route, but user not logged in.");
      return null;
    }

    if (isRestrictedRoute) {
      if (!userLoggedIn) {
        console.log("Restricted route and user not logged in, redirecting to home.");
        return Response.redirect(new URL("/", nextUrl));
      }
    }

    if (!userLoggedIn && !isPublicRoute) {
      console.log("User not logged in and route is not public, redirecting to login.");
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    console.log("Route allowed, proceeding.");
    return null;
  } catch (error) {
    console.error(`Error handling request for ${nextUrl.pathname}:`, error);
    throw error;
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.ico$|.*\\.png$).*)", // Exclude certain paths
  ],
};
