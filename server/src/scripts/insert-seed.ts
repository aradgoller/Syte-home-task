import mongoose, { model, Model } from 'mongoose';
import { Catalog, Vertical } from '../interfaces/catalog.interface';
import { CatalogSchema } from '../schemas/catalog.schema';

const mockCatalogs: Catalog[] = [
  {
    name: 'FashionCatalog',
    primary: true,
    vertical: Vertical.fashion,
    locales: ['en', 'fr', 'es'],
    indexedAt: new Date('2024-01-01'),
  },
  {
    name: 'HomeCatalog',
    primary: false,
    vertical: Vertical.home,
    locales: ['de'],
    indexedAt: new Date('2024-02-01'),
  },
  {
    name: 'GeneralCatalog',
    primary: false,
    vertical: Vertical.general,
    locales: ['en', 'zh'],
    indexedAt: new Date('2024-03-01'),
  },
  {
    name: 'LuxuryFashion',
    primary: false,
    vertical: Vertical.general,
    locales: ['en'],
    indexedAt: new Date('2024-04-01'),
  },
  {
    name: 'BudgetHomeGoods',
    primary: true,
    vertical: Vertical.general,
    locales: ['es', 'pt'],
    indexedAt: new Date('2024-05-01'),
  },
  {
    name: 'EcoFriendlyGeneral',
    primary: false,
    vertical: Vertical.fashion,
    locales: ['en', 'de', 'fr', 'nl'],
    indexedAt: new Date('2024-06-01'),
  },
  {
    name: 'KidsFashion',
    primary: true,
    vertical: Vertical.home,
    locales: ['en', 'fr', 'es', 'it'],
    indexedAt: new Date('2024-07-01'),
  },
  {
    name: 'ModernHome',
    primary: false,
    vertical: Vertical.general,
    locales: ['en'],
    indexedAt: new Date('2024-08-01'),
  },
  {
    name: 'OfficeSupplies',
    primary: false,
    vertical: Vertical.home,
    locales: ['en', 'de', 'es'],
    indexedAt: new Date('2024-09-01'),
  },
  {
    name: 'VintageFashion',
    primary: false,
    vertical: Vertical.home,
    locales: ['en', 'fr', 'de', 'it'],
    indexedAt: new Date('2024-10-01'),
  },
  {
    name: 'GeneralCatalog',
    primary: false,
    vertical: Vertical.general,
    locales: ['en', 'zh'],
    indexedAt: new Date('2024-11-01'),
  },
];

const Catalog: Model<Catalog> = model<Catalog>('Catalog', CatalogSchema);

async function seedCatalogs() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/nest');

    console.log('Connected to MongoDB');

    // Insert mock data
    await Catalog.insertMany(mockCatalogs);
    console.log('Mock data inserted successfully');
  } catch (error) {
    console.error('Error inserting mock data:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

seedCatalogs();
