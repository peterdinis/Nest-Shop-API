import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategorytDto, UpdateCategorytDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(category: CreateCategorytDto): Promise<Category> {
    const newCategory = await this.categoryRepository.save(category);
    return newCategory;
  }

  async getOneCategory(id: number) {
    let oneCategory = await this.categoryRepository.findOne(id);
    if (!oneCategory) {
      throw new NotFoundException('Specific category not found');
    }
    return oneCategory;
  }

  async updateCategory(
    id: number,
    category: UpdateCategorytDto,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneOrFail(id);
      await this.categoryRepository.update(id, category);
      return await this.categoryRepository.findOne(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async deleteCategory(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneOrFail(id);
      return await this.categoryRepository.remove(category);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
