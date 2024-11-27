import {setupServer} from "msw/node";
import {http} from "msw";

export function mockGraphQLQuery<T>({server, endpoint, query, variables, fakeResponse}: {
    endpoint: string,
    server: ReturnType<typeof setupServer>,
    query: string,
    variables?: object,
    fakeResponse: T,
}) {
    server.use(
        http.post(endpoint, async ({request}) => {
            const body = await request.text();

            if (body !== JSON.stringify({
                query,
                variables
            })) {
                return new Response(JSON.stringify({
                    errors: ['Invalid request']
                }), {status: 400});
            }

            return new Response(JSON.stringify({
                data: fakeResponse
            }));
        })
    );
}
