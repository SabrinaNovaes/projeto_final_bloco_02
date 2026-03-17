import { Transform, TransformFnParams } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categorias/entities/categorias.entity";
import { NumericTransformer } from "../../util/numerictransformer";

@Entity({ name: "tb_produtos" }) 
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "O nome é obrigátorio!" })
    @Length( 3, 100, { message: "O nome deve conter no mínimo 3 caracteres" })
    @Column({ nullable: false })
    nome: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "A Foto é obrigátoria!" })
    @Length (0, 500)
    @Column({ nullable: false })
    foto: string;

    @IsDateString()
    @IsNotEmpty()
    data_validade: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty({ message: "O preço é obrigátorio!" })
    @IsPositive({ message: "O preço deve ser um valor positivo!" })
    @Column( "decimal", { precision: 10, scale: 2, transformer: new NumericTransformer() })
    preco: number;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, { onDelete: "CASCADE" })
    categoria: Categoria; 
}
