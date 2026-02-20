import { API } from "../api/generated-api";
import {
  ChatOptions,
  CreateDraftOptions,
  CreateDraftResponse,
  DeleteIngestedDocumentResponse,
  DeleteIngestedDocumentOptions,
  DraftFilesResponse,
  DraftMessagesResponse,
  GeneratedCourseResponse,
  GetDraftResponse,
  IngestDraftFileResponse,
  IngestDraftFileOptions,
  IntegrationIdOptions,
} from "../types";

export class PublicApiExecutions {
  constructor(private readonly apiClient: API<unknown>) {}

  async chat(
    opts: ChatOptions,
  ): ReturnType<API<unknown>["api"]["chatApiPublicV1AiChatIntegrationIdPost"]> {
    return this.apiClient.api.chatApiPublicV1AiChatIntegrationIdPost(
      opts.integrationId,
      {
        message: opts.message,
      },
      {
        format: "stream",
      },
    );
  }

  async createDraft(opts: CreateDraftOptions): Promise<CreateDraftResponse> {
    const response = await this.apiClient.api.createDraftApiPublicV1DraftPost(opts);
    return response.data;
  }

  async ingestDraftFile(
    opts: IngestDraftFileOptions,
  ): Promise<IngestDraftFileResponse> {
    const response = await this.apiClient.api.ingestApiPublicV1DraftIngestIntegrationIdPost(
      opts.integrationId,
      {
        file: opts.file,
      },
    );
    return response.data;
  }

  async deleteIngestedDocument(
    opts: DeleteIngestedDocumentOptions,
  ): Promise<DeleteIngestedDocumentResponse> {
    const response =
      await this.apiClient.api.deleteIngestedDocumentApiPublicV1DraftIngestIntegrationIdDocumentIdDelete(
        opts.integrationId,
        opts.documentId,
      );
    return response.data;
  }

  async getDraftFiles(opts: IntegrationIdOptions): Promise<DraftFilesResponse> {
    const response = await this.apiClient.api.getDraftFilesApiPublicV1DraftFilesIntegrationIdGet(
      opts.integrationId,
    );
    return response.data;
  }

  async getDraft(opts: IntegrationIdOptions): Promise<GetDraftResponse> {
    const response = await this.apiClient.api.getDraftApiPublicV1DraftIntegrationIdGet(
      opts.integrationId,
    );
    return response.data;
  }

  async getDraftMessages(
    opts: IntegrationIdOptions,
  ): Promise<DraftMessagesResponse> {
    const response =
      await this.apiClient.api.getDraftMessagesApiPublicV1DraftMessagesIntegrationIdGet(
        opts.integrationId,
      );
    return response.data;
  }

  async getGeneratedCourse(
    opts: IntegrationIdOptions,
  ): Promise<GeneratedCourseResponse> {
    const response =
      await this.apiClient.api.getGeneratedCourseApiPublicV1DraftGeneratedCourseIntegrationIdGet(
        opts.integrationId,
      );
    return response.data;
  }
}
