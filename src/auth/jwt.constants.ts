import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const jwtConstants = {
  JWT_SECRET: 'secret?1234',
  // JWT_SECRET: configService.get<string>('JWT_SECRET'),
};
