'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactNode, useState} from 'react'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    )
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
}