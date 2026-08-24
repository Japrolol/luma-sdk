/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** AiRuntimeResolutionErrorCode */
export enum AiRuntimeResolutionErrorCode {
  ApiKeyNotFound = "api_key_not_found",
  DomainNotSupported = "domain_not_supported",
  ModeNotAllowed = "mode_not_allowed",
  CustomProfileRequired = "custom_profile_required",
  CustomProfileNotFound = "custom_profile_not_found",
  CustomProfileKindMismatch = "custom_profile_kind_mismatch",
  CustomProfileSecretMissing = "custom_profile_secret_missing",
  CoreProviderKeyMissing = "core_provider_key_missing",
  Disabled = "disabled",
}

/** AiCapabilityProvider */
export enum AiCapabilityProvider {
  Luma = "luma",
  MentingoCore = "mentingo-core",
}

/** AiCapabilityMode */
export enum AiCapabilityMode {
  Core = "core",
  Custom = "custom",
  Disabled = "disabled",
}

/** AiCapability */
export enum AiCapability {
  CourseGeneration = "courseGeneration",
  CourseGenerationVisualAssets = "courseGenerationVisualAssets",
  CourseGenerationEmbeddings = "courseGenerationEmbeddings",
  AiMentorChat = "aiMentorChat",
  AiMentorJudge = "aiMentorJudge",
  AiMentorConfigurationGenerator = "aiMentorConfigurationGenerator",
  AiJudgeConfigurationGenerator = "aiJudgeConfigurationGenerator",
  AiJudgeConfigurationValidator = "aiJudgeConfigurationValidator",
  AiMentorRagEmbeddings = "aiMentorRagEmbeddings",
  TranslationGeneration = "translationGeneration",
  DictationTranscription = "dictationTranscription",
  VoiceTranscription = "voiceTranscription",
  VoiceMentor = "voiceMentor",
  VoiceTextToSpeech = "voiceTextToSpeech",
}

/** AiCapabilityStatus */
export interface AiCapabilityStatus {
  /** Enabled */
  enabled: boolean;
  mode: AiCapabilityMode;
  provider: AiCapabilityProvider | null;
  reason?: AiRuntimeResolutionErrorCode | null;
}

/** AiJudgeBlockingErrorValidationTarget */
export interface AiJudgeBlockingErrorValidationTarget {
  /** Type */
  type: "blockingError";
  /**
   * Ref
   * @pattern ^B[1-9]\d*$
   */
  ref: string;
  /** Field */
  field: string | null;
}

/** AiJudgeConfigurationBlockingError */
export interface AiJudgeConfigurationBlockingError {
  /**
   * Ref
   * @pattern ^B[1-9]\d*$
   */
  ref: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
}

/** AiJudgeConfigurationCriterion */
export interface AiJudgeConfigurationCriterion {
  /**
   * Ref
   * @pattern ^C[1-9]\d*$
   */
  ref: string;
  /**
   * Title
   * @minLength 1
   * @maxLength 80
   */
  title: string;
  /**
   * Expectedbehavior
   * @minLength 1
   */
  expectedBehavior: string;
  /**
   * Maxscore
   * @min 1
   * @max 5
   */
  maxScore: number;
  /** Scoreguidance */
  scoreGuidance: AiJudgeConfigurationScoreGuidance[];
}

/** AiJudgeConfigurationResponse */
export interface AiJudgeConfigurationResponse {
  /**
   * Taskgoal
   * @minLength 1
   */
  taskGoal: string;
  /**
   * Passingthresholdpercent
   * @min 0
   * @max 100
   */
  passingThresholdPercent: number;
  /** Criteria */
  criteria: AiJudgeConfigurationCriterion[];
  /** Blockingerrors */
  blockingErrors: AiJudgeConfigurationBlockingError[];
}

/** AiJudgeConfigurationScoreGuidance */
export interface AiJudgeConfigurationScoreGuidance {
  /**
   * Score
   * @min 0
   * @max 5
   */
  score: number;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /** Example */
  example: string | null;
}

/** AiJudgeConfigurationValidationResponse */
export interface AiJudgeConfigurationValidationResponse {
  /**
   * Summary
   * @minLength 1
   * @maxLength 180
   */
  summary: string;
  /**
   * Issues
   * @maxItems 3
   */
  issues: AiJudgeValidationIssue[];
}

