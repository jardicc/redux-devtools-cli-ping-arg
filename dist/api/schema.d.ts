import type { Store } from '../store.js';
export declare const schema: string;
export declare const resolvers: {
    Query: {
        reports: (source: unknown, args: unknown, context: {
            store: Store;
        }) => Promise<import("../store.js").Report[]>;
        report: (source: unknown, args: {
            id: string;
        }, context: {
            store: Store;
        }) => Promise<import("../store.js").Report | {
            error: string;
        }>;
    };
};
