import { LumaClient, LumaClientOptions } from "./client";

export * from "./client";
export * from "./types";

export const createLumaClient = (opts: LumaClientOptions): LumaClient => {
  return new LumaClient(opts);
};

