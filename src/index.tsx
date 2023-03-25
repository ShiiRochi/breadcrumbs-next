import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  _defaultGetDefaultTextGenerator,
  _defaultGetTextGenerator, flexRender,
  generatePathParts,
  GetDefaultTextGenerator,
  GetTextGenerator,
} from './utils';
import { BreadCrumb } from './types';

export type CrumbProps = {
  href: string;
  text: string;
  isLast: boolean;

  [key: string]: any;
};

export type NextBreadcrumbsProps = {
  Container: FC<{ children: ReactNode }>;
  Crumb: FC<CrumbProps>;
  // TODO: think about two props below,
  //  it may be that there is no need to have them both
  getTextGenerator: GetTextGenerator;
  getDefaultTextGenerator: GetDefaultTextGenerator;
  // TODO: являются параметры частью активного элемента или самый последний из крамбов является активным?
  useQueryParamsAsPathItems: string[];
};

export function createNextCrumbComponent(Component: FC): FC {
  function NextCrumb({ text, textGenerator, ...props }) {
    const [children, setChildren] = useState(text);

    useEffect(() => {
      if (!textGenerator) return;

      // TODO: maybe it's better to use subscription model
      async function handler() {
        const text = await textGenerator();
        setChildren(text);
      }

      handler();
    }, [textGenerator]);

    return <Component {...props}>{children}</Component>;
  }

  NextCrumb.displayName = `NextCrumb`;

  return NextCrumb;
}

export default function NextBreadcrumbs({
  Container,
  Crumb,
  getTextGenerator = _defaultGetTextGenerator,
  getDefaultTextGenerator = _defaultGetDefaultTextGenerator,
}: NextBreadcrumbsProps): ReactNode {
  const router = useRouter();

  const breadcrumbs: BreadCrumb[] = useMemo(() => {
    const asPathNestedRoutes = generatePathParts(router.asPath);
    const pathnameNestedRoutes = generatePathParts(router.pathname);

    // Маршруты на подобии [[...something]] будут передаваться в генераторы как:
    // getDefaultSomething("something", something[0], 0), а именно - название поля, его значение и его порядковое положение в строке соответственно.
    // Модуль не знает в каком порядке появляются параметры у его пользователя (разработчика) в приложении,
    // а потому безопаснее полагать, что последний лучше осознаёт как их назвать на основании порядкового числа.
    // Вопрос только в том, как их удалять? Ну разве что брать всё до, потом после и удалять этот параметр. То есть нужно понимать какое место он занимает и генерировать "УДАЛЯТОР", "ГДЕ УДАЛЯТОР???!!!"
    const crumbs = asPathNestedRoutes.map((subpath, idx) => {
      // "[post_id]" --> "post_id"
      const param = pathnameNestedRoutes[idx].replace(/[[\]]/gm, '');

      const href = `/${asPathNestedRoutes.slice(0, idx + 1).join('/')}`;

      return {
        href,
        textGenerator: getTextGenerator(param, router.query),
        text: getDefaultTextGenerator(subpath, href),
      };
    });

    return [{ href: '/', text: 'Home', textGenerator: null }, ...crumbs];
  }, [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator]);

  return (
    <Container aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => {
        return flexRender(Crumb, {
          ...crumb,
          key: idx,
          isLast: idx === breadcrumbs.length - 1
        });
      })}
    </Container>
  );
}
