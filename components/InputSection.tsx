import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputSectionProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ value, onChange, onAnalyze, isAnalyzing }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          당신의 스타일을 분석합니다
        </h2>
        <p className="text-slate-400 text-lg">
          기존에 작성했던 대본을 붙여넣으세요. AI가 톤앤매너를 학습하여 새로운 아이디어를 제안합니다.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="여기에 지난 영상의 대본을 붙여넣어 주세요... (최소 200자 이상 권장)"
          className="relative w-full h-80 bg-slate-900 text-slate-100 border border-slate-700 rounded-lg p-6 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono leading-relaxed shadow-xl"
        />
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onAnalyze}
          disabled={!value.trim() || isAnalyzing}
          className={`
            relative flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold text-white shadow-lg transition-all
            ${!value.trim() || isAnalyzing 
              ? 'bg-slate-700 cursor-not-allowed opacity-50' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-purple-500/25 active:scale-95'}
          `}
        >
          {isAnalyzing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>스타일 분석 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>분석 및 주제 추천받기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