/** AiJudgeConfigurationValidationTarget */
export interface AiJudgeConfigurationValidationTarget {
  /** Type */
  type: "configuration";
  /** Field */
  field: string | null;
}

/** AiJudgeCriterionValidationTarget */
export interface AiJudgeCriterionValidationTarget {
  /** Type */
  type: "criterion";
  /**
   * Ref
   * @pattern ^C[1-9]\d*$
   */
  ref: string;
  /** Field */
  field: string | null;
}

/** AiJudgeScoreGuidanceValidationTarget */
export interface AiJudgeScoreGuidanceValidationTarget {
  /** Type */
  type: "scoreGuidance";
  /**
   * Ref
   * @pattern ^C[1-9]\d*$
   */
  ref: string;
  /**
   * Score
   * @min 0
   * @max 5
   */
  score: number;
  /** Field */
  field: string | null;
}

/** AiJudgeValidationIssue */
export interface AiJudgeValidationIssue {
  /**
   * Code
   * @minLength 1
   */
  code: string;
  /** Severity */
  severity: "error" | "warning";
  /** Target */
  target:
    | ({
        type: "blockingError";
      } & AiJudgeBlockingErrorValidationTarget)
    | ({
        type: "configuration";
      } & AiJudgeConfigurationValidationTarget)
    | ({
        type: "criterion";
      } & AiJudgeCriterionValidationTarget)
    | ({
        type: "scoreGuidance";
      } & AiJudgeScoreGuidanceValidationTarget);
  /**
   * Message
   * @minLength 1
   * @maxLength 160
   */
  message: string;
  /**
   * Correction
   * @minLength 1
   * @maxLength 220
   */
  correction: string;
}

/** AiMentorRoleplayConfigurationResponse */
export interface AiMentorRoleplayConfigurationResponse {
  /**
   * Scenario
   * @minLength 1
   */
  scenario: string;
  /**
   * Airole
   * @minLength 1
   */
  aiRole: string;
  /**
   * Learnerrole
   * @minLength 1
   */
  learnerRole: string;
  /**
   * Charactergoal
   * @minLength 1
   */
  characterGoal: string;
  /** Difficulty */
  difficulty: "cooperative" | "realistic" | "challenging";
  /** Factsandconstraints */
  factsAndConstraints: string | null;
  /** Openinginstruction */
  openingInstruction: string | null;
  /** Additionalinstructions */
  additionalInstructions: string | null;
}

/** AiMentorTeacherConfigurationResponse */
export interface AiMentorTeacherConfigurationResponse {
  /**
   * Taskgoal
   * @minLength 1
   */
  taskGoal: string;
  /**
   * Expertise
   * @minLength 1
   */
  expertise: string;
  /**
   * Contentscope
   * @minLength 1
   */
  contentScope: string;
  /** Teachingstyle */
  teachingStyle: "explain_and_practice" | "guided_discovery" | "socratic";
  /** Feedbackguidance */
  feedbackGuidance: string | null;
  /** Openinginstruction */
  openingInstruction: string | null;
  /** Additionalinstructions */
  additionalInstructions: string | null;
}

/** ArchitectAiJudgeBlockingErrorResponse */
export interface ArchitectAiJudgeBlockingErrorResponse {
  /** Description */
  description: string;
}

/** ArchitectAiJudgeConfigurationResponse */
export interface ArchitectAiJudgeConfigurationResponse {
  /** Taskgoal */
  taskGoal: string;
  /**
   * Passingthresholdpercent
   * @min 0
   * @max 100
   */
  passingThresholdPercent: number;
  /**
   * Criteria
   * @minItems 1
   */
  criteria: ArchitectAiJudgeCriterionResponse[];
  /** Blockingerrors */
  blockingErrors: ArchitectAiJudgeBlockingErrorResponse[];
}

/** ArchitectAiJudgeCriterionResponse */
export interface ArchitectAiJudgeCriterionResponse {
  /** Title */
  title: string;
  /** Expectedbehavior */
  expectedBehavior: string;
  /**
   * Maxscore
   * @min 1
   * @max 5
   */
  maxScore: number;
  /** Scoreguidance */
  scoreGuidance: ArchitectAiJudgeScoreGuidanceResponse[];
}

