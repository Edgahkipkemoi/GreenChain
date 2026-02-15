import type { AuditData } from './types';

export const demoCompanies: Record<string, AuditData> = {
  manufacturing: {
    companyName: 'Acme Manufacturing Co.',
    industry: 'Manufacturing',
    energyConsumption: 15000,
    carbonEmissions: 8250,
    wasteGenerated: 450,
    waterUsage: 25000,
    renewableEnergyPercentage: 15,
  },
  retail: {
    companyName: 'Green Retail Store',
    industry: 'Retail',
    energyConsumption: 5000,
    carbonEmissions: 1900,
    wasteGenerated: 120,
    waterUsage: 8000,
    renewableEnergyPercentage: 35,
  },
  tech: {
    companyName: 'Tech Innovations Inc.',
    industry: 'Technology',
    energyConsumption: 8000,
    carbonEmissions: 2560,
    wasteGenerated: 80,
    waterUsage: 12000,
    renewableEnergyPercentage: 60,
  },
  hospitality: {
    companyName: 'Eco Hotel & Spa',
    industry: 'Hospitality',
    energyConsumption: 12000,
    carbonEmissions: 5760,
    wasteGenerated: 300,
    waterUsage: 35000,
    renewableEnergyPercentage: 25,
  },
};

export const industryBenchmarks = {
  Manufacturing: {
    energyIntensity: 0.55, // kg CO2 per kWh
    wastePerEmployee: 2.5, // tons per year
    waterIntensity: 1.8, // m³ per kWh
  },
  Retail: {
    energyIntensity: 0.38,
    wastePerEmployee: 0.8,
    waterIntensity: 1.2,
  },
  Technology: {
    energyIntensity: 0.32,
    wastePerEmployee: 0.5,
    waterIntensity: 1.0,
  },
  Healthcare: {
    energyIntensity: 0.45,
    wastePerEmployee: 1.5,
    waterIntensity: 2.0,
  },
  Hospitality: {
    energyIntensity: 0.48,
    wastePerEmployee: 1.2,
    waterIntensity: 2.5,
  },
};

export function getRandomDemo(): AuditData {
  const companies = Object.values(demoCompanies);
  return companies[Math.floor(Math.random() * companies.length)];
}
