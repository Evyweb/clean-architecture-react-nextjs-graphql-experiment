export async function fetchGraphQL<TData, TVariables = object>(
    endpoint: string,
    query: string,
    variables?: TVariables
): Promise<TData> {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await response.json();

    if (json.errors) {
        throw new Error(JSON.stringify(json.errors));
    }

    return json.data;
}