import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {CreateCategorytDto, UpdateCategorytDto} from "./dto/category.dto";
import {Category}from "./entity/category.entity";
import {CategoryService} from "./category.service"