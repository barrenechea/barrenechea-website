import type { Page } from 'astro';

export interface IMDX {
  title: string;
  description: string;
  pubDate: Date;
  imgSrc: string;
  imgAlt: string;
  link?: string;
  url: string;
  tags?: string[];
  ogOverride?: string;
}

export type IMDXPage = Page<IMDX>;
