import { NextRouter } from 'next/router';
import { cloneElement, ComponentType, ReactNode } from 'react';

export type GetDefaultTextGenerator = (config: {
  paramName: string;
  paramValue: string;
  href: string;
  // global index within path
  paramIndex: number;
  isCatchAllSubpath: boolean;
  // The index of param under paramName with a given value within
  // a slug will create its own index counting context
  paramSlugIndex: null | number;
  query: NextRouter['query'];
}) => string;

export type TextGeneratorFn = () => string | Promise<string>;

export type GetTextGenerator = (config: {
  paramName: string;
  paramValue: string;
  href: string;
  // global index within path
  paramIndex: number;
  isCatchAllSubpath: boolean;
  // The index of param under paramName with a given value within
  // a slug will create its own index counting context
  paramSlugIndex: null | number;
  query: NextRouter['query'];
}) => null | TextGeneratorFn;
export type GeneratePathParts = (path: string) => string[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const _defaultGetTextGenerator: GetTextGenerator = () => null;

export const _defaultGetDefaultTextGenerator: GetDefaultTextGenerator = ({ paramValue }) => paramValue;

export const generatePathParts: GeneratePathParts = (path): string[] => {
  try {
    return path.replace(/\?.+/gm, '').split('/').filter(Boolean);
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
export function flexRender<TProps extends object>(
  Component: Renderable<TProps>,
  props: TProps,
): ReactNode | JSX.Element {
  return isAtomicComponent(Component) ? (
    Component
  ) : isReactComponent<TProps>(Component) ? (
    <Component {...props} />
  ) : (
    cloneElement(Component as JSX.Element, props as TProps)
  );
}

function isClassComponent(component: any) {
  return (
    typeof component === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(component);
      return proto.prototype && proto.prototype.isReactComponent;
    })()
  );
}

function isExoticComponent(component: any) {
  return (
    typeof component === 'object' &&
    typeof component.$$typeof === 'symbol' &&
    ['react.memo', 'react.forward_ref', 'react.portal'].includes(component.$$typeof.description)
  );
}

function isReactComponent<TProps>(component: unknown): component is ComponentType<TProps> {
  return isClassComponent(component) || typeof component === 'function' || isExoticComponent(component);
}

export type Renderable<TProps> = ReactNode | ComponentType<TProps> | JSX.Element;

export type AtomicReactNodes = 'string' | 'number' | 'boolean' | null | undefined;

function isAtomicComponent(component: unknown): component is AtomicReactNodes {
  return component === null || ['string', 'number', 'boolean', 'undefined'].includes(typeof component);
}

/**
 * Checks that any given routePath is a catchAll nested route
 * @param routePath
 * @example
 * [[...]] --> false
 * [[...items]] --> true
 */
export const isCatchAllPatternNestedRoute = (routePath: string): boolean => /^\[\[\.\.\..+]]$/.test(routePath);
