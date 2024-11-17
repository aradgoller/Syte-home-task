import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogDocument } from '../interfaces/catalog.interface';
import { CreateOrUpdateCatalogDto } from 'src/dtos/create-or-update-catalog.dto';
import { HttpError } from 'src/http-exception.filter';

@Controller('catalogs')
export class CatalogsController {
  constructor(private catalogService: CatalogService) {}

  @Post('/create')
  async create(@Body() createCatalogDto: CreateOrUpdateCatalogDto) {
    try {
      await this.catalogService.create(createCatalogDto);
    } catch (error) {
      throw HttpError(error);
    }
  }

  @Put('/update/:id')
  async update(
    @Body() updateCatalogDto: CreateOrUpdateCatalogDto,
    @Param('id') id: string,
  ) {
    try {
      await this.catalogService.update(updateCatalogDto, id);
    } catch (error) {
      throw HttpError(error);
    }
  }

  @Delete('/delete')
  async delete(@Query('ids') ids: string): Promise<string> {
    const idsArray = ids.split(',');

    try {
      return this.catalogService.delete(idsArray);
    } catch (error) {
      throw HttpError(error);
    }
  }

  @Get()
  async findAll(): Promise<CatalogDocument[]> {
    try {
      return this.catalogService.findAll();
    } catch (error) {
      throw HttpError(error);
    }
  }
}
