import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch("http://amm.kr:3964/llm_med_gemma3_4b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();

    // JSON 여부 검사
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch {
      return res
        .status(502)
        .json({ error: "Invalid JSON from server", raw: text });
    }
  } catch (err: any) {
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
}
