import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode");
    const body = await request.json();

    const gatewayUrl = (
      body.gatewayUrl ||
      process.env.NINEROUTER_URL ||
      "http://localhost:20128"
    ).replace(/\/+$/, "");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const apiKey = body.apiKey || process.env.NINEROUTER_KEY;
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    if (mode === "models") {
      const response = await fetch(`${gatewayUrl}/v1/models`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        const text = await response.text();
        return NextResponse.json(
          { error: `9Router models error: ${text}` },
          { status: response.status },
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Chat completion proxy
    const { gatewayUrl: _, apiKey: __, ...chatPayload } = body;

    const response = await fetch(`${gatewayUrl}/v1/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(chatPayload),
    });

    if (!response.ok) {
      let errorText = "";
      try {
        const errJson = await response.json();
        errorText =
          errJson?.error?.message || errJson?.error || JSON.stringify(errJson);
      } catch {
        errorText = await response.text();
      }
      return NextResponse.json(
        { error: errorText || "9Router chat completion failed" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("AI assistant proxy error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to connect to 9Router",
      },
      { status: 500 },
    );
  }
}
