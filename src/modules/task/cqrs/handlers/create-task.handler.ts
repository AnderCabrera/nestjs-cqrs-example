import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { CreateTaskCommand } from '../commands/create-task.command';

@CommandHandler(CreateTaskCommand)
export class UpdatedByCompletedHandler
    implements ICommandHandler<CreateTaskCommand>
{
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async execute(command: CreateTaskCommand): Promise<Task> {
        const { description } = command;

        return await this.taskRepository.save({ description });
    }
}
