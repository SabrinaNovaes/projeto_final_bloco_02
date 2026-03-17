import { Transform } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produtos.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_categorias" })
export class Categoria {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: "O nome é obrigátorio!" })
    @Length( 3, 100, { message: "O nome deve conter no mínimo 3 caracteres" })
    @Column({ nullable: false })
    nome: string;

    @ApiProperty()
    @Transform(({ value }) => value?.trim())
    @Column({ nullable: true })
    descricao: string;

    @ApiProperty({ type: () => Produto, isArray: true })
    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[];
}