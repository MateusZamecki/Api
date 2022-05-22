import { ApiProperty } from "@nestjs/swagger";

export class AlunoDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    rga: string;
    @ApiProperty()
    situacao: string;
    @ApiProperty()
    nome: string;
    @ApiProperty()
    curso: string;
}