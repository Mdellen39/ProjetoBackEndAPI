import { listaPessoaDTO } from "src/pessoa/dtopessoa/listaPessoa.dto";

export class RetornoElencoDTO{
    IDFILME: string;
    elenco: listaPessoaDTO[];
}