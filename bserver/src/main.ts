import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true, origin: process.env.CLIENT_URL });

    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.listen(PORT, async () => {
      console.log(`Server start on port ${await app.getUrl()}`);
    });
  } catch (e) {
    console.log('Server error', e);
  }
}

bootstrap();
