import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UsersModule,
    UrlsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
