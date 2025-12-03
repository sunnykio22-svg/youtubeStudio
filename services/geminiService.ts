import { GoogleGenAI, Type } from "@google/genai";
import { TopicSuggestion, GeneratedScript } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the reference script and generates topic suggestions using gemini-2.5-flash.
 */
export const analyzeAndSuggestTopics = async (referenceScript: string): Promise<TopicSuggestion[]> => {
  try {
    const prompt = `
      당신은 전문 유튜브 콘텐츠 전략가입니다.
      아래 제공된 '참고 대본'의 스타일, 어조, 주제, 타겟 시청자를 분석하세요.
      
      이 분석을 바탕으로, 해당 채널이 다룰 만한 흥미롭고 트렌디한 새로운 주제 4가지를 제안하세요.
      각 주제는 기존 대본의 성공 요소를 유지하면서도 새로운 각도를 제시해야 합니다.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `참고 대본:\n${referenceScript}` }] },
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "비디오의 매력적인 제목" },
              reason: { type: Type.STRING, description: "이 주제를 추천하는 이유 및 전략적 근거" },
              targetAudience: { type: Type.STRING, description: "주 타겟 시청자층" },
              videoType: { type: Type.STRING, description: "영상 형식 (예: 정보 전달, 스토리텔링, 브이로그 등)" }
            },
            required: ["title", "reason", "targetAudience", "videoType"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    return JSON.parse(jsonText) as TopicSuggestion[];
  } catch (error) {
    console.error("Error generating topics:", error);
    throw error;
  }
};

/**
 * Generates a full script based on the selected topic and reference style using gemini-3-pro-preview.
 */
export const generateScript = async (referenceScript: string, topic: TopicSuggestion): Promise<GeneratedScript> => {
  try {
    const prompt = `
      당신은 100만 구독자를 보유한 유튜브 작가입니다.
      
      [작업 목표]
      사용자가 선택한 주제 "${topic.title}"에 대해 유튜브 대본을 작성하세요.
      
      [필수 요구사항]
      1. **스타일 복제**: 아래 제공되는 [참고 대본]의 말투, 유머 코드, 오프닝 방식, 클로징 멘트, 호흡을 완벽하게 모방하세요.
      2. **구조**: [오프닝] - [본론 (3-4개 포인트)] - [결론/CTA] 구조를 따르세요.
      3. **가독성**: 촬영용 대본이므로 읽기 편하게 작성하세요. (지문, 효과음 지시 포함)
      4. **길이**: 참고 대본과 비슷한 분량으로 작성하세요.

      [선택된 주제 정보]
      - 제목: ${topic.title}
      - 타겟: ${topic.targetAudience}
      - 의도: ${topic.reason}
    `;

    // gemini-3-pro-preview is used for complex creative writing tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: [
        { role: "user", parts: [{ text: `[참고 대본]\n${referenceScript}` }] },
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING, description: "Full Markdown formatted script" },
            estimatedDuration: { type: Type.STRING, description: "Estimated video length e.g. '10분'" },
          },
          required: ["title", "content", "estimatedDuration"],
        },
      },
    });

     const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");

    return JSON.parse(jsonText) as GeneratedScript;
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};
