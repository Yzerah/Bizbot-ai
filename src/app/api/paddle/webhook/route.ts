import { paddleWebhookSecret, verifyPaddleSignature } from "@/lib/paddle";
import { applyPaddleNotification, PaddleRetryError } from "@/lib/paddle-sync";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secret = paddleWebhookSecret();
  if (!secret) {
    return Response.json({ error: "Webhook is not configured" }, { status: 503 });
  }

  const signature = request.headers.get("paddle-signature") ?? "";
  const rawBody = await request.text();
  if (!verifyPaddleSignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    await applyPaddleNotification(body);
  } catch (error) {
    if (error instanceof PaddleRetryError) console.error(`[paddle] ${error.message}`);
    else console.error("[paddle] webhook handler failed");
    return Response.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
