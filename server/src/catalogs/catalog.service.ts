import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CatalogDocument } from '../interfaces/catalog.interface';
import { CATALOG_MODEL_INJECTION_TOKEN } from 'src/constants';
import { CreateOrUpdateCatalogDto } from 'src/dtos/create-or-update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @Inject(CATALOG_MODEL_INJECTION_TOKEN)
    private catalogModel: Model<CatalogDocument>,
  ) {}

  async create(
    createCatalogDto: CreateOrUpdateCatalogDto,
  ): Promise<CatalogDocument> {
    if (createCatalogDto.primary) {
      const catalogWithPrimaryTrue = await this.catalogModel.findOne({
        vertical: createCatalogDto.vertical,
        primary: true,
      });

      await catalogWithPrimaryTrue.updateOne({ primary: false });
    }

    const createdCatalog = new this.catalogModel(createCatalogDto);
    return createdCatalog.save();
  }

  async update(
    updateCatalogDto: CreateOrUpdateCatalogDto,
    catalogId: string,
  ): Promise<CatalogDocument> {
    if (updateCatalogDto.primary) {
      const catalogWithPrimaryTrue = await this.catalogModel.findOne({
        vertical: updateCatalogDto.vertical,
        primary: true,
      });

      await catalogWithPrimaryTrue.updateOne({ primary: false });
    }

    const catalogToUpdate = await this.catalogModel.findOne({ _id: catalogId });

    const updatedCatalog = await catalogToUpdate.updateOne(updateCatalogDto);

    return updatedCatalog;
  }

  async findAll(): Promise<CatalogDocument[]> {
    return this.catalogModel.find().exec();
  }
}
