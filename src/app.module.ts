import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './app.interceptor';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { config } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
