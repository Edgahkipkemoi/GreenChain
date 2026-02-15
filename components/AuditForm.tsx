'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import type { AuditData } from '@/lib/types';
import { demoCompanies } from '@/lib/demo-data';

interface AuditFormProps {
  onSubmit: (data: AuditData) => void;
  loading: boolean;
}

export default function AuditForm({ onSubmit, loading }: AuditFormProps) {
  const [formData, setFormData] = useState<AuditData>({
    companyName: '',
    industry: '',
    energyConsumption: 0,
    carbonEmissions: 0,
    wasteGenerated: 0,
    waterUsage: 0,
    renewableEnergyPercentage: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof AuditData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const loadDemo = (type: keyof typeof demoCompanies) => {
    setFormData(demoCompanies[type]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Audit</CardTitle>
        <CardDescription>Enter your company&apos;s environmental data for AI-powered analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button type="button" variant="outline" size="sm" onClick={() => loadDemo('manufacturing')}>
              <Sparkles className="w-3 h-3 mr-1" /> Manufacturing Demo
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadDemo('retail')}>
              <Sparkles className="w-3 h-3 mr-1" /> Retail Demo
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => loadDemo('tech')}>
              <Sparkles className="w-3 h-3 mr-1" /> Tech Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <Input
                required
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <Input
                required
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                placeholder="Manufacturing"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Energy Consumption (MWh/year)</label>
              <Input
                required
                type="number"
                value={formData.energyConsumption}
                onChange={(e) => handleChange('energyConsumption', parseFloat(e.target.value))}
                placeholder="1000"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Carbon Emissions (tons CO2e/year)</label>
              <Input
                required
                type="number"
                value={formData.carbonEmissions}
                onChange={(e) => handleChange('carbonEmissions', parseFloat(e.target.value))}
                placeholder="500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Waste Generated (tons/year)</label>
              <Input
                required
                type="number"
                value={formData.wasteGenerated}
                onChange={(e) => handleChange('wasteGenerated', parseFloat(e.target.value))}
                placeholder="100"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Water Usage (m³/year)</label>
              <Input
                required
                type="number"
                value={formData.waterUsage}
                onChange={(e) => handleChange('waterUsage', parseFloat(e.target.value))}
                placeholder="5000"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Renewable Energy (%)</label>
              <Input
                required
                type="number"
                min="0"
                max="100"
                value={formData.renewableEnergyPercentage}
                onChange={(e) => handleChange('renewableEnergyPercentage', parseFloat(e.target.value))}
                placeholder="25"
              />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? 'Analyzing...' : 'Run AI Audit'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
