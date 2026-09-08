import { AiModelDomain, AiModelProfileKind, ApiKeyConcurrencyTier } from "../api/generated-api";

export const LUMA_AI_MODEL_DOMAINS = {
  AI_MENTOR: AiModelDomain.AiMentor,
  AI_MENTOR_CONFIGURATION_GENERATOR: AiModelDomain.AiMentorConfigurationGenerator,
  AI_MENTOR_JUDGE: AiModelDomain.AiMentorJudge,
  AI_JUDGE_CONFIGURATION_GENERATOR: AiModelDomain.AiJudgeConfigurationGenerator,
  AI_JUDGE_CONFIGURATION_VALIDATOR: AiModelDomain.AiJudgeConfigurationValidator,
  TRANSLATIONS: AiModelDomain.Translations,
  COURSE_GENERATION: AiModelDomain.CourseGeneration,
  COURSE_GENERATION_REQUIREMENTS_ANALYSIS: AiModelDomain.CourseGenerationRequirementsAnalysis,
  COURSE_GENERATION_PLANNING_ROUTER: AiModelDomain.CourseGenerationPlanningRouter,
  COURSE_GENERATION_OUTLINE_DESIGN: AiModelDomain.CourseGenerationOutlineDesign,
  COURSE_GENERATION_LESSON_CONTENT: AiModelDomain.CourseGenerationLessonContent,
  COURSE_GENERATION_ASSISTANT_RESPONSE: AiModelDomain.CourseGenerationAssistantResponse,
  COURSE_EVIDENCE_SCANNER: AiModelDomain.CourseEvidenceScanner,
  COURSE_GENERATION_VISUAL_ASSETS: AiModelDomain.CourseGenerationVisualAssets,
  COURSE_GENERATION_EMBEDDINGS: AiModelDomain.CourseGenerationEmbeddings,
  EMBEDDINGS: AiModelDomain.Embeddings,
  DICTATION_TRANSCRIPTION: AiModelDomain.DictationTranscription,
  VOICE_TRANSCRIPTION: AiModelDomain.VoiceTranscription,
  VOICE_TTS: AiModelDomain.VoiceTts,
} as const;

export type LumaAiModelDomain = (typeof LUMA_AI_MODEL_DOMAINS)[keyof typeof LUMA_AI_MODEL_DOMAINS];

export const LUMA_AI_MODEL_PROFILE_KINDS = {
  CHAT: AiModelProfileKind.Chat,
  EMBEDDING: AiModelProfileKind.Embedding,
  SPEECH_TO_TEXT: AiModelProfileKind.SpeechToText,
  TEXT_TO_SPEECH: AiModelProfileKind.TextToSpeech,
} as const;

export type LumaAiModelProfileKind =
  (typeof LUMA_AI_MODEL_PROFILE_KINDS)[keyof typeof LUMA_AI_MODEL_PROFILE_KINDS];

export const LUMA_API_KEY_CONCURRENCY_TIERS = {
  SMALL: ApiKeyConcurrencyTier.Small,
  MEDIUM: ApiKeyConcurrencyTier.Medium,
  HIGH: ApiKeyConcurrencyTier.High,
} as const;

export type LumaApiKeyConcurrencyTier =
  (typeof LUMA_API_KEY_CONCURRENCY_TIERS)[keyof typeof LUMA_API_KEY_CONCURRENCY_TIERS];

export { AiModelDomain, AiModelProfileKind, ApiKeyConcurrencyTier } from "../api/generated-api";
