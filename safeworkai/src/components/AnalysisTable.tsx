import React, { useState } from 'react';
import { Download, ChevronDown, FileText, Eye, ArrowUpDown } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisTableProps {
  analyses: AnalysisResult[];
  onViewAnalysis: (analysis: AnalysisResult) => void;
}

const AnalysisTable: React.FC<AnalysisTableProps> = ({ analyses, onViewAnalysis }) => {
  const [sortField, setSortField] = useState<keyof AnalysisResult>('uploadDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof AnalysisResult) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedAnalyses = [...analyses].sort((a, b) => {
    if (sortField === 'uploadDate') {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    
    if (sortField === 'riskScore') {
      return sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    }
    
    // For string fields
    const valueA = String(a[sortField]).toLowerCase();
    const valueB = String(b[sortField]).toLowerCase();
    return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  });

  const getScoreColorClass = (score: number) => {
    if (score < 30) return 'bg-green-100 text-green-800';
    if (score < 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Previous Analyses</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          History of document safety assessments
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center space-x-1 focus:outline-none"
                  onClick={() => handleSort('filename')}
                >
                  <span>Document</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center space-x-1 focus:outline-none"
                  onClick={() => handleSort('uploadDate')}
                >
                  <span>Date</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center space-x-1 focus:outline-none"
                  onClick={() => handleSort('riskScore')}
                >
                  <span>Risk Score</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAnalyses.map((analysis) => (
              <tr key={analysis.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-100 text-blue-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{analysis.filename}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(analysis.uploadDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getScoreColorClass(analysis.riskScore)}`}>
                    {analysis.riskScore}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => onViewAnalysis(analysis)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span>View</span>
                    </button>
                    {analysis.pdfUrl && (
                      <button className="text-green-600 hover:text-green-900 flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        <span>PDF</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {analyses.length === 0 && (
        <div className="text-center py-10">
          <FileText className="h-12 w-12 text-gray-400 mx-auto" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No analyses yet</h3>
          <p className="mt-1 text-sm text-gray-500">Upload your first document to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisTable;