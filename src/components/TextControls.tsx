import React from 'react';
import { Copy, Trash2, Download, FileText, FileCode } from 'lucide-react';

interface TextControlsProps {
  onClear: () => void;
  onCopy: () => void;
  onDownload: (format: 'txt' | 'pdf' | 'docx') => void;
  hasText: boolean;
}

const TextControls: React.FC<TextControlsProps> = ({ onClear, onCopy, onDownload, hasText }) => {
  return (
    <div className="flex justify-end mt-4 space-x-3">
      <button
        onClick={onClear}
        disabled={!hasText}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
          ${hasText 
            ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'}
          transition-all duration-200`}
      >
        <Trash2 size={16} />
        <span>Clear</span>
      </button>
      <button
        onClick={onCopy}
        disabled={!hasText}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
          ${hasText 
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'}
          transition-all duration-200`}
      >
        <Copy size={16} />
        <span>Copy</span>
      </button>
      <div className="relative group">
        <button
          disabled={!hasText}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium 
            ${hasText 
              ? 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'}
            transition-all duration-200`}
        >
          <Download size={16} />
          <span>Download</span>
        </button>
        {hasText && (
          <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
            <button
              onClick={() => onDownload('txt')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <FileCode size={16} />
              <span>Text File (.txt)</span>
            </button>
            <button
              onClick={() => onDownload('pdf')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <FileText size={16} />
              <span>PDF Document (.pdf)</span>
            </button>
            <button
              onClick={() => onDownload('docx')}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <FileText size={16} />
              <span>Word Document (.docx)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextControls;