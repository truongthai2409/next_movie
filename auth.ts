import NextAuth from "next-auth";
import authOptions from "./auth.config";
// import authOptions from "@/app/api/auth/[...nextauth]/authOptions"; // hoặc nơi bạn lưu config

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
