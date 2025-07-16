import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch, { Headers } from "node-fetch";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.MIR_API_KEY;
  if (!apiKey) {
    console.error("❌ API KEY 누락");
    return res.status(500).json({ error: "Missing API Key" });
  }

  try {
    const response = await fetch("http://amm.kr:3964/llm_med_gemma3_4b", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      }),
      body: JSON.stringify({ prompt: "test" }),
    });

    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).send(text);
    }
  } catch (err) {
    console.error("❌ fetch 오류:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
