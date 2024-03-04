import path from 'path';
import { fileURLToPath } from 'url';
import knex from 'knex';
export default function connector(options) {
    const dbOptions = options.dbOptions;
    dbOptions.useNullAsDefault = true;
    if (!dbOptions.migrate) {
        return knex(dbOptions);
    }
    dbOptions.migrations = {
        directory: path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations'),
    };
    dbOptions.seeds = {
        directory: path.join(path.dirname(fileURLToPath(import.meta.url)), 'seeds'),
    };
    const knexInstance = knex(dbOptions);
    /* eslint-disable no-console */
    knexInstance.migrate
        .latest({ loadExtensions: ['.js'] })
        .then(function () {
        return knexInstance.seed.run({ loadExtensions: ['.js'] });
    })
        .then(function () {
        console.log('   \x1b[0;32m[Done]\x1b[0m Migrations are finished\n');
    })
        .catch(function (error) {
        console.error(error);
    });
    /* eslint-enable no-console */
    return knexInstance;
}
