"use client";

import { useState } from "react";

type PaddleEnvironment = "sandbox" | "production";

type PaddleJs = {
  Environment: { set: (env: "sandbox") => void };
  Initialize: (options: { token: string }) => void;
  Checkout: { open: (options: Record<string, unknown>) => void };
};

let paddlePromise: Promise<PaddleJs> | null = null;

function paddleGlobal() {
  return (window as Window & { Paddle?: PaddleJs }).Paddle;
}

function loadPaddle(environment: PaddleEnvironment, token: string) {
  if (!paddlePromise) {
    paddlePromise = new Promise((resolve, reject) => {
      const boot = () => {
        const paddle = paddleGlobal();
        if (!paddle) {
          paddlePromise = null;
          reject(new Error("Paddle.js did not load"));
          return;
        }
        try {
          if (environment === "sandbox") paddle.Environment.set("sandbox");
          paddle.Initialize({ token });
        } catch {
          // Initialize throws when Paddle.js was already initialized on this page.
        }
        resolve(paddle);
      };

      if (paddleGlobal()) {
        boot();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async = true;
      script.onload = boot;
      script.onerror = () => {
        paddlePromise = null;
        reject(new Error("Failed to load Paddle.js"));
      };
      document.head.appendChild(script);
    });
  }
  return paddlePromise;
}

export function PaddleCheckoutButton({
  label,
  className,
  environment,
  clientToken,
  priceId,
  userId,
  email,
}: {
  label: string;
  className?: string;
  environment: PaddleEnvironment;
  clientToken: string;
  priceId: string;
  userId: string;
  email: string;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function openCheckout() {
    setPending(true);
    setError("");
    try {
      const paddle = await loadPaddle(environment, clientToken);
      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: { email },
        customData: { userId, email },
        settings: {
          displayMode: "overlay",
          theme: "light",
          // Paddle Checkout has no Hebrew locale; the surrounding pages stay in Hebrew.
          locale: "en",
          variant: "one-page",
          successUrl: `${window.location.origin}/upgrade?checkout=success`,
        },
      });
    } catch {
      setError("לא הצלחנו לפתוח את חלון התשלום. נסו שוב בעוד רגע.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button type="button" className={className} onClick={openCheckout} disabled={pending}>
        {pending ? "פותחים תשלום..." : label}
      </button>
      {error && <p className="mt-2 text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}
