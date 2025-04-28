"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const useProtectedRoute = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load

    // if (!session && status === "unauthenticated") {
    //   // If user is not logged in, redirect to login page with callback URL
    //   const callbackUrl = encodeURIComponent(pathname || "/");
    //   router.push(`/auth/login?callbackUrl=${callbackUrl}`);
    // } else 

    if (session && pathname === "/auth/login") {
      // If user is logged in and on login page, redirect to home
      router.push("/");
    }
  }, [session, status, pathname, router]);
};