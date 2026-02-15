'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, Zap, DollarSign, FileCheck } from 'lucide-react';
import type { DashboardStats } from '@/lib/types';

interface ImpactDashboardProps {
  stats: DashboardStats;
}

export default function ImpactDashboard({ stats }: ImpactDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Carbon Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold">{stats.totalCO2Saved.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">kg CO₂</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Energy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="text-2xl font-bold">{stats.totalEnergy.toFixed(0)}</span>
              <span className="text-sm text-muted-foreground">kWh</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold">${stats.totalCost.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Bills Analyzed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold">{stats.auditCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carbon Footprint vs Industry Average</CardTitle>
          <CardDescription>Your performance compared to industry benchmarks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="userFootprint" fill="#10b981" name="Your Footprint" />
              <Bar dataKey="industryAverage" fill="#94a3b8" name="Industry Average" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>Personalized recommendations to reduce your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {stats.insights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <p className="text-sm">{insight}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
