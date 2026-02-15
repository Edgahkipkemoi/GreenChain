'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Leaf, 
  Zap, 
  Droplet,
  Factory,
  Award,
  Target
} from 'lucide-react';
import type { AuditResult } from '@/lib/types';

interface AuditResultsProps {
  result: AuditResult;
}

export default function AuditResults({ result }: AuditResultsProps) {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50 border-green-200';
    if (grade === 'B') return 'text-blue-600 bg-blue-50 border-blue-200';
    if (grade === 'C') return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Extract key metrics from analysis (first 3 sentences)
  const keyPoints = result.analysis
    .split('.')
    .slice(0, 3)
    .filter(s => s.trim().length > 0)
    .map(s => s.trim() + '.');

  return (
    <div className="space-y-6">
      {/* Score Header - Full Width */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Sustainability Score</p>
              <div className="flex items-baseline gap-3">
                <span className={`text-6xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
                <span className="text-2xl text-muted-foreground">/ 100</span>
              </div>
              <Progress value={result.score} className="h-3 mt-4" />
            </div>
            <div className={`px-8 py-4 rounded-xl border-2 ${getGradeColor(result.grade)}`}>
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-5xl font-bold text-center">{result.grade}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights - Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {keyPoints.map((point, idx) => (
          <Alert key={idx} className="border-l-4 border-l-blue-500">
            <Zap className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm leading-relaxed">
              {point}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Strengths & Concerns - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.strengths.map((strength, idx) => (
              <Alert key={idx} className="bg-white border-green-200">
                <Leaf className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-sm font-medium">
                  {strength}
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertCircle className="w-5 h-5" />
              Areas of Concern
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {result.concerns.map((concern, idx) => (
              <Alert key={idx} className="bg-white border-orange-200">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-sm font-medium">
                  {concern}
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations - Icon Grid */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Target className="w-5 h-5" />
            Action Plan
          </CardTitle>
          <CardDescription>Prioritized recommendations to improve your score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.recommendations.map((rec, idx) => {
              const icons = [Zap, Droplet, Leaf, Factory, TrendingUp];
              const Icon = icons[idx % icons.length];
              
              return (
                <Alert key={idx} className="bg-white border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <AlertDescription className="text-sm leading-relaxed flex-1">
                      <span className="font-semibold text-blue-700">Step {idx + 1}:</span> {rec}
                    </AlertDescription>
                  </div>
                </Alert>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Industry Comparison - Compact */}
      <Card className="border-purple-200 bg-purple-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Factory className="w-5 h-5" />
            Industry Benchmark
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-white border-purple-200">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-sm leading-relaxed">
              {result.industryComparison}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
