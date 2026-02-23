# 🌱 GreenChain - AI-Powered Sustainability Auditor

**Automate carbon accounting and sustainability auditing for small businesses**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-orange)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

GreenChain replaces manual, error-prone spreadsheets with an intelligent system that processes utility bills, calculates carbon footprints, and provides actionable insights to reduce environmental impact.

![GreenChain Demo](https://youtu.be/9E6MKpq4Yeo)

## 🎯 Problem Statement

Small businesses often lack the budget for professional sustainability consultants. They struggle with:
- Manual tracking of energy consumption and emissions
- Understanding their environmental impact
- Meeting regulatory compliance requirements
- Proving their sustainability commitment to customers and investors

## 💡 Solution

GreenChain provides three core capabilities:

### 1. **Automated Bill Processing**
- Upload electricity, gas, or water bills (PDF or images)
- AI (Gemini 2.5 Flash) extracts key data: kWh, costs, billing periods
- No manual data entry required

### 2. **Intelligent Carbon Accounting**
- Calculates CO₂ emissions using Climatiq API (with fallback)
- Compares performance against industry benchmarks
- Tracks progress over time with visual dashboards

### 3. **Actionable Insights**
- AI analyzes usage patterns to identify inefficiencies
- Suggests specific "Green Tasks" with estimated savings
- Generates verifiable Green Certificates for marketing

## 🚀 Key Features

- **OCR Bill Extraction**: Drag-and-drop utility bills for automatic data extraction
- **Real-time Carbon Calculation**: Instant CO₂ footprint analysis with industry comparisons
- **Impact Dashboard**: Visual charts showing carbon savings and trends
- **AI-Powered Recommendations**: Personalized suggestions to reduce emissions
- **Green Certificate Generator**: Downloadable PDF certificates for social proof
- **Quick Audit Mode**: Manual data entry for instant sustainability scoring
- **Modern UI**: Beautiful, scannable interface with icons and color-coded alerts

## � ️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Recharts, Lucide Icons
- **AI/ML**: Google Gemini 2.5 Flash (OCR & Analysis)
- **APIs**: Climatiq API (Carbon Calculations with fallback)
- **PDF Generation**: jsPDF, html2canvas
- **Database**: Supabase (Optional - for multi-user support)

## 📦 Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Edgahkipkemoi/GreenChain.git
cd GreenChain/greenchain
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:

Create a `.env.local` file:
```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional (uses fallback calculation if not provided)
CLIMATIQ_API_KEY=your_climatiq_api_key_here

# Optional (for multi-user features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

**Get your Gemini API key**: [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Run the development server**:
```bash
npm run dev
```

5. **Open your browser**: [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

### Quick Audit Mode (Homepage)
1. Navigate to the homepage
2. Click a demo button (Manufacturing, Retail, or Tech) or enter your own data
3. Click "Run AI Audit"
4. Get instant AI-powered sustainability analysis with:
   - Score (0-100) and Grade (A+ to F)
   - Strengths and concerns
   - Actionable recommendations
   - Industry comparison

### Bill Tracker Mode (Dashboard)
1. Go to `/dashboard`
2. Enter your company name and industry
3. Upload utility bills (PDF, JPG, PNG)
4. View automated carbon footprint analysis
5. Track progress over time with charts
6. Download Green Certificate after 3+ bills

## 📊 How It Works

```
1. Upload Bill → 2. AI Extraction → 3. Carbon Calculation → 4. Insights Generation → 5. Certificate
```

1. **Upload**: Drag and drop utility bill (PDF/image)
2. **Extract**: Gemini AI reads and extracts kWh, cost, period
3. **Calculate**: Climatiq API converts energy to CO₂ emissions
4. **Analyze**: AI identifies patterns and generates recommendations
5. **Report**: Generate downloadable certificates and reports

## 🔑 API Endpoints

- `POST /api/extract` - Extract data from bill images using OCR
- `POST /api/calculate-emissions` - Calculate CO₂ from energy usage
- `POST /api/audit` - Run comprehensive sustainability audit
- `POST /api/generate-insights` - Generate AI-powered recommendations

## 🎨 Project Structure

```
greenchain/
├── app/
│   ├── page.tsx              # Quick Audit homepage
│   ├── dashboard/page.tsx    # Bill Tracker dashboard
│   └── api/
│       ├── extract/          # OCR extraction endpoint
│       ├── calculate-emissions/
│       ├── audit/            # Sustainability audit
│       └── generate-insights/
├── components/
│   ├── AuditForm.tsx         # Manual data entry form
│   ├── AuditResults.tsx      # Audit results display (modern UI)
│   ├── BillUpload.tsx        # Drag-and-drop uploader
│   ├── ImpactDashboard.tsx   # Charts and metrics
│   └── GreenCertificate.tsx  # PDF certificate generator
└── lib/
    ├── types.ts              # TypeScript interfaces
    ├── emissions.ts          # Carbon calculation logic
    ├── demo-data.ts          # Demo company data
    └── utils.ts              # Utility functions
```

## � Business Value

### Cost Savings
- Identifies energy inefficiencies
- Suggests specific actions to reduce utility bills
- Tracks ROI of sustainability initiatives

### Regulatory Compliance
- Maintains audit-ready environmental records
- Generates compliance reports
- Stays ahead of environmental regulations

### Market Advantage
- Verifiable sustainability credentials
- Shareable Green Certificates for marketing
- Builds trust with eco-conscious consumers and investors

## 🏆 Competitive Advantages

1. **AI-First Approach**: Fully automated data extraction and analysis
2. **Social Proof**: Shareable certificates for marketing
3. **Actionable Intelligence**: Specific recommendations, not just numbers
4. **Accessible**: Built for small businesses without sustainability expertise
5. **Verifiable**: Industry-standard carbon calculations via Climatiq
6. **Modern UI**: Beautiful, scannable interface with visual hierarchy

## 🚀 Deployment

### Quick Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already done):
```bash
git add .
git commit -m "Deploy GreenChain"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variable: `GEMINI_API_KEY`
   - Click "Deploy"

3. **Done!** Your app will be live in ~2 minutes

### Environment Variables for Production
- `GEMINI_API_KEY` (Required)
- `CLIMATIQ_API_KEY` (Optional - uses fallback if not set)

## 🧪 Testing

### Quick Test
```bash
# Test the audit API
curl -X POST http://localhost:3000/api/audit \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Corp",
    "industry": "Technology",
    "energyConsumption": 5000,
    "carbonEmissions": 1600,
    "wasteGenerated": 50,
    "waterUsage": 8000,
    "renewableEnergyPercentage": 70
  }'
```

### Demo Data
Use the demo buttons on the homepage:
- **Manufacturing Demo**: High energy, moderate renewable
- **Retail Demo**: Medium energy, good renewable
- **Tech Demo**: Lower energy, excellent renewable

## 📈 Impact Potential

- **Target**: 30M+ small businesses globally
- **Potential**: 10M tons CO₂ reduction by 2027
- **Savings**: $500M annually in energy costs

## 🔮 Future Enhancements

- [ ] Multi-user support with Supabase authentication
- [ ] Mobile app for on-the-go bill uploads
- [ ] Integration with accounting software (QuickBooks, Xero)
- [ ] Automated monthly email reports
- [ ] Carbon offset marketplace integration
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Multi-language support

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### API Errors
- Check environment variables are set correctly
- Verify Gemini API key is valid
- Check API rate limits (60 req/min for free tier)

### Image Upload Issues
- Ensure file size < 10MB
- Supported formats: PDF, JPG, PNG
- Check Gemini API quota

## 💰 Cost Estimates

### Free Tier (Good for MVP)
- Vercel: Free (100GB bandwidth)
- Gemini API: Free (60 req/min)
- Climatiq: Free (100 req/month)
- **Total: $0/month**

### Production (1000 users)
- Vercel Pro: $20/month
- Gemini API: ~$50/month
- Climatiq: ~$100/month
- Supabase: $25/month
- **Total: ~$195/month**

## 📄 License

MIT License - feel free to use this project for your sustainability initiatives!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Built with ❤️ for a sustainable future**

- GitHub: [@Edgahkipkemoi](https://github.com/Edgahkipkemoi)
- Project Link: [https://github.com/Edgahkipkemoi/GreenChain](https://github.com/Edgahkipkemoi/GreenChain)

---

**Powered by Gemini AI • Built for the Google AI Hackathon**

⭐ Star this repo if you find it helpful!
