import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION_INJECTION_TOKEN } from 'src/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_INJECTION_TOKEN,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`${process.env.MONGO_URL}/nest`),
  },
];
