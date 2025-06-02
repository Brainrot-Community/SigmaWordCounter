import React, { useState, useEffect, useRef } from 'react';
import StatisticCard from './StatisticCard';
import { Clock, FileText, Type, Hash, Upload, Download, Copy, Trash2 } from 'lucide-react';
import { calculateStats } from '../utils/textUtils';
import { Document, Packer, Paragraph } from 'docx';
import { jsPDF } from 'jspdf';

const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    if (text && confirm('Are you sure you want to clear the text?')) {
      setText('');
      textareaRef.current?.focus();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = async (format: 'txt' | 'pdf' | 'docx') => {
    switch (format) {
      case 'txt': {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        break;
      }
      case 'pdf': {
        const pdf = new jsPDF();
        const splitText = pdf.splitTextToSize(text, 180);
        pdf.text(splitText, 15, 15);
        pdf.save('text.pdf');
        break;
      }
      case 'docx': {
        const doc = new Document({
          sections: [{
            properties: {},
            children: text.split('\n').map(paragraph => 
              new Paragraph({ text: paragraph })
            ),
          }],
        });
        
        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'text.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        break;
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('text/') && file.type !== 'application/json') {
      alert('Please upload a text file (.txt, .json, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn">
      <section className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between mb-4">
          <div className="relative group">
            <button
              disabled={!text}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium
                ${text 
                  ? 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'}
                transition-all duration-200`}
            >
              <Download size={16} />
              <span className="hidden xs:inline">Download</span>
            </button>
            {text && (
              <div className="absolute left-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                <button
                  onClick={() => handleDownload('txt')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FileText size={16} />
                  <span>Text File (.txt)</span>
                </button>
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FileText size={16} />
                  <span>PDF Document (.pdf)</span>
                </button>
                <button
                  onClick={() => handleDownload('docx')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <FileText size={16} />
                  <span>Word Document (.docx)</span>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleUploadClick}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium
              bg-blue-50 text-blue-600 hover:bg-blue-100 
              dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30
              transition-all duration-200"
          >
            <Upload size={16} />
            <span className="hidden xs:inline">Upload File</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.json,.md,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="w-full h-48 md:h-64 p-3 md:p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-colors duration-300 text-gray-800 dark:text-gray-200"
          placeholder="Start typing, paste your text, or upload a file..."
          autoFocus
        ></textarea>
        
        <div className="flex justify-end mt-4 space-x-3">
          <button
            onClick={handleClear}
            disabled={!text}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium 
              ${text 
                ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'}
              transition-all duration-200`}
          >
            <Trash2 size={16} />
            <span className="hidden xs:inline">Clear</span>
          </button>
          <button
            onClick={handleCopy}
            disabled={!text}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-sm font-medium 
              ${text 
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'}
              transition-all duration-200`}
          >
            <Copy size={16} />
            <span className="hidden xs:inline">Copy</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <StatisticCard 
          title="Words" 
          value={stats.words.toLocaleString()} 
          icon={<Type size={18} />}
          primary
        />
        <StatisticCard 
          title="Characters" 
          value={stats.characters.toLocaleString()} 
          icon={<Hash size={18} />}
        />
        <StatisticCard 
          title="Characters (no spaces)" 
          value={stats.charactersNoSpaces.toLocaleString()} 
          icon={<Hash size={18} />}
        />
        <StatisticCard 
          title="Sentences" 
          value={stats.sentences.toLocaleString()} 
          icon={<FileText size={18} />}
        />
        <StatisticCard 
          title="Paragraphs" 
          value={stats.paragraphs.toLocaleString()} 
          icon={<FileText size={18} />}
        />
        <StatisticCard 
          title="Reading Time" 
          value={`${stats.readingTime < 1 ? '<1' : Math.round(stats.readingTime)} min`} 
          icon={<Clock size={18} />}
        />
      </section>
    </div>
  );
};

export default WordCounter;