import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateByCompletedCommand } from '../commands/updated-by-completed.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateByCompletedCommand)
export class UpdateByCompletedHandler
    implements ICommandHandler<UpdateByCompletedCommand>
{
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async execute(command: UpdateByCompletedCommand): Promise<any> {
        const { id, completed } = command;
        await this.taskRepository.update(id, { completed });
    }
}
