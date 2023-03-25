import { NextRouter } from 'next/router';
import { cloneElement, ComponentType, ReactNode } from "react";

export type GetDefaultTextGenerator = (path: string, href: string) => string;
export type GetTextGenerator = (param: string, query: NextRouter['query']) => null | Promise<string>;
export type GeneratePathParts = (path: string) => string[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const _defaultGetTextGenerator: GetTextGenerator = (param, query) => null;

export const _defaultGetDefaultTextGenerator: GetDefaultTextGenerator = (path) => path;

export const generatePathParts: GeneratePathParts = (path): string[] => {
    try {
    return path
        .replace(/\?.+/gm, '')
        .split('/')
        .filter(Boolean);
    } catch (err) {
        console.trace(err);
        return [];
    }
};

/**
 * The helper to render any kind of react component.
 *
 * Forked from the repo mentioned below:
 * https://github.com/TanStack/table/blob/main/packages/react-table
 */
export function flexRender<TProps extends object>(Component: Renderable<TProps>, props: TProps): ReactNode | JSX.Element {
    return isAtomicComponent(Component)
        ? Component
        : isReactComponent<TProps>(Component)
            ? <Component {...props} />
            : cloneElement(Component as JSX.Element, props as TProps);
}

function isClassComponent(component: any) {
    return (
        typeof component === 'function' &&
        (() => {
            const proto = Object.getPrototypeOf(component)
            return proto.prototype && proto.prototype.isReactComponent
        })()
    )
}

function isExoticComponent(component: any) {
    return (
        typeof component === 'object' &&
        typeof component.$$typeof === 'symbol' &&
        ['react.memo', 'react.forward_ref', 'react.portal'].includes(component.$$typeof.description)
    )
}

function isReactComponent<TProps>(
    component: unknown
): component is ComponentType<TProps> {
    return (
        isClassComponent(component) ||
        typeof component === 'function' ||
        isExoticComponent(component)
    )
}

type AtomicReactNodes = "string" | "number" | "boolean" | null | undefined;

function isAtomicComponent (component: unknown): component is AtomicReactNodes {
    return component === null || ["string", "number", "boolean", "undefined"].includes(typeof component)
};


export type Renderable<TProps> = ReactNode | ComponentType<TProps> | JSX.Element

