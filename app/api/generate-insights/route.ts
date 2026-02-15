import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import type { BillAudit } from '@/lib/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { bills, industry } = await request.json();

    if (!bills || bills.length === 0) {
      return NextResponse.json({ insights: [] });
    }

    const billsSummary = bills.map((bill: BillAudit) => 
      `${bill.bill_date}: ${bill.energy_kwh} kWh, ${bill.co2_kg.toFixed(2)} kg CO₂`
    ).join('\n');

    const prompt = `You are an energy efficiency expert. Analyze this business's utility data and provide 3 specific, actionable carbon-reduction recommendations.

Industry: ${industry || 'General Business'}
Recent Bills:
${billsSummary}

Provide 3 specific recommendations that:
1. Identify peak usage patterns and suggest load shifting
2. Recommend specific equipment or behavior changes
3. Estimate potential carbon savings

Return ONLY a JSON array of 3 strings:
["recommendation 1", "recommendation 2", "recommendation 3"]`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const insights = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Insights generation error:', error);
    return NextResponse.json(
      { insights: [
        'Consider switching to LED lighting to reduce energy consumption by up to 75%',
        'Install programmable thermostats to optimize heating and cooling schedules',
        'Conduct an energy audit to identify equipment inefficiencies'
      ]},
      { status: 200 }
    );
  }
}
