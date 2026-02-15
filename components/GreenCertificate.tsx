'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { DashboardStats } from '@/lib/types';

interface GreenCertificateProps {
  companyName: string;
  stats: DashboardStats;
}

export default function GreenCertificate({ companyName, stats }: GreenCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${companyName}-Green-Certificate.pdf`);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="text-green-600" />
          Green Certificate
        </CardTitle>
        <CardDescription>
          Share your sustainability achievements on social media
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={certificateRef}
          className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-lg border-4 border-green-600"
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Award className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-900">Eco-Audit Certificate</h2>
            <p className="text-lg text-gray-700">This certifies that</p>
            <h3 className="text-4xl font-bold text-green-800">{companyName}</h3>
            <p className="text-lg text-gray-700">has completed a comprehensive sustainability audit</p>
            
            <div className="grid grid-cols-3 gap-4 my-6 text-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-2xl font-bold text-green-600">{stats.totalCO2Saved.toFixed(1)}</p>
                <p className="text-sm text-gray-600">kg CO₂ Saved</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-2xl font-bold text-blue-600">{stats.auditCount}</p>
                <p className="text-sm text-gray-600">Bills Analyzed</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-2xl font-bold text-purple-600">{stats.totalEnergy.toFixed(0)}</p>
                <p className="text-sm text-gray-600">kWh Tracked</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">Issued on {currentDate}</p>
            <p className="text-xs text-gray-500">Powered by GreenChain AI</p>
          </div>
        </div>

        <Button onClick={generatePDF} className="w-full" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Download Certificate
        </Button>
      </CardContent>
    </Card>
  );
}
