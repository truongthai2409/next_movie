"use client";
import React from "react";
import { useParams } from "next/navigation";
import { DetailsPage } from "@/components";

const Page = () => {
  const params = useParams<{ slug: string }>();
  return (
    <div className="bg-black">
      <DetailsPage slug={params.slug}/>
    </div>
  );
};

export default Page;
