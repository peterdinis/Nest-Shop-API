import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from "../products/entity/product.entity";
import { Repository } from 'typeorm';
import { UpdateQuantityDto } from "./dto/card.dto"
import { Cart } from "./entity/card.entity";

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(Cart) private cartsRepository: Repository<Cart>,
        @InjectRepository(Product) private productsRepository: Repository<Product>
    ) { }

    async addToCart(id: number): Promise<Cart> {
        try {
            const checkProduct = await this.productsRepository.findOneOrFail(id)

            const cartItem = await this.cartsRepository.findOne({
                where: { productId: checkProduct.id },
                relations: ['product']
            });

            if (!cartItem) {
                await this.cartsRepository.save({
                    quantity: 1,
                    total_price: checkProduct.price,
                    productId: id
                })
                return await this.cartsRepository.findOne({
                    where: { productId: id },
                    relations: ['product']
                })
            } else {
                cartItem.quantity = cartItem.quantity + 1;
                cartItem.total_price = cartItem.quantity * checkProduct.price;
                return await this.cartsRepository.save(cartItem);
            }
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async removeFromCart(cartId: number): Promise<Cart> {
        try {
            const cartItem = await this.cartsRepository.findOne({
                where: { id: cartId },
                relations: ['product']
            })
            if (cartItem.quantity > 1) {
                cartItem.quantity = cartItem.quantity - 1;
                cartItem.total_price = cartItem.quantity * cartItem.product.price;
                return await this.cartsRepository.save(cartItem);
            } else {
                return await this.cartsRepository.remove(cartItem)
            }
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async updateQuantity(id: number, quantity: UpdateQuantityDto): Promise<Cart> {
        try {
            const cartItem = await this.cartsRepository.findOneOrFail({
                where: { id },
                relations: ['product']
            })

            cartItem.quantity = quantity.quantity;
            cartItem.total_price = cartItem.quantity * cartItem.product.price;
            return await this.cartsRepository.save(cartItem);

        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getAllCartItems(): Promise<Cart[]> {
        return await this.cartsRepository.find({
            relations: ['product']
        })
    }
}