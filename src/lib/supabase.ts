import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || anonKey.startsWith("sb_publishable_")) {
    console.error(
      "SUPABASE_CONFIG_ERROR: Missing or invalid Supabase environment variables. Check your .env.local file."
    );
  }

  return createBrowserClient(
    url!,
    anonKey!
  );
}

// For backward compatibility while I refactor
export const supabase = createClient();

