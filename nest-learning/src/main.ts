import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, UseGuards } from "@nestjs/common";
import { ProfilesGuard } from "./profiles/profiles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  // app.useGlobalGuards(new ProfilesGuard)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
