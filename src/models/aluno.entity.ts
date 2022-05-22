import { HttpException, BadRequestException } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAluno } from './interface/ialuno';

@Entity()
export class Aluno implements IAluno {

    @PrimaryGeneratedColumn()
    id: string;
    @Column({length: 15})
    rga: string;
    @Column()
    situacao: string;
    @Column()
    nome: string;
    @Column()
    curso: string;
    @Column()
    registrado_em: Date = new Date();

    constructor(rga: string, nome: string, curso: string, situacao: string = "ativo") {
        this.validarDados(rga, situacao, nome);
        this.rga = rga;
        this.situacao = situacao;
        this.nome = nome;
        this.curso = curso;
    }

    private validarDados(rga: string, situacao: string, nome: string) {
        this.validarNome(nome);
        this.validarRga(rga);
        this.validarSituacao(situacao);
    }

    private validarNome(nome: string) {
        if(nome != undefined){
            if (nome.length == 0 || nome.length < 0) {
                throw new BadRequestException(`O nome: ${nome} está inválido, informe novamente`);
            }
        }    
    }

    private validarRga(rga: string) {
        if(rga != undefined){
            if(rga.length != 15){
                const rgaSemMascara = rga.replace(/[^0-9]/g, '');
                if (!Number(rgaSemMascara)) {
                    throw new BadRequestException(`O RGA: ${rga} está inválido, informe novamente`);
                }
                throw new BadRequestException(`O RGA: ${rga} está inválido, informe novamente`);
            }
        }        
    }

    private validarSituacao(situacao: string) {
        if(situacao != undefined){
            if (situacao !== 'ativo' && situacao !== 'inativo') {
                throw new BadRequestException(`A situação: ${situacao} informada está inválida, informe novamente`);
            }
        }
    }
}
