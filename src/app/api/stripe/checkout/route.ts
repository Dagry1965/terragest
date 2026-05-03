import {
  NextResponse,
} from "next/server";

import { stripe }
from "@/lib/stripe/client";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const { plan } = body;

    const prices: any = {

      pro:
        process.env
          .STRIPE_PRICE_PRO,

      enterprise:
        process.env
          .STRIPE_PRICE_ENTERPRISE,
    };

    const priceId =
      prices[plan];

    if (!priceId) {

      return NextResponse.json(
        {
          error:
            "Plan invalide",
        },
        {
          status: 400,
        }
      );
    }

    const session =
      await stripe.checkout.sessions
        .create({

          mode:
            "subscription",

          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],

          success_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/billing/success`,

          cancel_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
        });

    return NextResponse.json({
      url: session.url,
    });

  } catch (e: any) {

    return NextResponse.json(
      {
        error:
          e.message,
      },
      {
        status: 500,
      }
    );
  }
}