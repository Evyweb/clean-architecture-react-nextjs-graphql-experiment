'use client';

import {useContext} from "react";
import {DependencyContext} from "@/app/_DependencyInjection/DependencyProvider";
import {DependencyContainer} from "@/app/_DependencyInjection/DependencyInjection";

export function useDependency<K extends keyof DependencyContainer>(key: K, args?: any): ReturnType<DependencyContainer[K]> {
    const context = useContext(DependencyContext);
    if (!context) {
        throw new Error("useDependency must be used within a DependencyProvider");
    }
    const dependency = context[key];
    return dependency(args) as ReturnType<DependencyContainer[K]>;
}