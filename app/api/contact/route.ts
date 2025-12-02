import { NextResponse } from "next/server";
import { z } from "zod";
import { sendContactNotificationEmail } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(1)
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide both email and message." },
      { status: 400 }
    );
  }

  await sendContactNotificationEmail(parsed.data);

  return NextResponse.json({ ok: true });
}
