import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Push Notification')
  .setDescription(
    'The API details of the business solution for the Push Notification Demo Application.',
  )
  .setVersion('1.0')
  .addTag('Notification')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
