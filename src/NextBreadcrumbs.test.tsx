import { render, screen } from '@testing-library/react';
import { vi } from "vitest";
import {NextRouter, useRouter} from "next/router";

vi.mock('next/router', () => {
  return {
    useRouter: vi.fn()
  }
});

import NextBreadcrumbs, { createNextCrumbComponent } from './NextBreadcrumbs';
import { ReactNode } from 'react';

const Crumb = createNextCrumbComponent(function Crumb({ href, text, isLast }) {
  return (
    <span data-link={href} aria-current={isLast ? 'page' : false} data-testid="breadcrumb__item">
      {text}
    </span>
  );
});

function Nav({ children }: { children: ReactNode }) {
  return <nav data-testid="breadcrumb">{children}</nav>;
}

describe('NextBreadcrumbs', () => {
  it('should render crumbs', () => {

    useRouter.mockReturnValue({
      isReady: true,
      asPath: "/projects/232",
      pathname: "/projects/[projectId]"
    } as NextRouter);

    render(<NextBreadcrumbs Crumb={Crumb} Container={Nav} getDefaultTextGenerator={({
        paramName,
        paramValue
    }) => {
      console.log({ paramName, paramValue });

      if (paramName === "projectId" && paramValue === "232") return "Spreading";

      return paramValue;
    }} />);

    const container = screen.getByTestId('breadcrumb');

    expect(container).toBeInTheDocument();
    expect(screen.queryAllByTestId(`breadcrumb__item`)).toMatchInlineSnapshot(`
      [
        <span
          aria-current="false"
          data-link="/"
          data-testid="breadcrumb__item"
        >
          Home
        </span>,
        <span
          aria-current="false"
          data-link="/projects"
          data-testid="breadcrumb__item"
        >
          projects
        </span>,
        <span
          aria-current="page"
          data-link="/projects/232"
          data-testid="breadcrumb__item"
        >
          Spreading
        </span>,
      ]
    `);
  });
});
