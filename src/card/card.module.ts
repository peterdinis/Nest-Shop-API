import { Module } from "@nestjs/common";
import { CardService } from "./card.service"
import { CardController } from "./card.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from "./entity/card.entity"
import { Product } from "../products/entity/product.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product])],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule { }