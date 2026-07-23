import { AiCapability, AiCapabilityMode, AiCapabilityProvider } from "./api/generated-api";
import type {
  AiJudgeConfigurationResponse,
  AiJudgeConfigurationValidationResponse,
  ArchitectCourseResponse,
  AssetResponse,
  BodyTranscribeDictationApiPublicV1AiTranscriptionsPost,
  BodyIngestApiPublicV1DraftIngestIntegrationIdPost,
  CreateDraft,
  DraftFilesResponseBody,
  DraftMessageResponse,
  EmbeddingsRequest,
  EmbeddingsResponse,
  JudgeResponse,
  MentorChatRequest,
  MentorChatResponse,
  Message,
  PublicConfigurationResponse,
  StructuredGenerationRequest,
  TranscriptionResponse,
  TranslationResponse,
} from "./api/generated-api";
export type {
  AiCapabilityStatus,
  CreateDraftResponse,
  DeleteIngestedDocumentResponse,
  GetDraftResponse,
  IngestDraftResponse as IngestDraftFileResponse,
  MentorChatRequest,
  MentorChatResponse,
  PublicAiMessage,
  PublicConfigurationResponse,
} from "./api/generated-api";
export { AiCapability, AiCapabilityMode, AiCapabilityProvider } from "./api/generated-api";

export type IntegrationIdOptions = {
  integrationId: string;
};

export type ChatOptions = IntegrationIdOptions & Message;

export type CreateDraftOptions = CreateDraft;
export type DraftFile = DraftFilesResponseBody;
export type DraftFilesResponse = DraftFile[];
export type DraftMessage = DraftMessageResponse;
export type DraftMessagesResponse = DraftMessage[];
export type GeneratedCourseResponse = ArchitectCourseResponse;
export type AssetsResponse = AssetResponse[];
export type GeneratedCourseBundleResponse = {
  course: GeneratedCourseResponse;
  assets: AssetsResponse;
};
export type AiRuntimeConfiguration = PublicConfigurationResponse;
export type MentorChatOptions = MentorChatRequest;
export type MentorGenerateChatResponse = MentorChatResponse;
export type MentorJudgeOptions = StructuredGenerationRequest;
export type MentorJudgeResponse = JudgeResponse;
export type GenerateAiJudgeConfigurationOptions = StructuredGenerationRequest;
export type GenerateAiJudgeConfigurationResponse = AiJudgeConfigurationResponse;
export type ValidateAiJudgeConfigurationOptions = StructuredGenerationRequest;
export type ValidateAiJudgeConfigurationResponse = AiJudgeConfigurationValidationResponse;
export type CreateEmbeddingsOptions = EmbeddingsRequest;
export type CreateEmbeddingsResponse = EmbeddingsResponse;
export type GenerateTranslationsOptions = StructuredGenerationRequest;
export type GenerateTranslationsResponse = TranslationResponse;
export type TranscribeDictationOptions = BodyTranscribeDictationApiPublicV1AiTranscriptionsPost;
export type TranscribeDictationResponse = TranscriptionResponse;

export const LUMA_AI_CAPABILITY_MODES = {
  CORE: AiCapabilityMode.Core,
  CUSTOM: AiCapabilityMode.Custom,
  DISABLED: AiCapabilityMode.Disabled,
} as const;

export const LUMA_AI_CAPABILITY_PROVIDERS = {
  LUMA: AiCapabilityProvider.Luma,
  MENTINGO_CORE: AiCapabilityProvider.MentingoCore,
} as const;

export const LUMA_AI_CAPABILITIES = {
  COURSE_GENERATION: AiCapability.CourseGeneration,
  COURSE_GENERATION_VISUAL_ASSETS: AiCapability.CourseGenerationVisualAssets,
  COURSE_GENERATION_EMBEDDINGS: AiCapability.CourseGenerationEmbeddings,
  AI_MENTOR_CHAT: AiCapability.AiMentorChat,
  AI_MENTOR_JUDGE: AiCapability.AiMentorJudge,
  AI_JUDGE_CONFIGURATION_GENERATOR: AiCapability.AiJudgeConfigurationGenerator,
  AI_JUDGE_CONFIGURATION_VALIDATOR: AiCapability.AiJudgeConfigurationValidator,
  AI_MENTOR_RAG_EMBEDDINGS: AiCapability.AiMentorRagEmbeddings,
  TRANSLATION_GENERATION: AiCapability.TranslationGeneration,
  DICTATION_TRANSCRIPTION: AiCapability.DictationTranscription,
  VOICE_TRANSCRIPTION: AiCapability.VoiceTranscription,
  VOICE_MENTOR: AiCapability.VoiceMentor,
  VOICE_TEXT_TO_SPEECH: AiCapability.VoiceTextToSpeech,
} as const;

export const LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES = {
  COURSE_GENERATED: "course.generated",
  DESIGNER_CHAPTER_GENERATED: "designer.chapter.generated",
  ARCHITECT_LESSON_GENERATED: "architect.lesson.generated",
  ASSET_REQUESTED: "asset.requested",
} as const;

export type LumaCourseGeneratedEvent = {
  type: (typeof LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES)["COURSE_GENERATED"];
  draftId: string;
};

export type LumaAssetRequestedEvent = {
  type: (typeof LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES)["ASSET_REQUESTED"];
  draftId: string;
  assetId: string;
  chapterIndex?: number;
  lessonIndex?: number;
  provider?: string;
  status?: string;
};

export type LumaChapterGeneratedEvent = {
  type: (typeof LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES)["DESIGNER_CHAPTER_GENERATED"];
  generation?: {
    title?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type LumaLessonGeneratedEvent = {
  type: (typeof LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES)["ARCHITECT_LESSON_GENERATED"];
  generation?: GeneratedCourseResponse["chapters"][number]["lessons"][number];
  chapterIndex?: number;
  lessonIndex?: number;
  relevantContext?: string;
  [key: string]: unknown;
};

export type LumaCourseGenerationStreamEvent =
  | LumaCourseGeneratedEvent
  | LumaAssetRequestedEvent
  | LumaChapterGeneratedEvent
  | LumaLessonGeneratedEvent;

export const isLumaCourseGeneratedEvent = (event: unknown): event is LumaCourseGeneratedEvent => {
  const value = event as Partial<LumaCourseGeneratedEvent> | null;

  return (
    typeof value === "object" &&
    value !== null &&
    value.type === LUMA_COURSE_GENERATION_STREAM_EVENT_TYPES.COURSE_GENERATED &&
    typeof value.draftId === "string"
  );
};

export type IngestDraftFileOptions = IntegrationIdOptions &
  BodyIngestApiPublicV1DraftIngestIntegrationIdPost;

export type DeleteIngestedDocumentOptions = IntegrationIdOptions & {
  documentId: string;
};
