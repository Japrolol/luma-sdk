import { Agent as HttpsAgent } from "node:https";

import { API } from "../api/generated-api";
import { PublicApiExecutions } from "../executions/public-api-executions";
import { LumaAiClient } from "./ai";
import { LumaConfigurationClient } from "./configuration";
import { LumaCoursesClient } from "./courses";
import { LumaMentorClient } from "./mentor";

export type LumaClientOptions = {
  baseURL?: string;
  apiKey?: string;
  httpsAgent?: HttpsAgent;
  allowInsecureTls?: boolean;
};

export class LumaClient {
  readonly ai: LumaAiClient;
  readonly configuration: LumaConfigurationClient;
  readonly courses: LumaCoursesClient;
  readonly mentor: LumaMentorClient;
  private readonly apiClient: API<unknown>;
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
    this.ai = new LumaAiClient(this.apiClient);
    this.configuration = new LumaConfigurationClient(this.executions);
    this.courses = new LumaCoursesClient(this.executions);
    this.mentor = new LumaMentorClient(this.apiClient);
  }
}

export const createLumaClient = (opts: LumaClientOptions): LumaClient => {
  return new LumaClient(opts);
};
