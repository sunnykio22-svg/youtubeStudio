import React from 'react';
import { TopicSuggestion } from '../types';
import { ArrowRight, Target, Lightbulb, Video } from 'lucide-react';

interface TopicSelectorProps {
  topics: TopicSuggestion[];
  onSelect: (topic: TopicSuggestion) => void;
  isGenerating: boolean;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, onSelect, isGenerating }) => {
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6 animate-fade-in">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
          <SparklesIcon className="absolute inset-0 m-auto w-8 h-8 text-purple-400 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-slate-200">대본을 작성하고 있습니다...</h3>
        <p className="text-slate-400">당신의 스타일을 완벽하게 재현하는 중입니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">추천 주제를 선택하세요</h2>
        <p className="text-slate-400">분석된 스타일을 바탕으로 가장 효과적인 주제들을 선정했습니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => onSelect(topic)}
            className="group relative flex flex-col items-start text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-2xl p-6 transition-all hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-black text-white">{index + 1}</span>
            </div>

            <div className="space-y-4 w-full relative z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors pr-8">
                {topic.title}
              </h3>
              
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>{topic.reason}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="font-medium text-slate-400">타겟:</span> {topic.targetAudience}
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-medium text-slate-400">형식:</span> {topic.videoType}
                </div>
              </div>

              <div className="pt-4 flex items-center text-purple-400 text-sm font-semibold group-hover:gap-2 transition-all">
                <span>이 주제로 대본 작성하기</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
