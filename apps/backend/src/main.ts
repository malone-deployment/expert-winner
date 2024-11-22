import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const HOST =
  'https://web-service-422041495987.asia-southeast1.run.app/wifi/fck';
const PORT = Number(process.env.PORT) || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, HOST).then(() => {
    // tslint:disable-next-line:no-console
    console.log(
      `** Nest Live Development Server is listening on ${HOST}}, open your browser on http://localhost:${PORT}/ **`,
    );
  });
}
bootstrap();
