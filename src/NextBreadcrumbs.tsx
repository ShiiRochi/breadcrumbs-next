import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  _defaultGetDefaultTextGenerator,
  _defaultGetTextGenerator,
  flexRender,
  generatePathParts,
  GetDefaultTextGenerator,
  GetTextGenerator,
  isCatchAllPatternNestedRoute,
  TextGeneratorFn,
} from './utils';
import { BreadCrumb } from './types';
import { useRouter } from "next/router";

export type CrumbComponentProps = {
  href: string;
  text: string;
  isLast: boolean;
  isFirst: boolean;
  textGenerator: null | TextGeneratorFn;
};

export type NextBreadcrumbsProps = {
  Container: string | FC<{ children: ReactNode }>;
  Crumb: FC<CrumbComponentProps>;
  // TODO: think about two props below,
  //  it may be that there is no need to have them both
  getTextGenerator?: GetTextGenerator;
  getDefaultTextGenerator?: GetDefaultTextGenerator;
  // TODO: implement
  // useQueryParamsAsPathItems?: string[];
  // Determine the text for home link
  homeText?: string;
};

export function createNextCrumbComponent(Component: FC<Omit<CrumbComponentProps, "textGenerator">>): FC<CrumbComponentProps> {
  function NextCrumb({
    text: _text,
    textGenerator,
    ...props
  }: CrumbComponentProps): JSX.Element {
    const [text, setText] = useState(_text);

    useEffect(() => {
      if (!textGenerator) return;

      // TODO: maybe it's better to use subscription model
      async function handler() {
        const text = await (textGenerator as TextGeneratorFn)();
        setText(text);
      }

      handler();
    }, [textGenerator]);

    return <Component {...props} text={text}/>;
  }

  NextCrumb.displayName = `NextCrumb`;

  return NextCrumb;
}

export default function NextBreadcrumbs({
  Container,
  Crumb,
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
  homeText = 'Home',
}: NextBreadcrumbsProps): JSX.Element {
  const router = useRouter();

  const breadcrumbs: BreadCrumb[] = useMemo(() => {
    if (!router.isReady) return [];

    // Здесь будет уже конкретная ссылка
    const asPathSplit = generatePathParts(router.asPath);

    // Здесь будет паттерн маршрута
    const pathnameSplit = generatePathParts(router.pathname);

    // Маршруты на подобии [[...something]] будут передаваться в генераторы как:
    // getDefaultSomething("something", something[0], 0), а именно - название поля, его значение и его порядковое положение в строке соответственно.
    // Модуль не знает в каком порядке появляются параметры у его пользователя (разработчика) в приложении,
    // а потому безопаснее полагать, что последний лучше осознаёт как их назвать на основании порядкового числа.
    // Вопрос только в том, как их удалять? Ну разве что брать всё до, потом после и удалять этот параметр. То есть нужно понимать какое место он занимает и генерировать "УДАЛЯТОР", "ГДЕ УДАЛЯТОР???!!!"

    // Next against catch-all inside catch-all, i.e. [[...items]]/vlog/[[...others]].
    // Failed to reload dynamic routes: Error: Catch-all must be the last part of the URL.
    // Если idx входит в паттерн, то нужно вызвать метод с передачей как раз-таки названия слага,
    // значением и индексом, но индексом, который является индексом
    // самого элемента в последовательности слага. Далее уже можно выдавать индекс общий,
    // типа в целом какое он место занимает в списке путей.
    const catchAllRouteIndex = pathnameSplit.findIndex((item) => isCatchAllPatternNestedRoute(item));

    const crumbs = asPathSplit
      .map((subpath, idx) => {
        const isCatchAllSubpath = catchAllRouteIndex !== -1 && idx >= catchAllRouteIndex;

        const subpathPathnameItemIndex = isCatchAllSubpath ? catchAllRouteIndex : idx;

        // "[post_id]" --> "post_id"
        // "[[...items]]" --> "items"
        const param = pathnameSplit[subpathPathnameItemIndex].replace(/[[\].]*/gm, '');

        // TODO: with query parameters as breadcrumbs items it
        //  should be changed respectively
        // it's okay even with catch all routes
        // ["items", "13", '132'] --> /items/13
        const href = `/${asPathSplit.slice(0, idx + 1).join('/')}`;

        return {
          href,
          textGenerator: getTextGenerator({
            paramName: param,
            paramValue: subpath,
            href,
            query: router.query,
            paramIndex: idx,
            isCatchAllSubpath,
            paramSlugIndex: isCatchAllSubpath ? idx - catchAllRouteIndex : null,
          }),
          text: getDefaultTextGenerator({
            paramValue: subpath,
            paramName: param,
            href,
            query: router.query,
            paramIndex: idx,
            isCatchAllSubpath,
            paramSlugIndex: isCatchAllSubpath ? idx - catchAllRouteIndex : null,
          }),
        };
      })
      .filter(Boolean);

    return [{ href: '/', text: homeText, textGenerator: null }, ...crumbs];
  }, [
    router.isReady,
    router.asPath,
    router.pathname,
    router.query,
    homeText,
    getTextGenerator,
    getDefaultTextGenerator,
  ]);

  return (
    <Container aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => {
        return flexRender<CrumbComponentProps & { key: number | string }>(Crumb, {
          ...crumb,
          key: idx,
          isLast: idx === breadcrumbs.length - 1,
          isFirst: idx === 0,
        });
      })}
    </Container>
  );
}
