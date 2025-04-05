"use client"

import { LoginForm } from "@/components";
// import { LoginCredentials, SocialProvider } from "@/types";
import React from "react";

const LoginPage = () => {
  // const handleSubmit = (credentials: LoginCredentials) => {
  //   // Handle email/password login
  //   console.log("Login:", credentials);
  // };

  // const handleSocialLogin = (provider: SocialProvider) => {
  //   // Handle social login
  //   console.log("Social login:", provider);
  // };
  return (
    <div>
      <LoginForm
        // onSubmit={handleSubmit}
        // onSocialLogin={handleSocialLogin}
        // isLoading={false}
      />
    </div>
  );
};

export default LoginPage;
