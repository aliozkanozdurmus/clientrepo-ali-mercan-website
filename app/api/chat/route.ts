import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { SITE_KNOWLEDGE } from "./site-knowledge";

const {
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT,
  AZURE_OPENAI_API_VERSION,
  AI_SYSTEM_ROLE,
} = process.env;

if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_DEPLOYMENT || !AZURE_OPENAI_API_VERSION) {
  // eslint-disable-next-line no-console
  console.warn("Azure OpenAI env vars are missing. Check .env.example for required keys.");
}

const client =
  AZURE_OPENAI_API_KEY && AZURE_OPENAI_ENDPOINT && AZURE_OPENAI_DEPLOYMENT && AZURE_OPENAI_API_VERSION
    ? new OpenAI({
      apiKey: AZURE_OPENAI_API_KEY,
      baseURL: `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}`,
      defaultQuery: { "api-version": AZURE_OPENAI_API_VERSION },
      defaultHeaders: { "api-key": AZURE_OPENAI_API_KEY },
    })
    : null;

export async function POST(req: NextRequest) {
  if (!client) {
    return NextResponse.json({ error: "Azure OpenAI env vars are missing." }, { status: 500 });
  }

  let body: { messages?: { role: "user" | "assistant" | "system"; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const userMessages = body.messages?.filter((m) => m.content?.trim()) ?? [];
  if (!userMessages.length) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  // Construct the system prompt with Role + Knowledge
  const systemPrompt = `
${AI_SYSTEM_ROLE || "You are a helpful assistant."}

${SITE_KNOWLEDGE}
`;

  try {
    const stream = await client.chat.completions.create({
      model: AZURE_OPENAI_DEPLOYMENT!,
      messages: [{ role: "system", content: systemPrompt }, ...userMessages],
      max_completion_tokens: 16000,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error("Azure OpenAI error", error);
    return NextResponse.json({ error: "Yanıt alınırken bir hata oluştu." }, { status: 500 });
  }
}
