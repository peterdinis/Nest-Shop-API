import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import {CategoryRepository} from "./repository/category.repository";
import {NotFoundException} from "@nestjs/common";

// define category service
describe('CategoryService', async () => {
  let service: CategoryService;
  let categoryRepository: CategoryRepository;

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

  describe("Create new category", () => {
    it("Should create new category", async () => {
      const createCategoryDto = {
        name: "Name",
        description: "Description",
      };
    })
})
});