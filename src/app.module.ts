import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';
import {ProductModule} from "./products/product.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.db',
    synchronize: true,
    logging: false,
    entities: ["dist/**/*.entity.js"]
  }), CategoryModule, ProductModule, AuthModule, UsersModule]
})
export class AppModule {}
