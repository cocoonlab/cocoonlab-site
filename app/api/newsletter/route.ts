import { NextResponse } from "next/server";
import { z } from "zod";
import { sendNewsletterSubscriptionEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email("Please provide a valid email.")
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  await sendNewsletterSubscriptionEmail(parsed.data.email);

  return NextResponse.json({ ok: true });
}
