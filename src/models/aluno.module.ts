import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoController } from './aluno.controller';
import { Aluno } from './aluno.entity';
import { AlunoService } from './aluno.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Aluno]),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true
        })
    ],
    controllers: [AlunoController],
    providers: [AlunoService],
})
export class AlunoModule {}
