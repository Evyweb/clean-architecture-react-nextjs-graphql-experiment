'use client';

import {useContext} from "react";
import {DependencyContext} from "@/app/_providers/DependencyProvider";
import {DependencyContainer} from "@/src/client/DependencyInjection";

export function useDependency<K extends keyof DependencyContainer>(key: K): ReturnType<DependencyContainer[K]> {
    const context = useContext(DependencyContext);
    if (!context) {
        throw new Error("useDependency must be used within a DependencyProvider");
    }

    const dependency = context[key];
    return dependency() as ReturnType<DependencyContainer[K]>;
}
