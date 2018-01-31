/// <reference path="../../../../tmp/townies_api/custom.d.ts" />
import { Configuration } from "./configuration";
/**
 *
 * @export
 */
export declare const COLLECTION_FORMATS: {
    csv: string;
    ssv: string;
    tsv: string;
    pipes: string;
};
/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}
/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}
/**
 *
 * @export
 * @class BaseAPI
 */
export declare class BaseAPI {
    protected basePath: string;
    protected fetch: FetchAPI;
    protected configuration: Configuration;
    constructor(configuration?: Configuration, basePath?: string, fetch?: FetchAPI);
}
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export declare class RequiredError extends Error {
    field: string;
    name: "RequiredError";
    constructor(field: string, msg?: string);
}
/**
 * ManagementApiApi - fetch parameter creator
 * @export
 */
export declare const ManagementApiApiFetchParamCreator: (configuration?: Configuration) => {
    healthCheckGet(options?: any): FetchArgs;
};
/**
 * ManagementApiApi - functional programming interface
 * @export
 */
export declare const ManagementApiApiFp: (configuration?: Configuration) => {
    healthCheckGet(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Response>;
};
/**
 * ManagementApiApi - factory interface
 * @export
 */
export declare const ManagementApiApiFactory: (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) => {
    healthCheckGet(options?: any): Promise<Response>;
};
/**
 * ManagementApiApi - object-oriented interface
 * @export
 * @class ManagementApiApi
 * @extends {BaseAPI}
 */
export declare class ManagementApiApi extends BaseAPI {
    /**
     * Returns a web service's current health status state. Status State String: GOOD, WARN, BAD (or otherwise configured values). WARN is a (graceful) degraded state - service only provides core, required functionality when in this state. If LTM detects non-200 response or BAD, node should be pulled from rotation immediately.
     * @summary Simple LTM monitor API to determine if the node is bad. Responds with text/plain and 200 or 500 code.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ManagementApiApi
     */
    healthCheckGet(options?: any): Promise<Response>;
}
