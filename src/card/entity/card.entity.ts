import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../../products/entity/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column('int', { default: 1 })
    quantity: number;

    @ApiProperty()
    @Column()
    total_price: number

    @Column()
    productId: number;

    @ManyToOne(type => Product, product => product.carts, { onDelete: 'CASCADE' })
    product: Product;

}