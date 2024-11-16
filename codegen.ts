import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './app/api/graphql/route.ts',
    generates: {
        './types/graphql.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
        },
    },
};

export default config;
