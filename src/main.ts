import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors: true});
  
  app.enableCors({
    origin: ['http://localhost:8081/' , 'http://localhost:8081' , 'http://10.136.32.148:8081/'],
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
