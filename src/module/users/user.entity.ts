import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @ApiProperty({example:1  })
@PrimaryGeneratedColumn()
id:number

@ApiProperty({example:'Danish'})
@Column({type:'varchar',length:100})
name:string

  @ApiProperty({ example: 'danish@example.com' })
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

}
