import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { PessoasArmazenadas } from "./pessoa.dm"; // Verifique o nome
import { PessoaEntity } from "./pessoa.entity";
import { criaPessoaDTO } from "./dto/pessoa.dto";

@Controller('/pessoas')
export class PessoaController {
    constructor(private pessoas: PessoasArmazenadas) {}

    @Post()
    async criaPessoa(@Body() dadosPessoa: criaPessoaDTO) {
        const novaPessoa = new PessoaEntity(
            uuid(), 
            dadosPessoa.nome, 
            dadosPessoa.nascimento, 
            dadosPessoa.pais
        );
        this.pessoas.AdicionarPessoa(novaPessoa);
        return { mensagem: 'Pessoa criada', pessoa: novaPessoa };        
    }

    @Put('/:id')
    async alteraPessoa(@Body() dadosNovos: Partial<PessoaEntity>, @Param('id') id: string) {
        const pessoaAlterada = this.pessoas.alteraPessoa(id, dadosNovos);
        return { mensagem: 'Alteração efetuada', pessoa: pessoaAlterada };        
    }

    @Get('/:id')
    async retornaPessoaId(@Param('id') id: string) {
        const pessoa = this.pessoas.pesquisaId(id);
        return { pessoa: pessoa };
    }

    @Get()
    async retornaPessoas() {
        const listaPessoas = this.pessoas.Pessoas;
        return { pessoas: listaPessoas };
    }

    @Delete('/:id')
    async removePessoa(@Param('id') id: string) {
        const pessoaRemovida = this.pessoas.removePessoa(id);
        return { mensagem: 'Exclusão efetuada', pessoa: pessoaRemovida };        
    }

    @Get('/ano/:ano')
    async retornaPessoasPorAno(@Param('ano') ano: number) {
        const pessoas = this.pessoas.pesquisaPorAnoNascimento(ano);
        return { pessoas: pessoas };
    }
}
