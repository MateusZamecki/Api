import { ApiProperty } from "@nestjs/swagger";

export class AlunoDto {
    @ApiProperty()
    rga: string;
    @ApiProperty()
    situacao: string;
    @ApiProperty()
    nome: string;
    @ApiProperty()
    curso: string;
    @ApiProperty()
    registrado_em: Date
}