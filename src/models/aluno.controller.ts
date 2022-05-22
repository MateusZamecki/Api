import { AlunoDto } from './dto/AlunoDto';
import { IAluno } from './interface/ialuno';
import { Body, Controller, Delete, Get, MethodNotAllowedException, Param, Post, Put } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('alunos')
export class AlunoController {

    constructor(private readonly alunoService: AlunoService) {}

    @Get()
    async obterTodos(){
        return await this.alunoService.obterTodos();
    }

    @Get(':id')
    async obterPorId(@Param('id') id: string): Promise<IAluno> {
        return await this.alunoService.obterPorId(id);
    }

    @Post()
    @ApiBody({ type: AlunoDto })
    async criarAluno(@Body() aluno: AlunoDto): Promise<IAluno>{
        return await this.alunoService.criarAluno(aluno);
    }

    @Put(':id')
    @ApiBody({type: AlunoDto})
    async editarAluno(@Param('id') id: string, @Body() {rga, situacao, nome, curso}: AlunoDto){
        const aluno: AlunoDto = {id, rga, situacao, nome, curso};
        return await this.alunoService.editarAluno(aluno);
    }

    @Delete(':id')
    async excluirAluno(@Param('id') id: string): Promise<IAluno> {
        return await this.alunoService.excluirAluno(id);
    }



    @Delete()
    async rotaDeExcluirAlunoInvalida(){
        throw new MethodNotAllowedException('O metodo para exclusão de alunos não existe');
    }

    @Put()
    async rotaDeEditarAlunoInvalida(){
        throw new MethodNotAllowedException('O metodo para edição de alunos não existe');
    }

    @Post(':id')
    async rotaAdicionarAlunoInvalida(){
        throw new MethodNotAllowedException('O metodo de adição por id não existe');
    }
}
