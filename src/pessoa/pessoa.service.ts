import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { PESSOA } from './pessoa.entity';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { CriaPessoaDTO } from './dtopessoa/criaPessoa.dto';
import { AlteraPessoaDTO } from './dtopessoa/atualizaPessoa.dto';
import { FILME } from 'src/filmes/filme.entity';



@Injectable()
export class PessoaService {
  listarElenco(filme: FILME): import("../fillme_pessoa/dto/retornoelenco.dto").RetornoElencoDTO | PromiseLike<import("../fillme_pessoa/dto/retornoelenco.dto").RetornoElencoDTO> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<PESSOA>,
  ) {}

  async listar(): Promise<PESSOA[]> {
    return this.pessoaRepository.find();
  }

  async inserir(filme: FILME, dados: CriaPessoaDTO, FUNCAO: string): Promise<RetornoCadastroDTO>{
    let pessoa = new PESSOA();
        pessoa.ID = uuid();
        pessoa.NOME = dados.NOME;
        // pessoa.NASCIMENTO = dados.NASCIMENTO;
        pessoa.PAIS = dados.PAIS;
        

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.ID,
        message: "Pessoa cadastrado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(ID: string): Promise<PESSOA> {
    return this.pessoaRepository.findOne({
      where: {
        ID,
      },
    });
  }

  localizarNome(NOME: string): Promise<PESSOA> {
    return this.pessoaRepository.findOne({
      where: {
        NOME,
      },
    });
  }


  async remover(filme: FILME, ator: PESSOA, id: string): Promise<RetornoObjDTO> {
    const pessoa = await this.localizarID(id);
    
    return this.pessoaRepository.remove(pessoa)
    .then((result) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Pessoa excluido!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: pessoa,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: AlteraPessoaDTO): Promise<RetornoCadastroDTO> {
    const pessoa = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          pessoa[chave] = valor;
      }
    )

    return this.pessoaRepository.save(pessoa)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: pessoa.ID,
        message: "Pessoa alterado!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }
}