import { Transform } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tb_categorias" })
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: "O nome é obrigátorio!" })
    @Length( 3, 100, { message: "O nome deve conter no mínimo 3 caracteres" })
    @Column({ nullable: false })
    nome: string;
}