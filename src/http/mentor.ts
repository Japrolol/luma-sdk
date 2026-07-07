import { API } from "../api/generated-api";
import {
  MentorChatOptions,
  MentorGenerateChatResponse,
  MentorJudgeOptions,
  MentorJudgeResponse,
} from "../types";

export class LumaMentorClient {
  constructor(private readonly apiClient: API<unknown>) {}

  streamChat(
    opts: MentorChatOptions,
  ): ReturnType<API<unknown>["api"]["mentorChatApiPublicV1AiMentorChatPost"]> {
    return this.apiClient.api.mentorChatApiPublicV1AiMentorChatPost(opts, {
      format: "stream",
    });
  }

  chat(
    opts: MentorChatOptions,
  ): ReturnType<API<unknown>["api"]["mentorChatApiPublicV1AiMentorChatPost"]> {
    return this.streamChat(opts);
  }

  async generateChat(opts: MentorChatOptions): Promise<MentorGenerateChatResponse> {
    const response =
      await this.apiClient.api.generateMentorChatApiPublicV1AiMentorChatGeneratePost(opts);

    return response.data;
  }

  async judge(opts: MentorJudgeOptions): Promise<MentorJudgeResponse> {
    const response = await this.apiClient.api.mentorJudgeApiPublicV1AiMentorJudgePost(opts);

    return response.data;
  }
}
