import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers, schema } from './api/schema.js';
const app = express.Router();
const require = createRequire(import.meta.url);
function serveUmdModule(name) {
    app.use(express.static(path.dirname(require.resolve(name + '/package.json')) + '/umd'));
}
function routes(options, store, scServer) {
    const limit = options.maxRequestBody;
    const logHTTPRequests = options.logHTTPRequests;
    if (logHTTPRequests) {
        if (typeof logHTTPRequests === 'object')
            app.use(morgan('combined', logHTTPRequests));
        else
            app.use(morgan('combined'));
    }
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
    });
    server
        .start()
        .then(() => {
        app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server, {
            context: () => Promise.resolve({ store }),
        }));
    })
        .catch((error) => {
        console.error(error); // eslint-disable-line no-console
    });
    serveUmdModule('react');
    serveUmdModule('react-dom');
    serveUmdModule('@redux-devtools/app');
    app.get('/port.js', function (req, res) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        res.send(`reduxDevToolsPort = ${options.port}`);
    });
    app.get('*', function (req, res) {
        res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '../app/index.html'));
    });
    app.use(cors({ methods: 'POST' }));
    app.use(bodyParser.json({ limit: limit }));
    app.use(bodyParser.urlencoded({ limit: limit, extended: false }));
    app.post('/', function (req, res) {
        if (!req.body)
            return res.status(404).end();
        switch (req.body.op) {
            case 'get':
                store
                    .get(req.body.id)
                    .then(function (r) {
                    res.send(r || {});
                })
                    .catch(function (error) {
                    console.error(error); // eslint-disable-line no-console
                    res.sendStatus(500);
                });
                break;
            case 'list':
                store
                    .list(req.body.query, req.body.fields)
                    .then(function (r) {
                    res.send(r);
                })
                    .catch(function (error) {
                    console.error(error); // eslint-disable-line no-console
                    res.sendStatus(500);
                });
                break;
            default:
                store
                    .add(req.body)
                    .then(function (r) {
                    res.send({
                        id: r.id,
                        error: r.error,
                    });
                    void scServer.exchange.transmitPublish('report', {
                        type: 'add',
                        data: r,
                    });
                })
                    .catch(function (error) {
                    console.error(error); // eslint-disable-line no-console
                    res.status(500).send({});
                });
        }
    });
    return app;
}
export default routes;
