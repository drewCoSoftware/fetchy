export interface IStatusData {
    HasError: boolean;
    IsLoading: boolean;
    Message: string;
}
export interface FetchyCallOptions {
    method?: string | undefined;
    body?: any;
    headers?: {};
    credentials: RequestCredentials;
}
export interface IApiResponse {
    Code: number;
    Message: string;
}
export interface FetchyResponse<T extends IApiResponse> {
    Data: T | null;
    Success: boolean;
    Error: any | null;
    StatusCode: number;
}
interface FetchyOptions {
    ContentType?: string;
    UserAgent?: string;
    CredentialType?: RequestCredentials;
}
export declare class Fetchy {
    private Options;
    constructor(ops_?: FetchyOptions);
    delete(url: string): Promise<FetchyResponse<IApiResponse>>;
    put(url: string): Promise<FetchyResponse<IApiResponse>>;
    get<T extends IApiResponse>(url: string): Promise<FetchyResponse<IApiResponse>>;
    post(url: string, data?: any): Promise<FetchyResponse<IApiResponse>>;
    file(url: string): Promise<void>;
    private BuildCallOptions;
    private BuildHeaders;
}
export {};
