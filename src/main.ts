import { NestFactory } from '@nestjs/core';
import { AlunoModule } from './models/aluno.module';

async function bootstrap() {
    const app = await NestFactory.create(AlunoModule);
    await app.listen(3000);
}
bootstrap();
