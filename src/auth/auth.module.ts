import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./service/auth.service";
import { UsuarioModule } from "../usuarios/usuario.module";
import { jwtConstants } from "./constants/constants";
import { Bcrypt } from "./bcrypt/bcrypt";
import { LocalStrategy } from "./strategy/local-strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";

@Module({
    imports: [
        forwardRef(() => UsuarioModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],
})
export class AuthModule { }