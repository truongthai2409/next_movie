
import { getAuthenticatedSupabase } from "@/config";
import { useSession } from "next-auth/react";

export const useSupabaseClient = () => {
  const { data: session } = useSession();
  const accessToken = session?.supabaseAccessToken;
  
  if (accessToken) {
    return getAuthenticatedSupabase(accessToken);
  }
};