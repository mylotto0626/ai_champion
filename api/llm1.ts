import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;
  const apiKey = process.env.MIR_API_KEY;

  console.log("🔑 API KEY:", apiKey);
  console.log("📨 프롬프트:", prompt);

  try {
    const response = await fetch("http://amm.kr:3964/llm_med_gemma3_4b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey || "", // 환경 변수에서 API 키를 가져옵니다.
      },
      body: JSON.stringify({ prompt }),
    });

    const text = await response.text();
    console.log("📩 원본 응답:", text);

    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).send(text);
    }
  } catch (error) {
    console.error("❌ 오류 발생:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