/** ArchitectAiJudgeScoreGuidanceResponse */
export interface ArchitectAiJudgeScoreGuidanceResponse {
  /**
   * Score
   * @min 0
   * @max 5
   */
  score: number;
  /** Description */
  description: string;
  /** Example */
  example: string;
}

/** ArchitectAiMentorLessonResponse */
export interface ArchitectAiMentorLessonResponse {
  /** Name */
  name: string;
  /** Aimentorconfiguration */
  aiMentorConfiguration:
    | ({
        type: "roleplay";
      } & ArchitectAiMentorRoleplayConfigurationResponse)
    | ({
        type: "teacher";
      } & ArchitectAiMentorTeacherConfigurationResponse);
  /** Relevantcontext */
  relevantContext?: string | null;
  aiJudgeConfiguration: ArchitectAiJudgeConfigurationResponse;
  /** Ttspreset */
  ttsPreset: "male" | "female";
}

/** ArchitectAiMentorRoleplayConfigurationResponse */
export interface ArchitectAiMentorRoleplayConfigurationResponse {
  /** Type */
  type: "roleplay";
  /** Scenario */
  scenario: string;
  /** Airole */
  aiRole: string;
  /** Learnerrole */
  learnerRole: string;
  /** Charactergoal */
  characterGoal: string;
  /** Difficulty */
  difficulty: "cooperative" | "realistic" | "challenging";
  /** Factsandconstraints */
  factsAndConstraints?: string | null;
  /** Openinginstruction */
  openingInstruction?: string | null;
  /** Additionalinstructions */
  additionalInstructions?: string | null;
}

/** ArchitectAiMentorTeacherConfigurationResponse */
export interface ArchitectAiMentorTeacherConfigurationResponse {
  /** Type */
  type: "teacher";
  /** Taskgoal */
  taskGoal: string;
  /** Expertise */
  expertise: string;
  /** Contentscope */
  contentScope: string;
  /** Teachingstyle */
  teachingStyle: "explain_and_practice" | "guided_discovery" | "socratic";
  /** Feedbackguidance */
  feedbackGuidance?: string | null;
  /** Openinginstruction */
  openingInstruction?: string | null;
  /** Additionalinstructions */
  additionalInstructions?: string | null;
}

/** ArchitectChapterResponse */
export interface ArchitectChapterResponse {
  /** Chapterindex */
  chapterIndex: number;
  /** Title */
  title: string;
  /** Lessons */
  lessons: ArchitectLessonResponse[];
  [key: string]: any;
}

/** ArchitectCourseResponse */
export interface ArchitectCourseResponse {
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Chapters */
  chapters: ArchitectChapterResponse[];
  [key: string]: any;
}

/** ArchitectLessonAssetResponse */
export interface ArchitectLessonAssetResponse {
  /** Type */
  type: "image";
  /** Assetid */
  assetId?: string | null;
  /** Content */
  content?: string | null;
  /** Visualquery */
  visualQuery?: string | null;
  /** Priority */
  priority?: "high" | "medium" | "low" | null;
  [key: string]: any;
}

/** ArchitectLessonResponse */
export interface ArchitectLessonResponse {
  /** Lessontype */
  lessonType: "AI_MENTOR" | "CONTENT" | "QUIZ";
  /** Title */
  title: string;
  /** Content */
  content?: string | null;
  /** Questions */
  questions?: ArchitectQuizQuestionResponse[] | null;
  aiMentor?: ArchitectAiMentorLessonResponse | null;
  /** Assets */
  assets?: ArchitectLessonAssetResponse[];
  [key: string]: any;
}

/** ArchitectQuizOptionResponse */
export interface ArchitectQuizOptionResponse {
  /** Optionindex */
  optionIndex: number;
  /** Optiontext */
  optionText: string;
  /** Iscorrect */
  isCorrect: boolean;
  /** Blankanswerid */
  blankAnswerId?: string | null;
  [key: string]: any;
}

