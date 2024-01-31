import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  secret: '',
};

export const setJwtConstants = (configService: ConfigService) => {
  jwtConstants.secret = configService.get<string>('SECRET_TOKEN');
};
