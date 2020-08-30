import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Define Swagger options
  const options = new DocumentBuilder()
    .setTitle('Nest Mongo PoC')
    .setDescription('A basic nestjs CRUD with MongoDB integration')
    .setVersion('0.0.1')
    .addTag('Products')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
