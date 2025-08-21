// Netlify functions Node 18+ mein fetch already hota hai, node-fetch ki zaroorat nahi hai
// Lekin agar tum old version use kar rahe ho to node-fetch import rehne do

export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        // ⚠️ API key ko env variable mein rakhna best hai (netlify.toml ya Netlify dashboard)
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://chatariz1.netlify.app/",
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
