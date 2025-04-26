import { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    supabaseAccessToken?: string
    // user?: DefaultSession["user"] & {
    //   id?: string
    // }
  }
  interface User extends DefaultSession["user"] {
    id?: string; // Include the 'id' property here
  }
}