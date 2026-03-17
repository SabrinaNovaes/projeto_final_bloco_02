import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Body, UseGuards, Put } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("usuario")
@Controller("/usuarios")
@ApiBearerAuth()
export class UsuarioController{

    constructor(private readonly usuarioService: UsuarioService){ }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.create(usuario)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.usuarioService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.usuarioService.findById(id)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario>{
        return this.usuarioService.update(usuario)
    }

}