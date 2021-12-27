import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const restAPI = process.env.BILEGO_API_SERVER;

async function bootstrap() {
  try {
    const PORT = process.env.APP_PORT;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    await app.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`);
    });
  } catch (e) {
    console.log('Server error', e);
  }
}

bootstrap();
