import { DeleteDraftResponse } from "../api/generated-api";
import { PublicApiExecutions } from "../executions/public-api-executions";
import {
  AssetsResponse,
  ChatOptions,
  CreateDraftOptions,
  CreateDraftResponse,
  DeleteIngestedDocumentOptions,
  DeleteIngestedDocumentResponse,
  DraftFilesResponse,
  DraftMessagesResponse,
  GeneratedCourseBundleResponse,
  GeneratedCourseResponse,
  GetDraftResponse,
  IngestDraftFileOptions,
  IngestDraftFileResponse,
  IntegrationIdOptions,
} from "../types";

export class LumaCoursesClient {
  constructor(private readonly executions: PublicApiExecutions) {}

  chat(opts: ChatOptions): ReturnType<PublicApiExecutions["chat"]> {
    return this.executions.chat(opts);
  }

  async createDraft(opts: CreateDraftOptions): Promise<CreateDraftResponse> {
    return this.executions.createDraft(opts);
  }

  async ingestFile(opts: IngestDraftFileOptions): Promise<IngestDraftFileResponse> {
    return this.executions.ingestDraftFile(opts);
  }

  async deleteIngestedDocument(
    opts: DeleteIngestedDocumentOptions,
  ): Promise<DeleteIngestedDocumentResponse> {
    return this.executions.deleteIngestedDocument(opts);
  }

  async getDraftFiles(opts: IntegrationIdOptions): Promise<DraftFilesResponse> {
    return this.executions.getDraftFiles(opts);
  }

  async getDraft(opts: IntegrationIdOptions): Promise<GetDraftResponse> {
    return this.executions.getDraft(opts);
  }

  async getDraftMessages(opts: IntegrationIdOptions): Promise<DraftMessagesResponse> {
    return this.executions.getDraftMessages(opts);
  }

  async getGeneratedCourse(opts: IntegrationIdOptions): Promise<GeneratedCourseResponse> {
    return this.executions.getGeneratedCourse(opts);
  }

  async getGeneratedCourseBundle(
    opts: IntegrationIdOptions,
  ): Promise<GeneratedCourseBundleResponse> {
    return this.executions.getGeneratedCourseBundle(opts);
  }

  async getAssets(opts: IntegrationIdOptions): Promise<AssetsResponse> {
    return this.executions.getAssets(opts);
  }

  async deleteDraft(opts: IntegrationIdOptions): Promise<DeleteDraftResponse> {
    return this.executions.deleteDraft(opts);
  }
}
