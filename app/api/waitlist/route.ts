import { NextResponse } from "next/server";
import { z } from "zod";
import { addWaitlistEntry } from "@/lib/waitlistStore";
import { sendWaitlistConfirmationEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email("Please provide a valid email."),
  firmName: z.string().min(1, "Tell us your firm name.").max(200),
  location: z.string().min(1, "Where are you based?").max(200),
  teamSize: z.string().min(1, "Share your approximate team size."),
  useCase: z.string().min(1, "Tell us how you’d like to use Cocoon.")
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const entry = addWaitlistEntry(parsed.data);

  await sendWaitlistConfirmationEmail(entry.email);

  return NextResponse.json({ ok: true });
}
