import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './categories/category.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.db',
    synchronize: true,
    logging: false,
    entities: ["dist/**/*.entity.js"]
  }), CategoryModule]
})
export class AppModule {}
