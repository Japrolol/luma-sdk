import type {
  ArchitectCourseResponse,
  BodyIngestApiPublicV1DraftIngestIntegrationIdPost,
  CreateDraft,
  DraftMessageResponse,
  DraftFilesResponseBody,
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

export type IngestDraftFileOptions = IntegrationIdOptions &
  BodyIngestApiPublicV1DraftIngestIntegrationIdPost;

export type DeleteIngestedDocumentOptions = IntegrationIdOptions & {
  documentId: string;
};
