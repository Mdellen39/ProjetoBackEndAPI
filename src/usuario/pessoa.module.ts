//classe de modulo do usuário, responsável por administrar todo o modulo de usuário, incluindo controller, DM, e validators, 
//tudo o que o modulo de usuário contem, é adinistrado pela classe de módulo

import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoasArmazenadas } from './pessoa.dm'; // Corrija o nome se necessário

@Module({
  controllers: [PessoaController],
  providers: [PessoasArmazenadas],
  exports: [PessoasArmazenadas], // Se necessário, exporte para uso em outros módulos
})
export class PessoaModule {}





