import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  author: string;

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  year: number;
}
