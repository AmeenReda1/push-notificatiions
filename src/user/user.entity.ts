
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @ApiProperty({ description: 'User Id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User Name' })
  @Column({nullable:false})
  name: string;

  @ApiProperty({ description: 'User Email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'User Password' })
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }
}
