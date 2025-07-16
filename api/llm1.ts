import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch"; // ✅ 추가

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("http://amm.kr:3964/llm_med_gemma3_4b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.MIR_API_KEY!,
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
