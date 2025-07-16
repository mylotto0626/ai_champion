// /api/llm1.ts
export default async function handler(req, res) {
  const response = await fetch("http://amm.kr:3964/llm1");
  const data = await response.json();
  res.status(200).json(data);
}
