import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('My Hospital API')
    .setDescription('Hospital Management System API Documentation')
    .setVersion('1.0.0')
    .addServer('https://myhospitalproject.kro.kr', 'Production Server')
    .addTag('doctors', '의사 관리 API')
    .addTag('posts', '게시글 관리 API')
    .addTag('consultations', '온라인 상담 API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs-json',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger UI: ${await app.getUrl()}/docs`);
  console.log(`Swagger JSON: ${await app.getUrl()}/docs-json`);
}
void bootstrap();
