import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import {CategoryRepository} from "./repository/category.repository";
import {NotFoundException} from "@nestjs/common";

// define category service
describe('CategoryService', async () => {
  let service: CategoryService;
  let categoryRepository: CategoryRepository;

  const mockCategoryService = {
    create: jest.fn(dto => {
      return {
        id: 1,
        ...dto
      }
    }), 

    update: jest.fn((id, dto) => ({
      id,
      ...dto
    }))
  }

  const mockCategoryRepository = () => ({
    createCategory: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useFactory: mockCategoryRepository
        },
      ],
    }).compile();
    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it("Create new category", () => {
    const categoryDto = {
      id: 1,
      name: "Name",
      description: "Description",
    }
    expect(service.createCategory(categoryDto));
    expect(mockCategoryService.create).toHaveBeenCalled();
  });

 /*  it("Should update category", () => {
    const UpdateDto = {
      id: 1,
      name: "Name",
      description: "Description",
    }
  }) */
});