import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>  ({
          type: 'mysql',
          host: "db",//configService.get('MYSQL_HOST'),
          port: 3306,//configService.get('MYSQL_PORT'),
          username: 'root',//configService.get('MYSQL_USERNAME'),
          password: 'test123',//configService.get('MYSQL_PASSSWORD'),
          database: 'push-notification',//configService.get('MYSQL_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      }),
    ],
  })
  export class DatabaseModule {}
