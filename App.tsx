import React, { useState } from 'react';
import { AppStep, TopicSuggestion, GeneratedScript } from './types';
import { analyzeAndSuggestTopics, generateScript } from './services/geminiService';
import { InputSection } from './components/InputSection';
import { TopicSelector } from './components/TopicSelector';
import { ScriptResult } from './components/ScriptResult';
import { Youtube, Wand2 } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [referenceScript, setReferenceScript] = useState<string>('');
  const [topics, setTopics] = useState<TopicSuggestion[]>([]);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);

  const handleAnalyze = async () => {
    if (!referenceScript.trim()) return;
    
    setStep(AppStep.ANALYZING);
    try {
      const suggestions = await analyzeAndSuggestTopics(referenceScript);
      setTopics(suggestions);
      setStep(AppStep.SELECTION);
    } catch (error) {
      alert("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setStep(AppStep.INPUT);
    }
  };

  const handleTopicSelect = async (topic: TopicSuggestion) => {
    setStep(AppStep.GENERATING);
    try {
      const script = await generateScript(referenceScript, topic);
      setGeneratedScript(script);
      setStep(AppStep.RESULT);
    } catch (error) {
      alert("대본 생성 중 오류가 발생했습니다.");
      setStep(AppStep.SELECTION);
    }
  };

  const handleReset = () => {
    if (confirm("모든 내용이 초기화됩니다. 계속하시겠습니까?")) {
      setStep(AppStep.INPUT);
      setReferenceScript('');
      setTopics([]);
      setGeneratedScript(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Youtube className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TubeGenius AI
            </span>
          </div>
          <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            <span>Powered by Gemini 2.5 & 3 Pro</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 md:p-12 relative overflow-hidden">
        
        {/* Background Ambient Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* View Switcher */}
        {step === AppStep.INPUT || step === AppStep.ANALYZING ? (
          <InputSection 
            value={referenceScript} 
            onChange={setReferenceScript} 
            onAnalyze={handleAnalyze}
            isAnalyzing={step === AppStep.ANALYZING}
          />
        ) : null}

        {step === AppStep.SELECTION || step === AppStep.GENERATING ? (
          <TopicSelector 
            topics={topics} 
            onSelect={handleTopicSelect} 
            isGenerating={step === AppStep.GENERATING}
          />
        ) : null}

        {step === AppStep.RESULT && generatedScript ? (
          <ScriptResult 
            script={generatedScript} 
            onReset={handleReset}
            onBack={() => setStep(AppStep.SELECTION)}
          />
        ) : null}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-slate-600 text-sm">
        <p>© 2024 TubeGenius AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
