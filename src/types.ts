import { TextGeneratorFn } from './utils';

export type BreadCrumb = {
  href: string;
  text: string;
  textGenerator: null | TextGeneratorFn;
};
