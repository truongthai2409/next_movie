"use client";

import { LoadingVideo } from "@/components";

export default function GlobalLoading() {
  return (
    <>
      <div className="h-[600px] lg:h-[80vh] bg-black w-full flex items-center justify-center">
        <LoadingVideo />
      </div>
    </>
  );
}
