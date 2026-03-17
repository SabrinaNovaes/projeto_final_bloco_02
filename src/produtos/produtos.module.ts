import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "../categorias/categorias.module";
import { ProdutoController } from "./controller/produtos.controller";
import { Produto } from "./entities/produtos.entity";
import { ProdutoService } from "./service/produtos.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    controllers: [ProdutoController], 
    providers: [ProdutoService],
    exports: []
})
export class ProdutoModule {}