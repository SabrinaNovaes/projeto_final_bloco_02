import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categorias/categorias.module';
import { ProdutoModule } from './produtos/produtos.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get("DB_HOST"),
        port: configService.get('DB_PORT'),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      })
    }),
    ProdutoModule,
    CategoriaModule,
    UsuarioModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
