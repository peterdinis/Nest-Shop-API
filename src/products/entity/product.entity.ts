import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {Cart} from "../../card/entity/card.entity"

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

  @OneToMany(type => Cart, cart => cart.product)
  carts: Cart[]
}
