import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty, IsEmail, MinLength, IsDateString } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 255, nullable: false}) 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 255, nullable: false })
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @Column({length: 255, nullable: false }) 
    senha: string

    @Column({length: 5000 }) 
    foto: string

    @IsDateString()
    @IsNotEmpty()
    @Column({ type: "date" })
    data_nascimento: Date
}