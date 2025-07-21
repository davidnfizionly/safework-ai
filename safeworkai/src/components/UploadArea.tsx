import React, { useState, useRef } from 'react';
import { Upload, FileType, X, AlertCircle, CheckCircle } from 'lucide-react';
import { FileStatus } from '../types';


interface UploadAreaProps {
  onFileUpload: (file: File) => void;
  status: FileStatus;
  error?: string;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileUpload, status, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const getUploadStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing document...';
      case 'complete':
        return 'Analysis complete!';
      case 'error':
        return error || 'An error occurred';
      default:
        return '';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      case 'complete':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : status === 'error'
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50'
        } transition-all duration-200 ease-in-out`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedFile && status !== 'idle' ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-between w-full bg-white rounded-md p-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <FileType className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {status === 'idle' && (
                <button
                  onClick={handleRemoveFile}
                  className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              )}
            </div>

            {status !== 'idle' && (
              <div className="flex items-center space-x-2">
                {status === 'uploading' || status === 'processing' ? (
                  <div className="animate-pulse flex items-center space-x-2">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                ) : (
                  getStatusIcon()
                )}
                <span className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>
                  {getUploadStatusMessage()}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
              >
                <span onClick={handleBrowseClick}>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.png,.jpg,.jpeg"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600 mt-1">PDF, PNG or JPG up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadArea;
