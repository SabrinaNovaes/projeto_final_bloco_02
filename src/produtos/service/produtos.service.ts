import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produtos.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { CategoriaService } from "../../categorias/service/categorias.service";

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private readonly categoriaService: CategoriaService
    ) { }

    async findAll(): Promise<Produto[]> {
        return this.produtoRepository.find({
            relations: { categoria: true }
        });
    }

    async findById(id: number): Promise<Produto> {
        const produto = await this.produtoRepository.findOne({
            where: { id },
            relations: { categoria: true }
        })

        if (!produto)
            throw new HttpException("Produto não encontrado", HttpStatus.NOT_FOUND);

        return produto;
    }

    async findAllByNome(nome: string): Promise<Produto[]> {
        return this.produtoRepository.find({
            where: { nome: ILike(`%${nome}%`) },
            relations: { categoria: true },
            order: { nome: "ASC", id: "DESC" }
        });
    }


    async findByPreco(ordem: "ASC" | "DESC" = "ASC"): Promise<Produto[]> {
        return this.produtoRepository.find({
            relations: { categoria: true },
            order: { preco: ordem }
        });
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {

        if (!produto.id || produto.id <= 0)
            throw new HttpException("Produto inválido", HttpStatus.BAD_REQUEST);

        await this.findById(produto.id);

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        return await this.produtoRepository.delete(id);
    }
}
