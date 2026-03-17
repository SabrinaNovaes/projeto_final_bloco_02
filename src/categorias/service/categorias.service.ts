import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categoria } from "../entities/categorias.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ){}

    async findAll(): Promise<Categoria[]>{
        return this.categoriaRepository.find({
            relations: { produtos:true }
        });
    }

    async findById(id: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id },
            relations: { produtos: true }
        })

        if(!categoria)
            throw new HttpException("Categoria não encontrada", HttpStatus.NOT_FOUND);

        return categoria;
    }

    async findAllByNome(nome: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: { nome: ILike(`%${nome}%`) },
            relations: { produtos: true }
        })
    }

    async create (categoria: Categoria): Promise<Categoria> {
        return await this.categoriaRepository.save(categoria);
    } 

    async update (categoria: Categoria): Promise<Categoria> {
        
        if(!categoria.id || categoria.id <= 0)
            throw new HttpException("Categoria inválida", HttpStatus.BAD_REQUEST);

        await this.findById(categoria.id);
        return await this.categoriaRepository.save(categoria);
    }

    async delete (id: number) {
        await this.findById(id);
        return await this.categoriaRepository.delete(id);
    }
}