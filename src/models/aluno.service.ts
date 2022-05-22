import { IAluno } from './interface/ialuno';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { Repository } from 'typeorm';
import { AlunoDto } from './dto/AlunoDto';

@Injectable()
export class AlunoService {

    constructor(
        @InjectRepository(Aluno) 
        private alunoRepositorio: Repository<IAluno>
    ){}

    async obterTodos(): Promise<IAluno[]> {
        return await this.alunoRepositorio.find();
    }

    async criarAluno(alunoDto: AlunoDto): Promise<IAluno>{
        const aluno = new Aluno(alunoDto.rga,alunoDto.nome,alunoDto.curso);
        return await this.alunoRepositorio.save(aluno);
    }

    async editarAluno(id:string ,alunoDto: AlunoDto): Promise<IAluno>{
        const aluno = {rga: alunoDto.rga, situacao: alunoDto.situacao, nome: alunoDto.nome, curso: alunoDto.curso};
        await this.alunoRepositorio.update(id, aluno);
        return this.alunoRepositorio.findOne(id);
    }

    async excluirAluno(){

    }
}
