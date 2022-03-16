import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getOneProduct(id: number) {
      let oneProduct = await this.productRepository.findOne(id);
      if(!oneProduct) {
          throw new NotFoundException("Product not found");
      }

      return oneProduct;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
      const newProduct = await this.productRepository.create(product);
      return newProduct;
  }

  async deleteProduct(id: number): Promise<Product> {
    try {
        const product = await this.productRepository.findOne(id);
        if(!product) {
          throw new NotFoundException("Not found book with this id");
        }
        return await this.productRepository.remove(product);
    } catch(error) {
      throw new NotFoundException();
    }
  }

  async updateProduct(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOneOrFail(id);
      await this.productRepository.update(id, product);
      return await this.productRepository.findOne(id);
    } catch(error) {
      throw new NotFoundException();
    }
  }
}
