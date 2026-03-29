import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  // Handle common OAuth/Supabase errors early
  if (error) {
    console.error("Supabase OAuth Error URL Param:", { error, error_description });
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error_description || error)}`);
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError) {
      // Use X-Forwarded-Host/Proto if available to handle proxies correctly
      const forwardedHost = request.headers.get("x-forwarded-host");
      const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
      
      let redirectUrl: string;
      if (forwardedHost) {
        redirectUrl = `${forwardedProto}://${forwardedHost}${next.startsWith("/") ? next : "/" + next}`;
      } else {
        redirectUrl = next.startsWith("/") ? `${origin}${next}` : next;
      }
      
      console.log("Auth Callback Success. Redirecting to:", redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }
    
    console.error("Supabase Auth Code Exchange Error:", exchangeError);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`);
  }

  // Handle cases where no code is present
  const errorMessage = "No authentication code provided. Please try logging in again.";
  console.error("Auth Callback Failure:", errorMessage);
  return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorMessage)}`);
}