/** ArchitectQuizQuestionResponse */
export interface ArchitectQuizQuestionResponse {
  /** Questionindex */
  questionIndex: number;
  /** Type */
  type:
    | "SingleSelect"
    | "MultiSelect"
    | "TrueOrFalse"
    | "BriefResponse"
    | "DetailedResponse"
    | "FillInTheBlanks"
    | "GapFill";
  /** Title */
  title: string;
  /** Description */
  description?: string | null;
  /** Solutionexplanation */
  solutionExplanation?: string | null;
  /** Options */
  options?: ArchitectQuizOptionResponse[] | null;
  [key: string]: any;
}

/** AssetResponse */
export interface AssetResponse {
  /**
   * Assetid
   * @format uuid
   */
  assetId: string;
  /** Signedurl */
  signedUrl: string;
}

/** Body_ingest_api_public_v1_draft_ingest__integration_id__post */
export interface BodyIngestApiPublicV1DraftIngestIntegrationIdPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_transcribe_dictation_api_public_v1_ai_transcriptions_post */
export interface BodyTranscribeDictationApiPublicV1AiTranscriptionsPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** CreateDraft */
export interface CreateDraft {
  /**
   * Integrationid
   * @format uuid
   */
  integrationId: string;
  /**
   * Courselanguage
   * @default "en"
   */
  courseLanguage?: string;
  /** Draftname */
  draftName: string;
}

/** CreateDraftResponse */
export interface CreateDraftResponse {
  /**
   * Draftid
   * @format uuid
   */
  draftId: string;
}

/** DeleteDraftResponse */
export interface DeleteDraftResponse {
  /** Message */
  message: string;
}

/** DeleteIngestedDocumentResponse */
export interface DeleteIngestedDocumentResponse {
  /** Message */
  message: string;
}

/** DraftFilesResponseBody */
export interface DraftFilesResponseBody {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Filename */
  filename: string;
  /** Contenttype */
  contentType: string;
}

/** DraftMessageResponse */
export interface DraftMessageResponse {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Draftid
   * @format uuid
   */
  draftId: string;
  /** Role */
  role: string;
  /** Content */
  content: string;
  /** Contenttype */
  contentType: string;
  /** Draftmetadata */
  draftMetadata?: Record<string, any> | null;
  /**
   * Createdat
   * @format date-time
   */
  createdAt: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt: string;
}

/** EmbeddingsRequest */
export interface EmbeddingsRequest {
  /** Texts */
  texts: string[];
}

/** EmbeddingsResponse */
export interface EmbeddingsResponse {
  /** Embeddings */
  embeddings: number[][];
}

/** GenerateAiMentorConfigurationRequest */
export interface GenerateAiMentorConfigurationRequest {
  /** Messages */
  messages: PublicAiMessage[];
  /** Temperature */
  temperature?: number | null;
  /** Configurationtype */
  configurationType: "teacher" | "roleplay";
}

