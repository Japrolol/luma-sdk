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

/** ArchitectAiMentorLesson */
export interface ArchitectAiMentorLesson {
  /** Name */
  name: string;
  /** Aimentorinstructions */
  aiMentorInstructions: string;
  /** Completionconditions */
  completionConditions: string;
  /** Type */
  type: "ROLEPLAY" | "MENTOR" | "TEACHER";
  /** Taskdescription */
  taskDescription: string;
}

/** ArchitectChapter */
export interface ArchitectChapter {
  /** Chapterindex */
  chapterIndex: number;
  /** Title */
  title: string;
  /** Lessons */
  lessons: ArchitectLesson[];
}

/** ArchitectCourseResponse */
export interface ArchitectCourseResponse {
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Chapters */
  chapters: ArchitectChapter[];
}

/** ArchitectLesson */
export interface ArchitectLesson {
  /** Lessontype */
  lessonType: "AI_MENTOR" | "CONTENT" | "QUIZ";
  /** Title */
  title: string;
  /** Content */
  content: string | null;
  /** Questions */
  questions: ArchitectQuizQuestion[] | null;
  aiMentor: ArchitectAiMentorLesson | null;
}

/** ArchitectQuizOption */
export interface ArchitectQuizOption {
  /** Optionindex */
  optionIndex: number;
  /** Optiontext */
  optionText: string;
  /** Iscorrect */
  isCorrect: boolean;
}

/** ArchitectQuizQuestion */
export interface ArchitectQuizQuestion {
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
  description: string | null;
  /** Solutionexplanation */
  solutionExplanation: string | null;
  /** Options */
  options: ArchitectQuizOption[] | null;
}

/** Body_ingest_api_public_v1_draft_ingest__integration_id__post */
export interface BodyIngestApiPublicV1DraftIngestIntegrationIdPost {
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

/** Message */
export interface Message {
  /** Message */
  message: string;
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
