import { Connection } from 'mongoose';
import { CatalogSchema } from '../schemas/catalog.schema';
import {
  CATALOG_MODEL_INJECTION_TOKEN,
  DATABASE_CONNECTION_INJECTION_TOKEN,
} from 'src/constants';

export const catalogProviders = [
  {
    provide: CATALOG_MODEL_INJECTION_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model('Catalog', CatalogSchema),
    inject: [DATABASE_CONNECTION_INJECTION_TOKEN],
  },
];
