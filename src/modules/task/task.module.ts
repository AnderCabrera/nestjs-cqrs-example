import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskController } from './task.controller';
import { CreateTaskHandler } from './cqrs/handlers/create-task.handler';
import { DeleteTaskHandler } from './cqrs/handlers/delete-task.handler';
import { UpdateByCompletedHandler } from './cqrs/handlers/update-by-completed.handler';
import { ListTaskHandler } from './cqrs/handlers/list-task.handler';
import { ListByIdTaskHandler } from './cqrs/handlers/list-by-id-task.handler';

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
