import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "./controller/categorias.controller";
import { Categoria } from "./entities/categorias.entity";
import { CategoriaService } from "./service/categorias.service";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    controllers: [CategoriaController],
    providers: [CategoriaService],
    exports: [CategoriaService]
})

export class CategoriaModule {}