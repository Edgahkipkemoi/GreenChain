'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuditForm from '@/components/AuditForm';
import AuditResults from '@/components/AuditResults';
import { Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AuditData, AuditResult } from '@/lib/types';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleAudit = async (data: AuditData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Audit failed');

      const auditResult = await response.json();
      setResult(auditResult);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to complete audit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-900">GreenChain</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Sustainability Auditor</p>
              </div>
            </div>
            <Button onClick={() => router.push('/dashboard')} variant="outline">
              Bill Tracker <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 py-8">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900">
              Automate Your Carbon Accounting
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Replace manual spreadsheets with AI-powered sustainability auditing. 
              Get instant insights, reduce costs, and prove your environmental commitment.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <p className="text-2xl font-bold text-green-600">$0</p>
                <p className="text-sm text-muted-foreground">Setup Cost</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <p className="text-2xl font-bold text-blue-600">2 min</p>
                <p className="text-sm text-muted-foreground">First Audit</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <p className="text-2xl font-bold text-purple-600">AI-Powered</p>
                <p className="text-sm text-muted-foreground">Insights</p>
              </div>
            </div>
          </div>

          <AuditForm onSubmit={handleAudit} loading={loading} />
          {result && <AuditResults result={result} />}
        </div>
      </main>

      <footer className="border-t mt-16 py-6 bg-white/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by Gemini AI • Built for a sustainable future</p>
        </div>
      </footer>
    </div>
  );
}
