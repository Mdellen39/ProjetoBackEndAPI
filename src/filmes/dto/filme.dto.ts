import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class criaFilmeDTO {
    @IsString()
    @IsNotEmpty({ message: "nome não pode ser vazio" })
    @ApiProperty({
        example: "A volta dos que não foram",
        description: "Nome do filme, deve ser informado um texto contendo o nome"
    })
    NOME: string;

    @IsNumber()
    @ApiProperty({
        example: 120, // Corrigido para um número, sem aspas
        description: "Duração do filme em minutos, deve ser informado como number"
    })
    DURACAO: number;

    @IsString()
    @ApiProperty({
        example: "Um filme que conta a história de ......",
        description: "Sinopse do filme que está sendo inserido"
    })
    SINOPSE: string;

    @IsString()
    @ApiProperty({
        example: "1990",
        description: "Ano de lançamento do filme, deve ser informado como texto"
    })
    ANO: string;

    @IsString()
    @IsNotEmpty({ message: "gênero não pode ser vazio" }) // Validação para garantir que o gênero não seja vazio
    @ApiProperty({
        example: "Ação", // Exemplo do nome do gênero
        description: "Nome do gênero do filme a ser inserido"
    })
    GENERO: string; // Mudado para usar o nome do gênero
}
