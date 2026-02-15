export interface AuditData {
  companyName: string;
  industry: string;
  energyConsumption: number;
  carbonEmissions: number;
  wasteGenerated: number;
  waterUsage: number;
  renewableEnergyPercentage: number;
}

export interface AuditResult {
  score: number;
  grade: string;
  analysis: string;
  recommendations: string[];
  strengths: string[];
  concerns: string[];
  industryComparison: string;
  timestamp: string;
}

export interface ChartData {
  name: string;
  value: number;
  benchmark: number;
}

export interface BillExtraction {
  period: string;
  kwh: number;
  cost: number;
}

export interface BillAudit {
  id?: string;
  user_id?: string;
  bill_date: string;
  raw_text?: string;
  energy_kwh: number;
  cost: number;
  co2_kg: number;
  category: 'Electric' | 'Gas' | 'Water';
  created_at?: string;
}

export interface DashboardStats {
  totalCO2Saved: number;
  totalEnergy: number;
  totalCost: number;
  auditCount: number;
  monthlyData: MonthlyData[];
  insights: string[];
}

export interface MonthlyData {
  month: string;
  userFootprint: number;
  industryAverage: number;
}
