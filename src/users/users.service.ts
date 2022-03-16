import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {UserDto, CreateUserDto, LoginUserDto} from "./dto/user.dto";
import {UserEntity} from "./entity/users.entity";
