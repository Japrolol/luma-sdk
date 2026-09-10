import {
  AiCapabilityMode,
  createLumaClient,
  LUMA_AI_MODEL_DOMAINS,
  LUMA_AI_MODEL_PROFILE_KINDS,
  LUMA_API_KEY_CONCURRENCY_TIERS,
} from "../src/index";
import type {
  AdminApiKeyAssignmentUpdateOptions,
  AdminApiKeyUpdateOptions,
  LumaAiModelProfileKind,
  LumaApiKeyConcurrencyTier,
} from "../src/http/admin.types";

const apiKeyUpdate: AdminApiKeyUpdateOptions = {
  organizationId: "organization-123",
  apiKeyId: "api-key-123",
  concurrencyTier: LUMA_API_KEY_CONCURRENCY_TIERS.HIGH,
};

const assignmentUpdate: AdminApiKeyAssignmentUpdateOptions = {
  organizationId: "organization-123",
  apiKeyId: "api-key-123",
  domain: LUMA_AI_MODEL_DOMAINS.AI_MENTOR,
  mode: AiCapabilityMode.Custom,
};

const profileKind: LumaAiModelProfileKind = LUMA_AI_MODEL_PROFILE_KINDS.CHAT;
const concurrencyTier: LumaApiKeyConcurrencyTier = LUMA_API_KEY_CONCURRENCY_TIERS.MEDIUM;
const client = createLumaClient({ apiKey: "admin-secret" });

void apiKeyUpdate;
void assignmentUpdate;
void profileKind;
void concurrencyTier;
void client.admin.modelProfiles.list({ organizationId: "organization-123" });
