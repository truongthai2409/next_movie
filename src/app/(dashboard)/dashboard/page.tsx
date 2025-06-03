// "use client";

import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Homepage = () => {
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated" && session?.supabaseAccessToken) {
  //     const supabase = createClient(
  //       process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //       {
  //         global: {
  //           headers: {
  //             Authorization: `Bearer ${session.supabaseAccessToken}`,
  //           },
  //         },
  //       }
  //     );

  //     supabase
  //       .from("users")
  //       .select("*")
  //       .then(({ data, error }) => {
  //         console.log("Data:", data);
  //         if (error) console.error("Error:", error);
  //       });
  //   }
  // }, [session, status]);

  // if (status === "loading") {
  //   return (
  //     <video
  //       src="/LoadingAnimation.webm"
  //       autoPlay
  //       loop
  //       muted
  //       className="w-32 h-32"
  //     />
  //   );
  // }

  // if (status === "unauthenticated") {
  //   return <div>Please sign in to continue</div>;
  // }

  return (
    <>
      <div className="pt-10"></div>
      <Link href="/">hi</Link>
      <br></br>
      <Link href="/">go to home</Link>
    </>
  );
};

export default Homepage;
