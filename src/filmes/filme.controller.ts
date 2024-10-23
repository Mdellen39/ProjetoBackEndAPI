// classe controller do módulo de filme
import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { criaFilmeDTO } from "./dto/filme.dto";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";
import { ListaFilmeDTO, ListagemFilmesDTO } from "./dto/listaFilme.dto";
import { FilmeService } from "./filme.service";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { atorFilmeDTO } from "../filmes/dto/ator.Filme.dto";
import { RetornoElencoDTO } from "../fillme_pessoa/dto/retornoelenco.dto";

@ApiTags('filme')
@Controller('/filmes')
export class FilmeController {
    constructor(private readonly filmeService: FilmeService) {}

    // Método POST para criar um novo filme
    @Post()
    @ApiCreatedResponse({ description: 'Retorna que houve sucesso na inclusão' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na inclusão.' })
    @ApiResponse({ status: 400, description: 'Retorna que há algum dado inválido na requisição.' })
    async criaFilme(@Body() dadosFilme: criaFilmeDTO): Promise<RetornoCadastroDTO> {       
        const retorno = await this.filmeService.inserir(dadosFilme);
        return retorno;        
    }

    // Método PUT para alterar um filme
    @Put('/:id')
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na alteração' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na alteração.' })
    @ApiResponse({ status: 400, description: 'Retorna que há algum dado inválido na requisição.' })
    async alteraFilme(@Body() dadosNovos: alteraFilmeDTO, @Param('id') id: string) {
        const retornoAlteracao = await this.filmeService.alterar(id, dadosNovos);
        return retornoAlteracao;       
    }

    // Método DELETE para remover um filme
    @Delete('/:id')
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na exclusão' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na exclusão.' })
    async removeFilme(@Param('id') id: string) {
        const retornoExclusao = await this.filmeService.remover(id);
        return retornoExclusao;               
    }

    // Método GET para retornar um filme pelo ID
    @Get('/:id')
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na consulta' })
    @ApiResponse({ status: 500, description: 'Retorna que houve erro na consulta.' })
    async retornaFilmeId(@Param('id') id: string) {
        const filmesListados = await this.filmeService.Compartilhar(id);
        if (!filmesListados) {
            throw new NotFoundException('Filme não encontrado'); // Lança uma exceção se não encontrar
        }
        return { Filme: filmesListados };
    }

    // Método GET para retornar todos os filmes
    @Get()
    @ApiResponse({ status: 200, description: 'Retorna que houve sucesso na consulta' })
    async retornaFilme(): Promise<ListaFilmeDTO[]> {
        return this.filmeService.listar();
    }

    // Método POST para adicionar um ator a um filme
    @Post('/ator/')
    async addAtor(@Body() dados: atorFilmeDTO): Promise<RetornoCadastroDTO> {
        return this.filmeService.addAtor(dados);        
    }

    // Método DELETE para remover um ator de um filme
    @Delete('/ator/')
    async removeAtor(@Body() dados: atorFilmeDTO): Promise<RetornoCadastroDTO> {
        return this.filmeService.removeAtor(dados);        
    }

    // Método GET para listar elenco de um filme
    @Get('/ator/:id')
    async listaElencoFilme(@Param('id') id: string): Promise<RetornoElencoDTO> {
        return this.filmeService.listarAtor(id);        
    }
}
