import React from 'react';
import { FileText, Download } from 'lucide-react';

interface TextViewerProps {
  text: string;
  filename?: string;
  fileId?: string;
}

const TextViewer: React.FC<TextViewerProps> = ({ text, filename, fileId }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const highlightRisks = (text: string) => {
    const riskTerms = [
      'hazard', 'risk', 'danger', 'unsafe', 'failure', 'malfunction',
      'inadequate', 'expired', 'missing', 'damaged', 'broken', 'leak',
      'worn', 'outdated', 'violation', 'non-compliance', 'deficiency'
    ];

    const lines = text.split('\n');
    const processedLines = lines.map(line => {
      const pattern = new RegExp(`(${riskTerms.join('|')})`, 'gi');
      return line.replace(
        pattern,
        '<span class="bg-yellow-100 text-yellow-800 px-1 rounded">$1</span>'
      );
    });

    return processedLines.join('\n');
  };

  const handleDownload = () => {
    if (!fileId || !apiBaseUrl) return;
    const url = `${apiBaseUrl}/download-report/${fileId}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-sm font-medium text-gray-900">
            {filename ? `Extracted Text from ${filename}` : 'Extracted Text'}
          </h3>
        </div>

        {fileId && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-1" />
            Download PDF
          </button>
        )}
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {text ? (
          <div
            className="text-sm text-gray-700 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: highlightRisks(text) }}
          />
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-400">No text extracted yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextViewer;
