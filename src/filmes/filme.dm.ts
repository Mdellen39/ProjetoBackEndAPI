//data module do modulo de usuário, responsável por guardar os dados de usuários e manipular os dados armazenados
import { Injectable } from "@nestjs/common";
import { alteraFilmeDTO } from "./dto/alteraFilme.dto";
import { FilmeEntity } from "./filme.entity";

//Decorator responsável por informar que essa classe pode ser injetada em outras classes, podendo assim ser administrada pelo modulo
@Injectable()
export class FilmeArmazenados{
    //Criação de vetor para armazenar os usuários (apenas em memoria, quando reiniciar a API perde tudo)
    #filme: FilmeEntity[] = [];  
    Filme: any;

    //funçaço responsável por guardar o usuário no vetor
    AdicionarFilme(filme: FilmeEntity){
        this.#filme.push(filme);
    }

    //função responsável por pesquisar usuário que tenham o ID especificado
    pesquisaId(id:string){
        const possivelFilme = this.#filme.find(
            filmealvo => filmealvo.id === id
        );

        if(!possivelFilme){
            throw new Error('Filme não encontrado');//cria um erro quando o usuário não é encontrado
        }

        return possivelFilme
    }

    //função responsável por alterar o usuário
    alteraFilme(id:string,dadosNovos: alteraFilmeDTO){
        //pesquisa o usuário que vai ser alterado
        const filme = this.pesquisaId(id);

        //aqui os dados que são recebidos no JSon são convertidos para uma tabela de chave e valor, para isolar os dados recebidos
        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
                //aqui é validado se o campo a ser alterado vai ser o ID, se for ele ignora, pois não se pode alterar o ID
                if(chave === 'id'){
                    return
                }

                //caso não seja nenhum campo especial, é feito só a alteração direta do valor do campo com base no valor passado 
                filme[chave] = valor;
            }
        )

        return filme;
        
    }


    async removeFilme(id: string) {
        const filme = this.pesquisaId(id);

        this.#filme = this.#filme.filter(
            filmealvo => filmealvo.id !== id
        )

        return filme;
    }
    
    //função para retornar todos os filme
    get filme(){        
        return this.#filme;
    }
}