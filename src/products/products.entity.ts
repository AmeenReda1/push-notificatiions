
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  @Entity()
  export class Product {
    @ApiProperty({ description: 'product Id' })
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty({ description: 'product Name' })
    @Column({unique:true})
    name: string;
  
    @ApiProperty({ description: 'product description' })
    @Column({ type:'varchar',length:255,nullable:true})
    description: string;
  
    @ApiProperty({ description: 'product price' })
    @Column()
    price: number;
  
  }
  