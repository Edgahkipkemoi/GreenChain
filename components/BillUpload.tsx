'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2 } from 'lucide-react';
import type { BillAudit } from '@/lib/types';

interface BillUploadProps {
  onBillProcessed: (bill: BillAudit) => void;
}

export default function BillUpload({ onBillProcessed }: BillUploadProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setPreview(URL.createObjectURL(file));

    try {
      // Step 1: Extract data from bill
      const formData = new FormData();
      formData.append('file', file);

      const extractResponse = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });

      if (!extractResponse.ok) throw new Error('Extraction failed');

      const extraction = await extractResponse.json();

      // Step 2: Calculate emissions
      const emissionsResponse = await fetch('/api/calculate-emissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kwh: extraction.kwh }),
      });

      if (!emissionsResponse.ok) throw new Error('Emissions calculation failed');

      const { co2_kg } = await emissionsResponse.json();

      // Step 3: Create bill audit object
      const billAudit: BillAudit = {
        bill_date: extraction.period,
        energy_kwh: extraction.kwh,
        cost: extraction.cost,
        co2_kg,
        category: 'Electric',
      };

      onBillProcessed(billAudit);
    } catch (error) {
      console.error('Error processing bill:', error);
      alert('Failed to process bill. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [onBillProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    disabled: loading,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Utility Bill</CardTitle>
        <CardDescription>Drop your electricity, gas, or water bill (PDF or image)</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
              <p className="text-sm text-muted-foreground">Processing your bill...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              {preview ? (
                <FileText className="w-12 h-12 text-green-600" />
              ) : (
                <Upload className="w-12 h-12 text-gray-400" />
              )}
              <div>
                <p className="text-sm font-medium">
                  {isDragActive ? 'Drop your bill here' : 'Drag & drop your bill, or click to browse'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Supports PDF, JPG, PNG</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
