import fs from 'fs';
export const schema = fs.readFileSync(new URL('./schema_def.graphql', import.meta.url), 'utf8');
export const resolvers = {
    Query: {
        reports: function report(source, args, context) {
            return context.store.listAll();
        },
        report: function report(source, args, context) {
            return context.store.get(args.id);
        },
    },
};
