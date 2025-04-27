"use client"
import { LoginForm } from "@/components";
import { useProtectedRoute } from "@/hooks";
import React from "react";

const LoginPage = () => {
  useProtectedRoute();
  return (
    <div>
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
