import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';
import {ProductModule} from "./products/product.module";
import { ConfigModule } from '@nestjs/config';
import {CardModule } from './card/card.module'

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.db',
    synchronize: true,
    logging: false,
    entities: ["dist/**/*.entity.js"]
  }), CategoryModule, ProductModule, AuthModule, CardModule]
})
export class AppModule {}
