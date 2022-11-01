import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    origin: [
      process.env['QT_DENTIST_CORS_ORIGIN'],
      process.env['QT_PATIENT_CORS_ORIGIN'],
      // 'https://qt-dentist.dtoppo.ch',
      // 'https://qt-patient.dtoppo.ch'
    ],
    credentials: true
  });

  const swaggerOptions = new DocumentBuilder()
    .setTitle('QualtyTeeth')
    .setDescription('The QualtyTeeth API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDoc);

  const port = process.env['PORT'] || 20251;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  // console.log(`QualyTeeth server running on ${await app.getUrl()}`);
}
bootstrap();
