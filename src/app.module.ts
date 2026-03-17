import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioModule } from "./usuarios/usuario.module";
import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { ProdService } from "./data/service/prod.service";
import { CategoriaModule } from "./categorias/categorias.module";
import { ProdutoModule } from "./produtos/produtos.module";


@Module({
  
  imports: [ // conexão com o banco de dados
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        useClass: ProdService,
        imports: [ConfigModule],
      }), // HABILITA O LOG DE CONSULTAS SQL GERADAS PELO TYPEORM, O QUE PODE SER ÚTIL PARA DEPURAÇÃO E ANÁLISE DE DESEMPENHO DURANTE O DESENVOLVIMENTO. EM AMBIENTES DE PRODUÇÃO, É RECOMENDADO DESABILITAR O LOG PARA MELHORAR O DESEMPENHO E EVITAR VAZAMENTO DE INFORMAÇÕES SENSÍVEIS NOS LOGS.
  
    ProdutoModule,
    CategoriaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }