import { Injectable } from "@nestjs/common";
import { PessoaEntity } from "../pessoa/pessoa.entity"

@Injectable()
export class PessoasArmazenadas {
    #pessoas: PessoaEntity[] = [];

    AdicionarPessoa(pessoa: PessoaEntity) {
        this.#pessoas.push(pessoa);
    }

    pesquisaId(id: string) {
        const pessoa = this.#pessoas.find(p => p.id === id);
        if (!pessoa) {
            throw new Error('Pessoa não encontrada');
        }
        return pessoa;
    }

    alteraPessoa(id: string, dadosNovos: Partial<PessoaEntity>) {
        const pessoa = this.pesquisaId(id);
        Object.assign(pessoa, dadosNovos);
        return pessoa;
    }

    removePessoa(id: string) {
        const pessoa = this.pesquisaId(id);
        this.#pessoas = this.#pessoas.filter(p => p.id !== id);
        return pessoa;
    }

    get Pessoas() {
        return this.#pessoas;
    }

    pesquisaPorAnoNascimento(ano: number) {
        return this.#pessoas.filter(p => p.nascimento === ano);
    }
}
