import * as mongoose from 'mongoose';

export const CatalogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      min: 1,
      required: true,
    },
    primary: Boolean,

    vertical: {
      type: String,
      default: 'general',
      enum: ['fashion', 'home', 'general'],
    },

    locales: [
      {
        type: String,
      },
    ],

    indexedAt: { type: Date, default: () => new Date() },
  },
  {
    versionKey: false,
  },
);
