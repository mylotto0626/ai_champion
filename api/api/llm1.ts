export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const response = await fetch("http://amm.kr:3964/llm1", {
    method: "POST", // ✅ 서버가 POST만 허용한다면 반드시 명시
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: "Hello" }), // ✅ 필요한 요청 데이터
  });

  const data = await response.json();
  res.status(200).json(data);
}
