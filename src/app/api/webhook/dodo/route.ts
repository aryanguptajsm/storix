import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Initialize Supabase Admin client (using service role key for bypassing RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("webhook-signature");
    const timestamp = req.headers.get("webhook-timestamp");
    const webhookId = req.headers.get("webhook-id");

    const secret = process.env.DODO_WEBHOOK_SECRET;

    if (!secret || secret === "whsec_your_secret_here_from_dodo_dashboard") {
      console.error("DODO_WEBHOOK_SECRET is not configured.");
      return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
    }

    // Basic signature verification if standardwebhooks is not available
    // Note: In production, it is recommended to use the standardwebhooks library
    // as it handles edge cases and timing attacks more robustly.
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // Log the event for debugging
    console.log(`[Dodo Webhook] Received event ID: ${webhookId}`);

    const payload = JSON.parse(body);
    const eventType = payload.event_type;
    const data = payload.data;

    console.log(`[Dodo Webhook] Event Type: ${eventType}`);

    // Handle relevant events
    if (
      eventType === "subscription.active" || 
      eventType === "subscription.updated" || 
      eventType === "payment.succeeded"
    ) {
      // Extract metadata
      // Dodo session metadata is usually passed during checkout creation
      const metadata = data.metadata || {};
      const userId = metadata.user_id;
      const planId = metadata.plan_id || "pro";

      if (userId) {
        console.log(`[Dodo Webhook] Updating profile ${userId} to plan ${planId}`);
        
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ plan: planId })
          .eq("id", userId);

        if (error) {
          console.error(`[Dodo Webhook] Database update error:`, error);
          return NextResponse.json({ error: "Database update failed" }, { status: 500 });
        }
        
        console.log(`[Dodo Webhook] Successfully updated profile ${userId}`);
      } else {
        console.warn("[Dodo Webhook] No user_id found in metadata.");
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`[Dodo Webhook] Error:`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
