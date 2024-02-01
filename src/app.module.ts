import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './app.interceptor';
import { AppService } from './app.service';
import { LanguagesModule } from './languages/languages.module';
import { AuthModule } from './modules/auth/auth.module';
import { setJwtConstants } from './modules/auth/constants';
import { typeOrmConfig } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        typeOrmConfig(configService),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    LanguagesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    setJwtConstants(this.configService);
  }
}
