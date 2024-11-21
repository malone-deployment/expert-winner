import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const HOST = '0.0.0.0';
// 'https://backend-image-422041495987.asia-southeast1.run.app/wifi/ this is the right host base'
const PORT = Number(process.env.PORT) || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, HOST).then(() => {
    // tslint:disable-next-line:no-console
    console.log(
      `** Nest Live Development Server is listening on ${HOST}:${PORT}, open your browser on http://localhost:${PORT}/ **`,
    );
  });
}
bootstrap();
