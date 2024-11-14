// create-catalog.dto.ts

import { IsString, IsBoolean, IsArray, IsEnum } from 'class-validator';

export class CreateOrUpdateCatalogDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly primary: boolean;

  @IsEnum(['fashion', 'home', 'general'])
  readonly vertical: 'fashion' | 'home' | 'general';

  @IsArray()
  @IsString({ each: true })
  readonly locales: string[];
}
