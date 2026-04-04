import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Admin client to bypass RLS for key validation and profile updates
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { key } = await req.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json({ error: "Invalid license key format" }, { status: 400 });
    }

    // Get current user session
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate the key
    const { data: licenseData, error: fetchError } = await supabaseAdmin
      .from("license_keys")
      .select("*")
      .eq("key", key.trim())
      .eq("is_redeemed", false)
      .single();

    if (fetchError || !licenseData) {
      return NextResponse.json({ error: "Invalid or already redeemed license key" }, { status: 404 });
    }

    // Atomically redeem the key and update the profile
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ plan: licenseData.plan })
      .eq("id", user.id);

    if (updateError) {
       console.error("Profile update error:", updateError);
       return NextResponse.json({ error: "Failed to apply license to your profile" }, { status: 500 });
    }

    // Mark key as redeemed
    await supabaseAdmin
      .from("license_keys")
      .update({ 
        is_redeemed: true, 
        redeemed_by: user.id,
        redeemed_at: new Date().toISOString()
      })
      .eq("id", licenseData.id);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully upgraded to ${licenseData.plan.toUpperCase()} status!` 
    });

  } catch (err: any) {
    console.error("Redeem key error:", err);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
