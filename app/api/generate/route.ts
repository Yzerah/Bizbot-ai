import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
export async function POST(req: NextRequest){
  const { profession, client, issue, price } = await req.json()
  const openai = new OpenAI({ apiKey: process.env.LLAMA_API_KEY, baseURL: "https://api.llama.com/compat/v1" })
  const completion = await openai.chat.completions.create({
    model: "Llama-4-Maverick-17B-128E-Instruct-FP8",
    messages: [{ role: "user", content: `אתה BizBot-AI. מקצוע: ${profession}, לקוח: ${client}, עבודה: ${issue}, מחיר: ${price}₪. תכתוב הצעת מחיר מקצועית בעברית עם אבחון, מה כולל, למה דחוף, אחריות.` }]
  })
  return NextResponse.json({ result: completion.choices[0].message.content })
}