import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log('Hello world listening on port', port);
  });
}
bootstrap();
