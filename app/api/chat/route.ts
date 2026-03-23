import { NextResponse } from "next/server";

import { createTutorReply } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: unknown };
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Please enter a question before submitting." },
        { status: 400 },
      );
    }

    const reply = await createTutorReply(message);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your request right now." },
      { status: 500 },
    );
  }
}
