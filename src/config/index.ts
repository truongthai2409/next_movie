import { initSocket } from "./socket/socket.config";
import { getAuthenticatedSupabase } from "./supabase/supabase.config";
import { TanStackProvider } from "./tanstack/tanstack_provider.config";
import { adapterOptions, supabase } from "./supabase/supabase.config";

export {
  initSocket,
  getAuthenticatedSupabase,
  adapterOptions,
  supabase,
  TanStackProvider,
};
