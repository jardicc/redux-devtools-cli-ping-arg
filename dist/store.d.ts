import { AGServer } from 'socketcluster-server';
type ReportType = 'STATE' | 'ACTION' | 'STATES' | 'ACTIONS';
export interface Report {
    id: string;
    type: ReportType | null;
    title: string | null;
    description: string | null;
    action: string | null;
    payload: string;
    preloadedState: string | null;
    screenshot: string | null;
    userAgent: string | null;
    version: string | null;
    userId: string | null;
    user: string | null;
    meta: string | null;
    exception: string | null;
    instanceId: string | null;
    added: string | null;
    appId?: string | null;
}
export interface ReportBaseFields {
    id: string;
    title: string | null;
    added: string | null;
}
export interface AddData {
    type: ReportType | null;
    title: string | null;
    description: string | null;
    action: string | null;
    payload: string;
    preloadedState: string | null;
    screenshot: string | null;
    version: string | null;
    userAgent: string | null;
    userId: string | null;
    user: {
        id: string;
    } | string | null;
    instanceId: string | null;
    meta: string | null;
    exception?: Error;
    appId?: string | null;
}
export interface Store {
    list: (query?: string, fields?: string[]) => Promise<ReportBaseFields[]>;
    listAll: (query?: string) => Promise<Report[]>;
    get: (id: string) => Promise<Report | {
        error: string;
    }>;
    add: (data: AddData) => Promise<ReportBaseFields | {
        error: string;
    }>;
}
declare function createStore(options: AGServer.AGServerOptions): Store;
export default createStore;
