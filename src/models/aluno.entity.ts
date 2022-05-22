import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAluno } from './interface/ialuno';

@Entity()
export class Aluno implements IAluno {

    @PrimaryGeneratedColumn()
    id: string;
    @Column({length: 12})
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

    private validarRga(rga: string) {
        if(rga != undefined){
            if (rga.length != 12) {
                throw new Error('RGA inválido, informe novamente');
            }
        }        
    }

    private validarNome(nome: string) {
        if(nome != undefined){
            if (nome.length == 0 || nome.length < 0) {
                throw new Error('Nome inválido, informe novamente');
            }
        }    
    }

    private validarSituacao(situacao: string) {
        if(situacao != undefined){
            if (situacao !== 'ativo' && situacao !== 'inativo') {
                throw new Error('Situação, do aluno, informada inválida, informe novamente');
            }
        }
    }
}
