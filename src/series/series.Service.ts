// src/series/serie.service.ts
import { Injectable } from "@nestjs/common";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";
import { CriaSerieDTO } from "./dtoserie/criaSerie.dto";

@Injectable()
export class SerieService {
    private series: CriaSerieDTO[] = []; // Você pode substituir isso por um banco de dados real

    async inserir(dadosSerie: CriaSerieDTO): Promise<RetornoCadastroDTO> {
        console.log('Dados da série a serem inseridos:', dadosSerie); // Log dos dados recebidos
        this.series.push(dadosSerie);
        return { id: dadosSerie.IDfilme, message: 'Série criada com sucesso' }; // Incluindo o ID no retorno
    }

    async alterar(id: string, dadosNovos: CriaSerieDTO): Promise<RetornoCadastroDTO> {
        const index = this.series.findIndex(serie => serie.IDfilme.toString() === id);
        if (index !== -1) {
            this.series[index] = dadosNovos;
            return { id: id, message: 'Série alterada com sucesso' }; // Incluindo o ID no retorno
        }
        return { id: '', message: 'Série não encontrada' }; // Retorno de erro com ID vazio
    }

    async remover(id: string): Promise<RetornoCadastroDTO> {
        const index = this.series.findIndex(serie => serie.IDfilme.toString() === id);
        if (index !== -1) {
            this.series.splice(index, 1);
            return { id: id, message: 'Série removida com sucesso' }; // Incluindo o ID no retorno
        }
        return { id: '', message: 'Série não encontrada' }; // Retorno de erro com ID vazio
    }

    async encontrarPorId(id: string): Promise<CriaSerieDTO> {
        const serie = this.series.find(serie => serie.IDfilme.toString() === id);
        if (!serie) {
            throw new Error('Série não encontrada');
        }
        return serie;
    }

    async listar(): Promise<CriaSerieDTO[]> {
        return this.series;
    }
}
