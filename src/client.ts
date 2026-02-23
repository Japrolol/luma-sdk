import { API, DeleteDraftResponse } from "./api/generated-api";
import { Agent as HttpsAgent } from "node:https";
import { PublicApiExecutions } from "./executions/public-api-executions";
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
} from "./types";

export type LumaClientOptions = {
  baseURL?: string;
  apiKey?: string;
  httpsAgent?: HttpsAgent;
  allowInsecureTls?: boolean;
};

export class LumaClient {
  apiClient: API<unknown>;
  private readonly executions: PublicApiExecutions;

  constructor(opts: LumaClientOptions) {
    const httpsAgent =
      opts.httpsAgent ??
      (opts.allowInsecureTls ? new HttpsAgent({ rejectUnauthorized: false }) : undefined);

    this.apiClient = new API({
      baseURL: opts.baseURL,
      secure: true,
      httpsAgent,
      headers: {
        "X-API-Key": opts.apiKey,
      },
    });

    this.executions = new PublicApiExecutions(this.apiClient);
  }

  async chat(opts: ChatOptions): ReturnType<PublicApiExecutions["chat"]> {
    return this.executions.chat(opts);
  }

  async createDraft(opts: CreateDraftOptions): Promise<CreateDraftResponse> {
    return this.executions.createDraft(opts);
  }

  async ingestDraftFile(opts: IngestDraftFileOptions): Promise<IngestDraftFileResponse> {
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

  async deleteDraft(opts: IntegrationIdOptions): Promise<DeleteDraftResponse> {
    return this.executions.deleteDraft(opts);
  }
}
