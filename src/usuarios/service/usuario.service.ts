import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { differenceInYears, format, isValid } from "date-fns";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: { usuario }
        });
    }

        async findAll(): Promise<any[]> {

        const usuarios = await this.usuarioRepository.find();

        return usuarios.map(usuario => {

            const idade = differenceInYears(
                new Date(),
                new Date(usuario.data_nascimento)
            );

            return {
                ...usuario,
                data_nascimento: format(
                    new Date(usuario.data_nascimento),
                    "dd/MM/yyyy"
                ),
                idade: idade
            };
        });
    }

    async findById(id: number): Promise<any> {

        const usuario = await this.usuarioRepository.findOne({
            where: { id }
        });

        if (!usuario)
            throw new HttpException(
                'Usuario não encontrado!',
                HttpStatus.NOT_FOUND
            );

        const dataNascimento = new Date(usuario.data_nascimento);

        if (!isValid(dataNascimento)) {
            throw new HttpException(
                'Data de nascimento inválida',
                HttpStatus.BAD_REQUEST
            );
        }

        const idade = differenceInYears(
            new Date(),
            dataNascimento
        );


        return {
            ...usuario,
            data_nascimento: format(
                new Date(usuario.data_nascimento), "dd/MM/yyyy"),
            idade: idade
        };
    }

    async create(usuario: Usuario): Promise<Usuario> {

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario)
            throw new HttpException(
                "O Usuario já existe!",
                HttpStatus.BAD_REQUEST
            );

        const idade = differenceInYears(
            new Date(),
            new Date(usuario.data_nascimento)
        );

        if (idade < 18)
            throw new HttpException(
                "Usuário deve ser maior de 18 anos",
                HttpStatus.BAD_REQUEST
            );

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id)
            throw new HttpException(
                'Usuário (e-mail) já cadastrado!',
                HttpStatus.BAD_REQUEST
            );

        const idade = differenceInYears(
            new Date(),
            new Date(usuario.data_nascimento)
        );

        if (idade < 18)
            throw new HttpException(
                "Usuário deve ser maior de 18 anos",
                HttpStatus.BAD_REQUEST
            );

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

        return await this.usuarioRepository.save(usuario);
    }
}
