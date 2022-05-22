import { IAluno } from './interface/ialuno';
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { Repository } from 'typeorm';
import { AlunoDto } from './dto/AlunoDto';
import { STATUS_CODES } from 'http';
import { ok } from 'assert';

@Injectable()
export class AlunoService {

    constructor(
        @InjectRepository(Aluno) 
        private alunoRepositorio: Repository<IAluno>
    ){}

    async obterTodos(){
        const alunos: [IAluno[], number] = await this.alunoRepositorio.findAndCount();
        if(!alunos){
            throw new BadRequestException(`Erro, alunos não encontrados`);
        }
        return alunos;
    }

    async obterPorId(id: string): Promise<IAluno>{
        const aluno: IAluno = await this.alunoRepositorio.findOne(id);
        if(!aluno){
            throw new NotFoundException(`Aluno com o id: ${id} não foi encontrado`);
        }
        return aluno;
    }

    async criarAluno(alunoDto: AlunoDto): Promise<IAluno> {
        await this.validarSeJaExisteAlunoComMesmoRgaEId(alunoDto);
        const aluno = new Aluno(alunoDto.rga,alunoDto.nome,alunoDto.curso);
        return await this.alunoRepositorio.save(aluno);
    }

    async editarAluno(alunoDto: AlunoDto) {
        await this.validarSeJaExisteAlunoComMesmoRgaEId(alunoDto);
        const alunoBanco = await this.alunoRepositorio.findOne(alunoDto.id);
        if(!alunoBanco){
            throw new NotFoundException(`Aluno com o id: ${alunoDto.id} não foi encontrado`);
        }
        const aluno = {id: alunoDto.id, rga: alunoDto.rga, situacao: alunoDto.situacao, nome: alunoDto.nome, curso: alunoDto.curso};
        return await this.alunoRepositorio.update(aluno.id, aluno);
    }

    async excluirAluno(id: string){
        const alunoBanco = await this.alunoRepositorio.findOne(id);
        if(!alunoBanco){
            throw new NotFoundException(`Aluno com o id: ${id} não foi encontrado`);
        }
        await this.alunoRepositorio.delete(id);
        return alunoBanco;
    }

    private async validarSeJaExisteAlunoComMesmoRgaEId(alunoDto){
        const alunoId = await this.alunoRepositorio.findOne(alunoDto.id);
        const alunos = await this.alunoRepositorio.find();
        const alunoRga = alunos.find(aluno => aluno.rga === alunoDto.rga);
        if(alunoRga){
            if(alunoId.id != alunoRga.id){
                throw new BadRequestException(`Aluno com rga: ${alunoDto.rga} já existe`);
            }
        }
    }
}
