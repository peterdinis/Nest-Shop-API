import {Repository, EntityRepository} from "typeorm";
import { Category } from "../entity/category.entity";
import { CreateCategorytDto, UpdateCategorytDto } from "../dto/category.dto";

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  static createCategory() {
    throw new Error('Method not implemented.');
  }
    public async createCategory(
        createCategoryDto: CreateCategorytDto,
      ) {
        const { name, description} = createCategoryDto;
    
        const category: any = new Category();
        category.name = name;
        category.description = description;
    
        await category.save();
        return category;
      }
    
      public async editCategory(
        updateCategoryDto: any,
        edittedCategory: Category
      ) {
        const { name, description } = updateCategoryDto;
    
        updateCategoryDto.name = name;
        updateCategoryDto.description = description;
        await updateCategoryDto.save();
    
        return updateCategoryDto;
      }
}