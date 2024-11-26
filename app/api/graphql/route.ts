import {inject} from "@/src/server/DependencyInjection";
import {graphql} from "graphql";
import {schema} from "@/app/api/graphql/schema";
import {revalidatePath} from "next/cache";

const characterController = inject('GRAPHQL_CHARACTER_CONTROLLER');

async function graphqlHandler(request: Request, shouldRevalidate: boolean = false): Promise<Response> {
    const {query, variables} = await request.json();

    const result = await graphql({
        schema,
        source: query,
        rootValue: characterController,
        variableValues: variables,
    });

    if (shouldRevalidate) {
        revalidatePath('/');
    }

    return new Response(JSON.stringify(result), {
        status: result.errors ? 400 : 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function GET(request: Request): Promise<Response> {
    return graphqlHandler(request, false);
}

export async function POST(request: Request): Promise<Response> {
    return graphqlHandler(request, true);
}

