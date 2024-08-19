//DTO responsável por receber dados de criação de um novo usuário
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class criaPessoaDTO{

    @IsString()
    @IsNotEmpty({ message: "ID não pode ser vazio" })
    id: string;

    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    nome: string;

    @IsNumber()
    nascimento: number;

    @IsString()
    país: string;
}

