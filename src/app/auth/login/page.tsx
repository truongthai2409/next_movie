"use client"
import { LoginForm } from "@/components";
import { useProtectedRoute } from "@/hooks";
import React, { Suspense } from "react";

const LoginPage = () => {
  useProtectedRoute();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm/>
    </Suspense>
  );
};

export default LoginPage;
