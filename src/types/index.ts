import { DefaultSession } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider?: string;
    } & DefaultSession["user"];
  }
}

export * from "./movies.types";
export * from "./comon.types";
export * from "./auth.types";
