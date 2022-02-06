import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const PORT = process.env.PORT;
    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true, origin: true });
    app.use(cookieParser());

    await app.listen(PORT, async () => {
      console.log(`Server start on port ${await app.getUrl()}`);
    });
  } catch (e) {
    console.log('Server error', e);
  }
}

bootstrap();
