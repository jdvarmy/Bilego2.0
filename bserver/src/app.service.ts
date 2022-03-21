import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getVersion() {
    return process.env.APP_VERSION || 'start version';
  }
}
