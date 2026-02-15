import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import type { BillExtraction } from '@/lib/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    // Determine mime type
    const mimeType = file.type || 'image/jpeg';

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Extract the Billing Period, Total kWh (or energy units), and Currency Amount from this utility invoice/bill.
Return ONLY valid JSON in this exact format:
{
  "period": "YYYY-MM",
  "kwh": <number>,
  "cost": <number>
}

If you cannot find kWh, look for other energy units and convert to kWh if possible.
If the bill is for gas, estimate kWh equivalent (1 therm ≈ 29.3 kWh).
Return only the JSON, no other text.`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType,
          data: base64,
        },
      },
      { text: prompt },
    ]);

    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract valid JSON from response');
    }

    const extraction: BillExtraction = JSON.parse(jsonMatch[0]);

    return NextResponse.json(extraction);
  } catch (error) {
    console.error('Extraction error:', error);
    return NextResponse.json(
      { error: 'Failed to extract bill data' },
      { status: 500 }
    );
  }
}
