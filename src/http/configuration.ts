import { PublicApiExecutions } from "../executions/public-api-executions";
import { PublicConfigurationResponse } from "../types";

export class LumaConfigurationClient {
  constructor(private readonly executions: PublicApiExecutions) {}

  async get(): Promise<PublicConfigurationResponse> {
    return this.executions.getConfiguration();
  }
}
