import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskScoreProps {
  score: number; // 0-100
}

const RiskScore: React.FC<RiskScoreProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate the score when it changes
    const interval = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < score) return prev + 1;
        if (prev > score) return prev - 1;
        clearInterval(interval);
        return prev;
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [score]);

  // Determine color based on score
  const getScoreColor = () => {
    if (animatedScore < 30) return 'text-green-600';
    if (animatedScore < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Determine background color for the progress bar
  const getBarColor = () => {
    if (animatedScore < 30) return 'bg-green-500';
    if (animatedScore < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get risk level text
  const getRiskLevel = () => {
    if (animatedScore < 30) return 'Low Risk';
    if (animatedScore < 70) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-900">Risk Assessment</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Risk Score</span>
          <span className={`text-2xl font-bold ${getScoreColor()}`}>{animatedScore}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div 
            className={`h-2.5 rounded-full ${getBarColor()} transition-all duration-300 ease-out`} 
            style={{ width: `${animatedScore}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mb-6">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
        
        <div className="flex items-center justify-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            animatedScore < 30 
              ? 'bg-green-100 text-green-800' 
              : animatedScore < 70 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {getRiskLevel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskScore;