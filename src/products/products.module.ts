import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),NotificationModule],
  controllers: [ProductsController],
  providers: [ProductsService,NotificationService],
})
export class ProductsModule {}
