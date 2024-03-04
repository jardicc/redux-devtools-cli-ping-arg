import knex from 'knex';
import { AGServer } from 'socketcluster-server';
export default function connector(options: AGServer.AGServerOptions): knex.Knex<any, unknown[]>;
