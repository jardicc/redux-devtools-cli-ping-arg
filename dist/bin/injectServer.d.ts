import type { Options } from '../options.js';
export declare const dir = "local-cli/server";
export declare const file = "server.js";
export declare const fullPath: string;
export declare function inject(modulePath: string, options: Options, moduleName: string): boolean;
export declare function revert(modulePath: string, options: Options, moduleName: string): boolean;
