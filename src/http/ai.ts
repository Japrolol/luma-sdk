import { API } from "../api/generated-api";
import {
  CreateEmbeddingsOptions,
  CreateEmbeddingsResponse,
  GenerateTranslationsOptions,
  GenerateTranslationsResponse,
  TranscribeDictationOptions,
  TranscribeDictationResponse,
} from "../types";

export class LumaAiClient {
  constructor(private readonly apiClient: API<unknown>) {}

  async createEmbeddings(opts: CreateEmbeddingsOptions): Promise<CreateEmbeddingsResponse> {
    const response = await this.apiClient.api.createEmbeddingsApiPublicV1AiEmbeddingsPost(opts);

    return response.data;
  }

  async generateTranslations(
    opts: GenerateTranslationsOptions,
  ): Promise<GenerateTranslationsResponse> {
    const response =
      await this.apiClient.api.generateTranslationsApiPublicV1AiTranslationsGeneratePost(opts);

    return response.data;
  }

  async transcribeDictation(
    opts: TranscribeDictationOptions,
  ): Promise<TranscribeDictationResponse> {
    const response =
      await this.apiClient.api.transcribeDictationApiPublicV1AiTranscriptionsPost(opts);

    return response.data;
  }
}
