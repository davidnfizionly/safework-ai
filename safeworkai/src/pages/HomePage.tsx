import React, { useState } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import UploadArea from '../components/UploadArea';
import TextViewer from '../components/TextViewer';
import RiskScore from '../components/RiskScore';
import AnalysisTable from '../components/AnalysisTable';
import { AnalysisResult, FileStatus } from '../types';

const HomePage: React.FC = () => {
  const [fileStatus, setFileStatus] = useState<FileStatus>('idle');
  const [error, setError] = useState<string>('');
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([]);

  const handleFileUpload = async (file: File) => {
    setFileStatus('uploading');
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://3.85.239.20:5000/upload-document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      const newAnalysis: AnalysisResult = {
        id: data.fileId,
        fileId: data.fileId,
        filename: data.filename,
        uploadDate: new Date().toISOString(),
        riskScore: data.riskScore || 0,
        topRisks: [],
        extractedText: data.extractedText,
        gptFeedback: data.feedback, // ✅ GPT-4 feedback
        pdfUrl: data.pdfUrl,
      };

      setAnalyses(prev => [newAnalysis, ...prev]);
      setCurrentAnalysis(newAnalysis);
      setFileStatus('complete');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Upload failed');
      setFileStatus('error');
    }
  };

  const viewAnalysis = (analysis: AnalysisResult) => {
    setCurrentAnalysis(analysis);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload and Extracted Text Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Safety Document</h2>
            <UploadArea 
              onFileUpload={handleFileUpload} 
              status={fileStatus} 
              error={error} 
            />
            
            {fileStatus === 'complete' && currentAnalysis?.pdfUrl && (
              <div className="mt-4 flex justify-end">
                <a
                  href={currentAnalysis.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Report
                </a>
              </div>
            )}
          </div>
          
          {currentAnalysis && (
            <>
              <TextViewer 
                text={currentAnalysis.extractedText} 
                filename={currentAnalysis.filename} 
              />

              {currentAnalysis.gptFeedback && (
                <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Safety Feedback</h3>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {currentAnalysis.gptFeedback}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Risk Analysis Column */}
        <div className="space-y-6">
          {currentAnalysis ? (
            <RiskScore score={currentAnalysis.riskScore} />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Safety Risk Analysis</h2>
              <p className="text-gray-500 mb-4">Upload a document or select a previous analysis to view risk details</p>
              <ArrowRight className="mx-auto h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
      </div>
      
      {/* Previous Analyses Table */}
      <div className="mt-8">
        <AnalysisTable analyses={analyses} onViewAnalysis={viewAnalysis} />
      </div>
    </div>
  );
};

export default HomePage;
