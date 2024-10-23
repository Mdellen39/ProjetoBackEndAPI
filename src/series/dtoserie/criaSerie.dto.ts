// src/series/dtoserie/criaSerie.dto.ts
import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CriaSerieDTO {
    @IsString()
    @IsNotEmpty({ message: "nomeSerie não pode ser vazio" })
    @ApiProperty({
        example: "Nome da Série",
        description: "Nome da série que está sendo criada",
    })
    nomeserie: string;

    @IsString()
    @IsNotEmpty({ message: "temporada não pode ser vazio" })
    @ApiProperty({
        example: "1",
        description: "Número da temporada da série",
    })
    temporada: string;

    @IsString()
    @IsNotEmpty({ message: "episodio não pode ser vazio" })
    @ApiProperty({
        example: "1",
        description: "Número do episódio da série",
    })
    episodio: string;

    @IsString()
    @ApiProperty({
        example: "1a057a24-8b3b-444a-b305-dad891d363f7",
        description: "ID do filme associado à série",
    })
    IDfilme: string;
}

