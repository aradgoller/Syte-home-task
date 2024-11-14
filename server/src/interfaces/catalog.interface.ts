import { Document } from 'mongoose';

export interface Catalog {
  name: string;
  vertical: Vertical;
  primary: boolean;
  locales: string[];
  indexedAt: Date;
}

export type CatalogDocument = Document & Catalog;

export enum Vertical {
  fashion = 'fashion',
  home = 'home',
  general = 'general',
}
