import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './modules/task/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './modules/task/entities/task.entity';
import { TaskModule } from './modules/task/task.module';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: "sqlite",
        database: "database.sqlite",
        synchronize: true,
        logging: true,
        entities: [Task]
    }), TaskModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
