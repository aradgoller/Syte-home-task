import { NestFactory } from '@nestjs/core';
import { CatalogsModule } from './catalogs/catalog.module';

async function bootstrap() {
  const app = await NestFactory.create(CatalogsModule);

  app.enableCors({ origin: [process.env.CLIENT_URL] });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
