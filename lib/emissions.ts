const GLOBAL_AVERAGE_CO2_PER_KWH = 0.42; // kg CO2/kWh

export async function getEmissions(kwh: number, region: string = 'US'): Promise<number> {
  // Try Climatiq API first
  if (process.env.CLIMATIQ_API_KEY) {
    try {
      const response = await fetch('https://api.climatiq.io/data/v1/estimate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLIMATIQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emission_factor: {
            activity_id: 'electricity-supply_grid-source_supplier_mix',
            region: region,
            source: 'EPA',
            year: '2023',
          },
          parameters: {
            energy: kwh,
            energy_unit: 'kWh',
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.co2e; // Returns kg CO2e
      }
    } catch (error) {
      console.warn('Climatiq API failed, using fallback:', error);
    }
  }

  // Fallback to global average
  return kwh * GLOBAL_AVERAGE_CO2_PER_KWH;
}

export function calculateCarbonSaved(currentCO2: number, baselineCO2: number): number {
  return Math.max(0, baselineCO2 - currentCO2);
}

export function getIndustryBenchmark(industry: string, kwh: number): number {
  // Industry-specific benchmarks (kg CO2 per kWh)
  const benchmarks: Record<string, number> = {
    'Manufacturing': 0.55,
    'Retail': 0.38,
    'Technology': 0.32,
    'Healthcare': 0.45,
    'Hospitality': 0.48,
    'default': 0.42,
  };

  const rate = benchmarks[industry] || benchmarks['default'];
  return kwh * rate;
}
