import { NextResponse } from 'next/server';
import { getEmissions } from '@/lib/emissions';

export async function POST(request: Request) {
  try {
    const { kwh, region = 'US' } = await request.json();

    if (!kwh || kwh <= 0) {
      return NextResponse.json({ error: 'Invalid kWh value' }, { status: 400 });
    }

    const co2_kg = await getEmissions(kwh, region);

    return NextResponse.json({ co2_kg });
  } catch (error) {
    console.error('Emissions calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate emissions' },
      { status: 500 }
    );
  }
}
