import React from 'react';
import ReactMarkdown from 'react-markdown';
import { GeneratedScript } from '../types';
import { Copy, RefreshCw, ArrowLeft, Clock } from 'lucide-react';

interface ScriptResultProps {
  script: GeneratedScript;
  onReset: () => void;
  onBack: () => void;
}

export const ScriptResult: React.FC<ScriptResultProps> = ({ script, onReset, onBack }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(`# ${script.title}\n\n${script.content}`);
    alert('대본이 클립보드에 복사되었습니다!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>주제 다시 선택</span>
        </button>
        <button 
          onClick={onReset}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>처음으로</span>
        </button>
      </div>

      {/* Script Card */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Title Bar */}
        <div className="bg-slate-800 border-b border-slate-700 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{script.title}</h2>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>예상 소요 시간: {script.estimatedDuration}</span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-900/20"
          >
            <Copy className="w-4 h-4" />
            <span>대본 복사</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-10 overflow-auto max-h-[70vh] bg-slate-900">
          <article className="prose prose-invert prose-lg max-w-none prose-headings:text-purple-300 prose-p:text-slate-300 prose-strong:text-white prose-blockquote:border-purple-500 prose-blockquote:bg-slate-800/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg">
            <ReactMarkdown>{script.content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};
