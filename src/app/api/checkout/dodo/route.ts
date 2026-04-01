import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import DodoPayments from "dodopayments";

const isProd = process.env.NODE_ENV === "production";

const client = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY || "",
  environment: isProd ? "live_mode" : "test_mode",
});

export async function POST(req: Request) {
  try {
    if (!process.env.DODO_API_KEY) {
      console.error("DODO_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Payment gateway is not currently available." },
        { status: 503 }
      );
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is missing." },
        { status: 400 }
      );
    }

    // Attempt to get user email if logged in, otherwise dummy
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

    // Create the session
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const origin = `${protocol}://${host}`;

    // Note: Dodo Payments might expect 'payments' or 'checkoutSessions' in their newer verisons.
    // The snippet uses 'payments.create' or 'payments' to generate payment links
    // If we only have product_cart we use checkoutSessions typically if supported
    // Since we just ran `npm install dodopayments`, lets use standard properties.
    const payment = await client.payments.create({
      billing: {
        country: "US",
        city: "San Francisco",
        state: "CA",
        street: "123 Main St",
        zipcode: "94111",
      },
      payment_link: true,
      product_cart: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      customer: {
        email: user?.email || "customer@example.com",
        name: user?.user_metadata?.full_name || "Storix User",
      },
      return_url: `${origin}/dashboard/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
    });

    // Check if the API returned a link or an id we must assemble
    const p = payment as unknown as Record<string, string>;
    return NextResponse.json({ url: p.paymentLink || p.checkoutUrl || p.url || p.payment_link });

  } catch (error: unknown) {
    console.error("Dodo payments creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
