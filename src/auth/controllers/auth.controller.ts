import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsuarioLogin } from '../entities/usuariologin.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard) // endpoint de login protegido pela estrategy
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }
}