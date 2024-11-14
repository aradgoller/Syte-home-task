import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogDocument } from '../interfaces/catalog.interface';
import { CreateOrUpdateCatalogDto } from 'src/dtos/create-or-update-catalog.dto';

@Controller('catalogs')
export class CatalogsController {
  constructor(private catalogService: CatalogService) {}

  @Post('/create')
  async create(@Body() createCatalogDto: CreateOrUpdateCatalogDto) {
    try {
      await this.catalogService.create(createCatalogDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Put('/update')
  async update(
    @Body() updateCatalogDto: CreateOrUpdateCatalogDto,
    @Query() query: { catalogId: string },
  ) {
    try {
      await this.catalogService.update(updateCatalogDto, query.catalogId);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Bad request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  async findAll(): Promise<CatalogDocument[]> {
    return this.catalogService.findAll();
  }
}
