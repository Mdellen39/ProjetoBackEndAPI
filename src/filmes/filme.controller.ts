//classe controller do módulo de usuário
//Classe controller é responsável por receber as requisições de fora da API, ele adminstra as requisições recebendo e respondendo elas.

import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { criaFilmeDTO } from "./dto/criafilme.dto";
import { FilmeEntity } from "./filme.entity";
import { v4 as uuid } from 'uuid'
import { FilmeArmazenados } from "./filme.dm";
import { RetornoFilmeDTO } from "../filmes/dto/retornoFilme.dto";
import { ListaFilmeDTO, ListagemFilmeDto } from "../filmes/dto/listaFilme.dto";
import { alteraFilmeDTO } from "../filmes/dto/alteraFilme.dto";
import { stringify } from "querystring";
import { ApiResponse } from "@nestjs/swagger";

//decorator responsável por definir que essa classe é um controller, dentro do parenteses é necessário informar o URL desse controller
@Controller('/filme')
export class FilmeController {
    //controller com injeção de dependencia da classe de usuários armazenados
    constructor(private Filme: FilmeArmazenados) {
    }

    //POST - Recebe dados, pode ou não retornar informações, mas em geral recebe dados e retorna uma resposta
    //GET - Recebe apenas parametros, mas retorna dados variados, normalmente utilizado para consulta de dados
    //PUT - recebe dados, utilizado para fazer alterações de registros
    //DELETE - recebe dados, utilizado para remover registros


    @Post()//essa linha, seria um decorator para definir que a função é um metodo POST
    //Para receber dados do body da requisição, deve utilizar o decorator de "Body", especificando depois a variavel
    async criaFilme(@Body() dadosFilme: criaFilmeDTO) {
        //criação do objeto de usuário, aqui é criado um objeto específico desse usuário 
        var novoFilme = new FilmeEntity(uuid(), dadosFilme.nome, dadosFilme.duracao,
            dadosFilme.sinopse, dadosFilme.ano, dadosFilme.genero
        )
        //gravação do usuário, aqui é inserido no DM o usuário criado anteriormente
        this.Filme.AdicionarFilme(novoFilme);

        //criação do padrão de retorno, para depois ser retornado como resposta do método, também é retornado os dados do usuário logado
        var retorno = new RetornoFilmeDTO('Filme criado', novoFilme);
        return retorno
    }

    @Put('/:id')//linha que define o método vai ser de alteração (put), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    async alteraFilme(@Body() dadosNovos: alteraFilmeDTO, @Param('id') id: string) {//aqui é definido que vai receber dados tanto do body quanto da URL(param)
        //aqui é chamada a função de alteração de usuário, onde ja é feita toda a modificação do usuário
        var retornoAlteracao = this.Filme.alteraFilme(id, dadosNovos)
        //criação do padrão de retorno
        var retorno = new RetornoFilmeDTO('Alteração Efetuada', retornoAlteracao);
        return retorno;
    }

    @Get('/:ID')//criação de método GET, para retornar usuários filtrados pelo ID, onde é necessário passar o ID do usuário pelo url 
    async retornaFilmeId(@Param('ID') ID: string) {
        //aqui é feita a pesquisa do usuário, depois é criado mapeado os dados desse usuário para um retorno padrão (lista filme DTO)
        var filmeListados = this.Filme.pesquisaId(ID);
        const ListaRetorno = new ListaFilmeDTO(filmeListados.id,
            filmeListados.nome,
            filmeListados.duracao,
            filmeListados.sinopse
        )

        return {
            Filme: ListaRetorno
        };
    }

    @Get()//aqui é criado um método GET sem nenhum tipo de recepção de dados, onde é retornada uma lista de uusários
    @ApiResponse({status: 200, description: 'Retorna que houve sucesso na consulta'})
    async retornaFilme(): Promise <ListagemFilmeDto>{
        //Aqui são pesquisados os usuários a serem listados, depois é feito um mapeamento de dados para retornar as informações no padrão de resposta esperado (listaFilmeDTO)
        var filmesListados = this.Filme.filme;
        const ListaRetorno = filmesListados.map(
            filme => new ListaFilmeDTO(
                filme.id,
                filme.nome,
                filme.duracao,
                filme.sinopse
            )
        );

        const retorno = new ListagemFilmeDto(ListaRetorno);

        return retorno
    }


    @Delete('/:id')
    async removeFilme(@Param('id') id: string) {
        const filmeRemovido = await this.Filme.removeFilme(id);

        var retorno = new RetornoFilmeDTO('Exclusão Efetuada', filmeRemovido);

        return retorno;

    }
}



