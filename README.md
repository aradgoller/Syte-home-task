# Catalogs Dashboard Task

This project implements a dashboard for managing client catalog data, built with **React (TypeScript)** on the frontend and **NestJS** on the backend. It uses **Material-UI (MUI)** for UI components, **MongoDB** as the database, **Mongoose** as the ORM, and **React Query** for handling data fetching.

## Overview

Each catalog represents a collection of products with metadata such as name, type, locale, and indexing status.

### Terminology

- **Catalog**: Represents information about a client's products.
- **Vertical**: The category of products in the catalog (e.g., fashion, home, general).
- **Locale**: Language and region code, such as `en_US`, `en_CA`, `es_ES`.
- **Indexing Process**: An offline process that can be run on the catalog to update its metadata.

### User Capabilities

Users should be able to:
- View a table of the catalogs.
- See each catalog’s name, vertical, primary status, and if it’s multi-locale.
- Verify if the catalog is primary for its vertical.
- Check the last indexing date.

### Features

- **Catalog List View**: Displays all catalogs with relevant information.
- **Primary Indicator**: Highlights the primary catalog if more than one exists in the same vertical.
- **Locale Display**: Indicates multi-locale catalogs when they contain more than one locale.

## Tech Stack

- **Frontend**: React with TypeScript, Material-UI for components, React Query for requests
- **Backend**: NestJS for API management and data handling
- **Database**: MongoDB with Mongoose as the ORM

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   cd client
   npm install
   ```
   ```bash
   cd server
   npm install
   ```
3. Set up a MongoDB instance and update the database URI in your environment configuration.
4. Run the data seeding script to insert mock data:
   ```bash
   ts-node server/src/scripts/insert-seed
   ```
5. Run the NestJS backend:
   ```bash
   cd server
   npm run start:dev
   ```
6. Run the React frontend:
   ```bash
   cd client
   npm run dev
   ```

## API Endpoints

- **GET /catalogs**: Fetch all catalogs
- **POST /catalogs**: Add a new catalog
- **PUT /catalogs/?catalogId=id**: Update a catalog
