import fetch from "node-fetch";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        // ✅ direct key (sirf project/learning ke liye)
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site.netlify.app/",
        "X-Title": "Ariz's Chatbot"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: body.messages,
        stream: false,
        temperature: 0.7
      })
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
