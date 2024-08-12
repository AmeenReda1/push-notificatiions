import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DeepPartial, Repository } from 'typeorm';
  import { User } from './user.entity';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';

  import { Paginated, paginate } from 'nestjs-paginate';
  import { userPaginateConfig } from './config/user-pagination.config';
import { CreateUserDto } from './dto/create-user.dto';
  
  @Injectable()
  export class UserService {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      private jwtService: JwtService,
    ) {}
    async createUser(createUserDto: CreateUserDto): Promise<User> {
      const { email,...otherProps } = createUserDto;
      const userExists = await this.userRepository.findOne({ where: { email } });
      if (userExists) {
        throw new ConflictException(`User with this email already exists`);
      }
      const newUser: DeepPartial<User> = {
        email,
        ...otherProps,
      };
      const savedUser = await this.userRepository.create(newUser);
  
      return await this.userRepository.save(savedUser);
    }


    async findAll(query): Promise<Paginated<User>> {
      return paginate(query, this.userRepository, userPaginateConfig);
    }
    async validateUser(email: string, pass: string) {
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (!existingUser) {
        throw new NotFoundException(`User Email OR Password Not Correct `);
      }
  
      const checkPasword = await bcrypt.compare(pass, existingUser.password);
      if (!checkPasword) {
        throw new NotFoundException(`User Email OR Password Not Correct `);
      }
  
      const payload = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      };
      const token = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return { existingUser, token };
    }
  
    async findById(id: number): Promise<User> {
      const existingUser = await this.userRepository.findOne({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException(`There is No User With This Id`);
      }
      return existingUser;
    }

  }
  