/**
 * TEMPORARILY DISABLED: This component is part of the Stripe integration that has been paused.
 * Do not use this component until the Stripe integration is re-enabled.
 */

"use client";

import { ReactNode, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

export default function StripeProvider({
  children,
  clientSecret,
}: {
  children: ReactNode;
  clientSecret?: string;
}) {
  const [mounted, setMounted] = useState(false);

  // To prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0f766e", // Tailwind teal-700
      },
    },
  };

  if (!mounted) return null;

  // If we have a client secret, render Elements
  if (clientSecret) {
    return <Elements stripe={stripePromise} options={options}>{children}</Elements>;
  }

  // If no client secret yet, just render the children directly
  return <>{children}</>;
}
