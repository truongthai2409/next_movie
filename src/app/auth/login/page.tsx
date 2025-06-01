"use client";
import { LoginForm } from "@/components";
import { useProtectedRoute } from "@/hooks";
import React, { Suspense } from "react";

const LoginPage = () => {
  useProtectedRoute();
  return (
    <Suspense
      fallback={
        <video
          src="/LoadingAnimation.webm"
          autoPlay
          loop
          muted
          className="w-32 h-32"
        />
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
