import type { Router } from 'express';
import { AGServer } from 'socketcluster-server';
import type { Store } from './store.js';
declare function routes(options: AGServer.AGServerOptions, store: Store, scServer: AGServer): Router;
export default routes;
