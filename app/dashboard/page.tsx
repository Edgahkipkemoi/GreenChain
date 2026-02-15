'use client';

import { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import BillUpload from '@/components/BillUpload';
import ImpactDashboard from '@/components/ImpactDashboard';
import GreenCertificate from '@/components/GreenCertificate';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { BillAudit, DashboardStats } from '@/lib/types';
import { getIndustryBenchmark } from '@/lib/emissions';

export default function DashboardPage() {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [bills, setBills] = useState<BillAudit[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const handleSetup = () => {
    if (companyName && industry) {
      setIsSetup(true);
    }
  };

  const handleBillProcessed = async (bill: BillAudit) => {
    const newBills = [...bills, bill];
    setBills(newBills);
    await updateStats(newBills);
  };

  const updateStats = async (currentBills: BillAudit[]) => {
    const totalEnergy = currentBills.reduce((sum, b) => sum + b.energy_kwh, 0);
    const totalCost = currentBills.reduce((sum, b) => sum + b.cost, 0);
    const totalCO2 = currentBills.reduce((sum, b) => sum + b.co2_kg, 0);
    
    // Calculate industry benchmark
    const industryBenchmarkCO2 = getIndustryBenchmark(industry, totalEnergy);
    const totalCO2Saved = Math.max(0, industryBenchmarkCO2 - totalCO2);

    // Generate monthly data for chart
    const monthlyData = currentBills.map(bill => ({
      month: bill.bill_date,
      userFootprint: bill.co2_kg,
      industryAverage: getIndustryBenchmark(industry, bill.energy_kwh),
    }));

    // Get AI insights
    let insights: string[] = [];
    if (currentBills.length >= 2) {
      try {
        const response = await fetch('/api/generate-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bills: currentBills, industry }),
        });
        const data = await response.json();
        insights = data.insights;
      } catch (error) {
        console.error('Failed to generate insights:', error);
        insights = [
          'Upload more bills to get personalized AI recommendations',
          'Track your energy usage monthly to identify trends',
          'Compare your performance against industry benchmarks'
        ];
      }
    } else {
      insights = [
        'Upload more bills to unlock AI-powered insights',
        'Track your energy usage monthly to identify trends',
        'Compare your performance against industry benchmarks'
      ];
    }

    setStats({
      totalCO2Saved,
      totalEnergy,
      totalCost,
      auditCount: currentBills.length,
      monthlyData,
      insights,
    });
  };

  if (!isSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-900">Welcome to GreenChain</h1>
            <p className="text-muted-foreground mt-2">Let&apos;s get started with your sustainability journey</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <Input
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Manufacturing, Retail, Technology, etc."
              />
            </div>
            <Button onClick={handleSetup} className="w-full" size="lg">
              Start Tracking
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-900">{companyName}</h1>
                <p className="text-sm text-muted-foreground">{industry}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Bills Tracked</p>
              <p className="text-2xl font-bold text-green-600">{bills.length}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <BillUpload onBillProcessed={handleBillProcessed} />
          
          {stats && (
            <>
              <ImpactDashboard stats={stats} />
              
              {bills.length >= 3 && (
                <GreenCertificate companyName={companyName} stats={stats} />
              )}
            </>
          )}

          {bills.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Upload your first utility bill to start tracking your carbon footprint</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
