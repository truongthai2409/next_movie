import { type DefaultSession } from "next-auth"
// DefaultSession
 
declare module "next-auth" {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    // A JWT which can be used as Authorization header with supabase-js for RLS.
    supabaseAccessToken?: string
  }
  interface User {
    id?: string; // nếu bạn dùng `user.id` trong jwt callback
  }
}