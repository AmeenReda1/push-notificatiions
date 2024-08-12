import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      PORT: Joi.number().required(),
    }),
    expandVariables: true,
  }),
  DatabaseModule,
  UserModule,
  ProductsModule,
  NotificationModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
