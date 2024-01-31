import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { jwtConstants } from './constants';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UsersModule,
    ImagesModule,
    CategoriesModule,
    BooksModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
