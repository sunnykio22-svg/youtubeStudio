export interface TopicSuggestion {
  title: string;
  reason: string;
  targetAudience: string;
  videoType: string;
}

export enum AppStep {
  INPUT = 'INPUT',
  ANALYZING = 'ANALYZING',
  SELECTION = 'SELECTION',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
}

export interface GeneratedScript {
  title: string;
  content: string;
  estimatedDuration: string;
}
