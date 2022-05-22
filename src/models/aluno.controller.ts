import { AlunoDto } from './dto/AlunoDto';
import { IAluno } from './interface/ialuno';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('alunos')
export class AlunoController {
    constructor(private readonly alunoService: AlunoService) {}

    @Get()
    async obterTodos(): Promise<IAluno[]> {
        return await this.alunoService.obterTodos();
    }

    @Post()
    @ApiBody({ type: AlunoDto })
    async criarAluno(@Body() aluno: AlunoDto): Promise<IAluno>{
        return await this.alunoService.criarAluno(aluno);
    }

    @Post(':id')
    @ApiBody({type: AlunoDto})
    async editarAluno(@Param('id') id: string, @Body() {rga, situacao, nome, curso, registrado_em}: AlunoDto): Promise<IAluno> {
        const aluno = {rga, situacao, nome, curso, registrado_em};
        return await this.alunoService.editarAluno(id,aluno);
    }
}
