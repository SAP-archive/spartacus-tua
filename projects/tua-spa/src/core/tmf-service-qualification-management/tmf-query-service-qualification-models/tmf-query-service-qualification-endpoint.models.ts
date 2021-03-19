export const QUERY_SERVICE_QUALIFICATION_DEFAULT_SCOPE = 'default';

/**
 * Structure for Tmf QueryServiceQualification endpoint
 */
export interface TmfQueryServiceQualificationEndpoint {
  baseUrl?: string;
  prefix?: string;
  endpoint?: string | TmfQueryServiceQualificationWithScope;
}

/**
 * Structure for Tmf QueryServiceQualification endpoint with scope
 */
export interface TmfQueryServiceQualificationWithScope {
  default?: string;
  [scope: string]: string;
}

/**
 * Structure for Tmf QueryServiceQualification endpoints
 */
export interface TmfQueryServiceQualificationEndpointMap {
  [id: string]: TmfQueryServiceQualificationEndpoint;
}
