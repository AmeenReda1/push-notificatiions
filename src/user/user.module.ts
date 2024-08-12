import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService,JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { LocalStrategy } from './strategies/user-local.strategy';
import { JwtStrategy } from './strategies/user-jwt.strategy';

@Module({
  imports:[
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: `${configService.getOrThrow<string>('JWT_SECRET')}`,
        signOptions: {
          expiresIn: `${configService.getOrThrow<string>('JWT_EXPIRE_In')}`,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],

  controllers: [UserController],
  providers: [UserService,LocalStrategy, JwtStrategy],
})
export class UserModule { }
