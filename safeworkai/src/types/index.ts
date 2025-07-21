export interface RiskItem {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  category: string;
}

export interface AnalysisResult {
  id: string;
  filename: string;
  uploadDate: string;
  riskScore: number;
  topRisks: RiskItem[];
  extractedText: string;
  pdfUrl?: string;
  fileId: string; // ✅ Ajouté pour lier au rapport PDF
}

export interface AnalysisResult {
  id: string;
  filename: string;
  uploadDate: string;
  riskScore: number;
  topRisks: RiskItem[];
  extractedText: string;
  pdfUrl?: string;
  fileId: string;
  gptFeedback?: string; // ✅ nouvelle propriété
}


export type FileStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
