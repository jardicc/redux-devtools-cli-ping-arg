interface ProtocolOptions {
    key: string | undefined;
    cert: string | undefined;
    passphrase: string | undefined;
}
interface DbOptions {
    client: string;
    connection: {
        filename: string;
    };
    useNullAsDefault: boolean;
    debug: boolean;
    migrate: boolean;
}
export interface Options {
    host: string | undefined;
    port: number;
    protocol: 'http' | 'https';
    protocolOptions: ProtocolOptions | undefined;
    dbOptions: DbOptions;
    maxRequestBody: string;
    logHTTPRequests?: boolean;
    pingTimeout: number;
    logLevel: 0 | 1 | 3 | 2;
    wsEngine: string;
}
export default function getOptions(argv: {
    [arg: string]: any;
}): Options;
export {};
