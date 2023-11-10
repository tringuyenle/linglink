import { ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { FastifyRequest } from 'fastify';

const DEFAULT_VERSION = '1';

const extractor = (request: FastifyRequest): string | string[] => {
  const requestedVersion =
    <string>request.headers['x-api-version'] ?? DEFAULT_VERSION;

  // If requested version is N, then this generates an array like: ['N', 'N-1', 'N-2', ... , '1']
  return Array.from(
    { length: parseInt(requestedVersion) },
    (_, i) => `${i + 1}`,
  ).reverse();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // set api router
  app.setGlobalPrefix('api');
  // set api version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: DEFAULT_VERSION,
  });

  // add middleware to validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
