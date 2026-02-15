import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import type { AuditData, AuditResult } from '@/lib/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const data: AuditData = await request.json();

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const prompt = `You are an expert sustainability auditor. Analyze the following company data and provide a comprehensive sustainability audit:

Company: ${data.companyName}
Industry: ${data.industry}
Annual Energy Consumption: ${data.energyConsumption} MWh
Annual Carbon Emissions: ${data.carbonEmissions} tons CO2e
Annual Waste Generated: ${data.wasteGenerated} tons
Annual Water Usage: ${data.waterUsage} cubic meters
Renewable Energy: ${data.renewableEnergyPercentage}%

Provide a detailed analysis in the following JSON format (return ONLY valid JSON, no markdown):
{
  "score": <number 0-100>,
  "grade": "<A+, A, B, C, D, or F>",
  "analysis": "<2-3 paragraph detailed analysis>",
  "recommendations": ["<actionable recommendation 1>", "<recommendation 2>", "<recommendation 3>"],
  "strengths": ["<strength 1>", "<strength 2>"],
  "concerns": ["<concern 1>", "<concern 2>"],
  "industryComparison": "<comparison to industry standards>"
}`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log('Raw AI response:', text.substring(0, 500)); // Debug log

    // Clean up the response text
    text = text.trim();
    
    // Remove markdown code blocks if present
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
    
    // Try to extract JSON - look for the opening brace and find the matching closing brace
    const startIndex = text.indexOf('{');
    if (startIndex === -1) {
      console.error('No opening brace found in response');
      throw new Error('Invalid response format from AI');
    }
    
    // Find the last closing brace
    const endIndex = text.lastIndexOf('}');
    if (endIndex === -1 || endIndex < startIndex) {
      console.error('No closing brace found in response');
      throw new Error('Invalid response format from AI');
    }
    
    const jsonStr = text.substring(startIndex, endIndex + 1);
    console.log('Extracted JSON:', jsonStr.substring(0, 200)); // Debug log
    
    const parsedData = JSON.parse(jsonStr);
    
    const auditResult: AuditResult = {
      score: parsedData.score || 50,
      grade: parsedData.grade || 'C',
      analysis: parsedData.analysis || 'Analysis unavailable',
      recommendations: parsedData.recommendations || [],
      strengths: parsedData.strengths || [],
      concerns: parsedData.concerns || [],
      industryComparison: parsedData.industryComparison || 'Comparison unavailable',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(auditResult);
  } catch (error: any) {
    console.error('Audit error:', error);
    console.error('Error details:', error.message);
    
    return NextResponse.json(
      { 
        error: 'Failed to process audit',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
