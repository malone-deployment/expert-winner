import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT) || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://web-service-422041495987.asia-southeast1.run.app', // Frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allowed request headers
    credentials: true, // Allow credentials (e.g., cookies)
  });
  await app.listen(PORT, HOST).then(() => {
    console.log(
      `** Nest Live Development Server is listening on ${HOST}:${PORT}, open your browser on http://localhost:${PORT}/ **`,
    );
  });
}
bootstrap();