/** GetDraftResponse */
export interface GetDraftResponse {
  /**
   * Draftid
   * @format uuid
   */
  draftId: string;
  /** Iscoursegenerated */
  isCourseGenerated: boolean;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** IngestDraftResponse */
export interface IngestDraftResponse {
  /** Success */
  success: boolean;
  /** Queued */
  queued: boolean;
  /** Jobid */
  jobId?: string | null;
}

/** JudgeCriterionResult */
export interface JudgeCriterionResult {
  /**
   * Criterionref
   * @pattern ^C[1-9]\d*$
   */
  criterionRef: string;
  /**
   * Awardedscore
   * @min 0
   */
  awardedScore: number;
  /**
   * Learnersafefeedback
   * @minLength 1
   */
  learnerSafeFeedback: string;
}

/** JudgeResponse */
export interface JudgeResponse {
  /** Criterionresults */
  criterionResults: JudgeCriterionResult[];
  /** Triggeredblockingerrors */
  triggeredBlockingErrors: JudgeTriggeredBlockingError[];
}

/** JudgeTriggeredBlockingError */
export interface JudgeTriggeredBlockingError {
  /**
   * Blockingerrorref
   * @pattern ^B[1-9]\d*$
   */
  blockingErrorRef: string;
  /**
   * Learnersafefeedback
   * @minLength 1
   */
  learnerSafeFeedback: string;
}

/** MentorChatRequest */
export interface MentorChatRequest {
  /** Messages */
  messages: PublicAiMessage[];
  /** Temperature */
  temperature?: number | null;
  /** Voicesessionid */
  voiceSessionId?: string | null;
}

/** MentorChatResponse */
export interface MentorChatResponse {
  /** Message */
  message: string;
}

/** Message */
export interface Message {
  /** Message */
  message: string;
}

/** PublicAiMessage */
export interface PublicAiMessage {
  /** Role */
  role: "system" | "user" | "assistant";
  /** Content */
  content: string;
}

/** PublicConfigurationResponse */
export interface PublicConfigurationResponse {
  /** Coursegeneration */
  courseGeneration: boolean;
  /** Voicementor */
  voiceMentor: boolean;
  /** Enabled */
  enabled: boolean;
  /** Capabilities */
  capabilities: Record<AiCapability, AiCapabilityStatus>;
}

/** StructuredGenerationRequest */
export interface StructuredGenerationRequest {
  /** Messages */
  messages: PublicAiMessage[];
  /** Temperature */
  temperature?: number | null;
}

/** TranscriptionResponse */
export interface TranscriptionResponse {
  /** Text */
  text: string;
}

/** TranslationResponse */
export interface TranslationResponse {
  /** Translations */
  translations: string[];
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
  /** Input */
  input?: any;
  /** Context */
  ctx?: object;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Luma API
 * @version 0.1.0
 */
export class API<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Streams AI chat responses for the draft associated with `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name ChatApiPublicV1AiChatIntegrationIdPost
     * @summary Chat With Draft By Integration ID
     * @request POST:/api/public/v1/ai/chat/{integration_id}
     * @secure
     */
    chatApiPublicV1AiChatIntegrationIdPost: (
      integrationId: string,
      data: Message,
      params: RequestParams = {},
    ) =>
      this.request<any, void | HTTPValidationError>({
        path: `/api/public/v1/ai/chat/${integrationId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns only ready AI assets (successfully generated and uploaded) for the draft associated with `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name GetAssetsApiPublicV1AiAssetsIntegrationIdGet
     * @summary Get Draft Assets By Integration ID
     * @request GET:/api/public/v1/ai/assets/{integration_id}
     * @secure
     */
    getAssetsApiPublicV1AiAssetsIntegrationIdGet: (
      integrationId: string,
      params: RequestParams = {},
    ) =>
      this.request<AssetResponse[], void | HTTPValidationError>({
        path: `/api/public/v1/ai/assets/${integrationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns whether required API-key-scoped provider secrets are configured for course generation and voice mentor. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name GetConfigurationStatusApiPublicV1AiConfigurationGet
     * @summary Get Public API Configuration Status
     * @request GET:/api/public/v1/ai/configuration
     * @secure
     */
    getConfigurationStatusApiPublicV1AiConfigurationGet: (
      params: RequestParams = {},
    ) =>
      this.request<PublicConfigurationResponse, void>({
        path: `/api/public/v1/ai/configuration`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name MentorChatApiPublicV1AiMentorChatPost
     * @summary Stream Mentor Chat With Custom Runtime
     * @request POST:/api/public/v1/ai/mentor/chat
     * @secure
     */
    mentorChatApiPublicV1AiMentorChatPost: (
      data: MentorChatRequest,
      params: RequestParams = {},
    ) =>
      this.request<void, void | HTTPValidationError>({
        path: `/api/public/v1/ai/mentor/chat`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name GenerateMentorChatApiPublicV1AiMentorChatGeneratePost
     * @summary Generate Mentor Chat Message With Custom Runtime
     * @request POST:/api/public/v1/ai/mentor/chat/generate
     * @secure
     */
    generateMentorChatApiPublicV1AiMentorChatGeneratePost: (
      data: MentorChatRequest,
      params: RequestParams = {},
    ) =>
      this.request<MentorChatResponse, void | HTTPValidationError>({
        path: `/api/public/v1/ai/mentor/chat/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name MentorJudgeApiPublicV1AiMentorJudgePost
     * @summary Run AI Mentor Judge With Custom Runtime
     * @request POST:/api/public/v1/ai/mentor/judge
     * @secure
     */
    mentorJudgeApiPublicV1AiMentorJudgePost: (
      data: StructuredGenerationRequest,
      params: RequestParams = {},
    ) =>
      this.request<JudgeResponse, void | HTTPValidationError>({
        path: `/api/public/v1/ai/mentor/judge`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name GenerateMentorConfigurationApiPublicV1AiMentorConfigurationGeneratePost
     * @summary Generate AI Mentor Configuration With Custom Runtime
     * @request POST:/api/public/v1/ai/mentor-configuration/generate
     * @secure
     */
    generateMentorConfigurationApiPublicV1AiMentorConfigurationGeneratePost: (
      data: GenerateAiMentorConfigurationRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        | AiMentorTeacherConfigurationResponse
        | AiMentorRoleplayConfigurationResponse,
        void | HTTPValidationError
      >({
        path: `/api/public/v1/ai/mentor-configuration/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name GenerateJudgeConfigurationApiPublicV1AiJudgeConfigurationGeneratePost
     * @summary Generate AI Judge Configuration With Custom Runtime
     * @request POST:/api/public/v1/ai/judge-configuration/generate
     * @secure
     */
    generateJudgeConfigurationApiPublicV1AiJudgeConfigurationGeneratePost: (
      data: StructuredGenerationRequest,
      params: RequestParams = {},
    ) =>
      this.request<AiJudgeConfigurationResponse, void | HTTPValidationError>({
        path: `/api/public/v1/ai/judge-configuration/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name ValidateJudgeConfigurationApiPublicV1AiJudgeConfigurationValidatePost
     * @summary Validate AI Judge Configuration With Custom Runtime
     * @request POST:/api/public/v1/ai/judge-configuration/validate
     * @secure
     */
    validateJudgeConfigurationApiPublicV1AiJudgeConfigurationValidatePost: (
      data: StructuredGenerationRequest,
      params: RequestParams = {},
    ) =>
      this.request<
        AiJudgeConfigurationValidationResponse,
        void | HTTPValidationError
      >({
        path: `/api/public/v1/ai/judge-configuration/validate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name GenerateTranslationsApiPublicV1AiTranslationsGeneratePost
     * @summary Generate Translations With Custom Runtime
     * @request POST:/api/public/v1/ai/translations/generate
     * @secure
     */
    generateTranslationsApiPublicV1AiTranslationsGeneratePost: (
      data: StructuredGenerationRequest,
      params: RequestParams = {},
    ) =>
      this.request<TranslationResponse, void | HTTPValidationError>({
        path: `/api/public/v1/ai/translations/generate`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name CreateEmbeddingsApiPublicV1AiEmbeddingsPost
     * @summary Create Embeddings With Custom Runtime
     * @request POST:/api/public/v1/ai/embeddings
     * @secure
     */
    createEmbeddingsApiPublicV1AiEmbeddingsPost: (
      data: EmbeddingsRequest,
      params: RequestParams = {},
    ) =>
      this.request<EmbeddingsResponse, void | HTTPValidationError>({
        path: `/api/public/v1/ai/embeddings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public - Require API Key
     * @name TranscribeDictationApiPublicV1AiTranscriptionsPost
     * @summary Transcribe Dictation Audio With Custom Runtime
     * @request POST:/api/public/v1/ai/transcriptions
     * @secure
     */
    transcribeDictationApiPublicV1AiTranscriptionsPost: (
      data: BodyTranscribeDictationApiPublicV1AiTranscriptionsPost,
      params: RequestParams = {},
    ) =>
      this.request<TranscriptionResponse, void | HTTPValidationError>({
        path: `/api/public/v1/ai/transcriptions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a draft for a given `integration_id` (the external course identifier you are building a draft for) under the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name CreateDraftApiPublicV1DraftPost
     * @summary Create Draft By Integration ID
     * @request POST:/api/public/v1/draft
     * @secure
     */
    createDraftApiPublicV1DraftPost: (
      data: CreateDraft,
      params: RequestParams = {},
    ) =>
      this.request<CreateDraftResponse, void | HTTPValidationError>({
        path: `/api/public/v1/draft`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the draft associated with `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name DeleteDraftApiPublicV1DraftIntegrationIdDelete
     * @summary Delete Draft By Integration ID
     * @request DELETE:/api/public/v1/draft/{integration_id}
     * @secure
     */
    deleteDraftApiPublicV1DraftIntegrationIdDelete: (
      integrationId: string,
      params: RequestParams = {},
    ) =>
      this.request<DeleteDraftResponse, void | HTTPValidationError>({
        path: `/api/public/v1/draft/${integrationId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches draft status for the provided `integration_id` (the external course identifier you are building a draft for) inside the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name GetDraftApiPublicV1DraftIntegrationIdGet
     * @summary Get Draft Status By Integration ID
     * @request GET:/api/public/v1/draft/{integration_id}
     * @secure
     */
    getDraftApiPublicV1DraftIntegrationIdGet: (
      integrationId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetDraftResponse, void | HTTPValidationError>({
        path: `/api/public/v1/draft/${integrationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Uploads a file to the draft associated with `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name IngestApiPublicV1DraftIngestIntegrationIdPost
     * @summary Ingest File To Draft By Integration ID
     * @request POST:/api/public/v1/draft/ingest/{integration_id}
     * @secure
     */
    ingestApiPublicV1DraftIngestIntegrationIdPost: (
      integrationId: string,
      data: BodyIngestApiPublicV1DraftIngestIntegrationIdPost,
      params: RequestParams = {},
    ) =>
      this.request<IngestDraftResponse, void | HTTPValidationError>({
        path: `/api/public/v1/draft/ingest/${integrationId}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Removes a previously ingested document from the draft associated with `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name DeleteIngestedDocumentApiPublicV1DraftIngestIntegrationIdDocumentIdDelete
     * @summary Delete Ingested Document By Integration ID
     * @request DELETE:/api/public/v1/draft/ingest/{integration_id}/{document_id}
     * @secure
     */
    deleteIngestedDocumentApiPublicV1DraftIngestIntegrationIdDocumentIdDelete: (
      integrationId: string,
      documentId: string,
      params: RequestParams = {},
    ) =>
      this.request<DeleteIngestedDocumentResponse, void | HTTPValidationError>({
        path: `/api/public/v1/draft/ingest/${integrationId}/${documentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns all files linked to the draft for the provided `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name GetDraftFilesApiPublicV1DraftFilesIntegrationIdGet
     * @summary Get Draft Files By Integration ID
     * @request GET:/api/public/v1/draft/files/{integration_id}
     * @secure
     */
    getDraftFilesApiPublicV1DraftFilesIntegrationIdGet: (
      integrationId: string,
      params: RequestParams = {},
    ) =>
      this.request<DraftFilesResponseBody[], void | HTTPValidationError>({
        path: `/api/public/v1/draft/files/${integrationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns all draft chat messages for the draft associated with `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name GetDraftMessagesApiPublicV1DraftMessagesIntegrationIdGet
     * @summary Get Draft Messages By Integration ID
     * @request GET:/api/public/v1/draft/messages/{integration_id}
     * @secure
     */
    getDraftMessagesApiPublicV1DraftMessagesIntegrationIdGet: (
      integrationId: string,
      params: RequestParams = {},
    ) =>
      this.request<DraftMessageResponse[], void | HTTPValidationError>({
        path: `/api/public/v1/draft/messages/${integrationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the generated course payload for the draft associated with `integration_id` (the external course identifier you are building a draft for), scoped to the organization resolved from `X-API-Key`. Authorization header required: `X-API-Key: <luma_api_key>`.
     *
     * @tags Public - Require API Key
     * @name GetGeneratedCourseApiPublicV1DraftGeneratedCourseIntegrationIdGet
     * @summary Get Generated Course By Integration ID
     * @request GET:/api/public/v1/draft/generated-course/{integration_id}
     * @secure
     */
    getGeneratedCourseApiPublicV1DraftGeneratedCourseIntegrationIdGet: (
      integrationId: string,
      params: RequestParams = {},
    ) =>
      this.request<ArchitectCourseResponse, void | HTTPValidationError>({
        path: `/api/public/v1/draft/generated-course/${integrationId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
