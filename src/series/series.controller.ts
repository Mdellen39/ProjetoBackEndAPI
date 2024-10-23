// src/series/serie.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CriaSerieDTO } from "./dtoserie/criaSerie.dto";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { SerieService } from "./series.Service";

@ApiTags('series')
@Controller('/series')
export class SerieController {
    constructor(private readonly serieService: SerieService) {}

    @Post() // Método para criar uma nova série
    @ApiCreatedResponse({ description: 'Série criada com sucesso', type: RetornoCadastroDTO })
    @ApiResponse({ status: 400, description: 'Dado inválido' })
    async criaSerie(@Body() dadosSerie: CriaSerieDTO): Promise<RetornoCadastroDTO> {
        console.log('Recebendo dados para criar série:', dadosSerie); // Log dos dados recebidos
        return this.serieService.inserir(dadosSerie);
    }

    @Put('/:id') // Método para alterar uma série
    @ApiResponse({ status: 200, description: 'Série alterada com sucesso', type: RetornoCadastroDTO })
    @ApiResponse({ status: 404, description: 'Série não encontrada' })
    async alteraSerie(@Param('id') id: string, @Body() dadosNovos: CriaSerieDTO): Promise<RetornoCadastroDTO> {
        console.log('Recebendo dados para alterar série:', dadosNovos); // Log dos dados recebidos
        return this.serieService.alterar(id, dadosNovos);
    }

    @Delete('/:id') // Método para remover uma série
    @ApiResponse({ status: 200, description: 'Série removida com sucesso', type: RetornoCadastroDTO })
    @ApiResponse({ status: 404, description: 'Série não encontrada' })
    async removeSerie(@Param('id') id: string): Promise<RetornoCadastroDTO> {
        console.log('Recebendo pedido para remover série com ID:', id); // Log do ID recebido
        return this.serieService.remover(id);
    }

    @Get('/:id') // Método para encontrar uma série por ID
    @ApiResponse({ status: 200, description: 'Série encontrada com sucesso', type: CriaSerieDTO })
    @ApiResponse({ status: 404, description: 'Série não encontrada' })
    async retornaSerie(@Param('id') id: string): Promise<CriaSerieDTO> {
        console.log('Recebendo pedido para encontrar série com ID:', id); // Log do ID recebido
        return this.serieService.encontrarPorId(id);
    }

    @Get() // Método para listar todas as séries
    @ApiResponse({ status: 200, description: 'Listagem de séries', type: [CriaSerieDTO] })
    async retornaSeries(): Promise<CriaSerieDTO[]> {
        console.log('Recebendo pedido para listar séries'); // Log de pedido para listar
        return this.serieService.listar();
    }
}
