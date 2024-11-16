'use client';

import {createContext, FC, ReactNode} from "react";
import {DependencyContainer} from "@/src/client/DependencyInjection";

export const DependencyContext = createContext<DependencyContainer | null>(null);

interface DependencyProviderProps {
    container: DependencyContainer;
    children: ReactNode;
}

export const DependencyProvider: FC<DependencyProviderProps> = ({container, children}) => {
    return (
        <DependencyContext.Provider value={container}>
            {children}
        </DependencyContext.Provider>
    );
};