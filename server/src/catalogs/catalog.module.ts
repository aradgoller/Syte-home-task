import { Module } from '@nestjs/common';
import { CatalogsController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { catalogProviders } from './catalog.providers';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [CatalogsController],
  providers: [CatalogService, ...catalogProviders],
})
export class CatalogsModule {}
