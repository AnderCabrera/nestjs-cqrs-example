import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskController } from './controllers/task.controller';
import { CreateTaskHandler } from './commands/handlers/create-task.handler';
import { DeleteTaskHandler } from './commands/handlers/delete-task.handler';
import { UpdateByCompletedHandler } from './commands/handlers/update-by-completed.handler';
import { ListTaskHandler } from './queries/handlers/list-task.handler';
import { ListByIdTaskHandler } from './queries/handlers/list-by-id-task.handler';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), CqrsModule],
    controllers: [TaskController],
    providers: [
        CreateTaskHandler,
        UpdateByCompletedHandler,
        DeleteTaskHandler,
        ListTaskHandler,
        ListByIdTaskHandler
    ]
})

export class TaskModule {}
