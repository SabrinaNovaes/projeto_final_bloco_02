import { Controller, Get, HttpCode, HttpStatus, Query, Param, ParseIntPipe, Post, Body, Put, Delete } from "@nestjs/common";
import { Produto } from "../entities/produtos.entity";
import { ProdutoService } from "../service/produtos.service";

@Controller("/produtos")
export class ProdutoController {

    constructor(
        private readonly produtoService: ProdutoService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Produto> {
        return this.produtoService.findById(id);
    }

    @Get("/preco/:ordem")
    findByPreco(@Param("ordem") ordem: string) {
        const ordemFormatada = ordem.toUpperCase() as "ASC" | "DESC";
        return this.produtoService.findByPreco(ordemFormatada);
    }

    @Get("/nome/:nome")
    @HttpCode(HttpStatus.OK)
    findAllByNome(@Param("nome") nome: string): Promise<Produto[]> {
        return this.produtoService.findAllByNome(nome);
    }

    @Post("/cadastrar")
    @HttpCode(HttpStatus.OK)
    create(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.create(produto);
    }

    @Put("/atualizar")
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto> {
        return this.produtoService.update(produto);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.OK)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.produtoService.delete(id);
    }
}