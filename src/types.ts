import type {
  ArchitectCourseResponse,
  AssetResponse,
  BodyIngestApiPublicV1DraftIngestIntegrationIdPost,
  CreateDraft,
  DraftFilesResponseBody,
  DraftMessageResponse,
  Message,
} from "./api/generated-api";
export type {
  CreateDraftResponse,
  DeleteIngestedDocumentResponse,
  GetDraftResponse,
  IngestDraftResponse as IngestDraftFileResponse,
} from "./api/generated-api";

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

export const isLumaCourseGeneratedEvent = (
  event: unknown,
): event is LumaCourseGeneratedEvent => {
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
