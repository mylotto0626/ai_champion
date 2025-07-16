// api/llm1.ts
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  const response = await fetch("http://amm.kr:3964/llm_med_gemma3_4b", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.REACT_APP_MIR_API_KEY!,
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return res.status(200).json(data);
}
