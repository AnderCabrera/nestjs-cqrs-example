import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { Repository } from 'typeorm';
import { ListByIdTaskQuery } from '../queries/list-by-id-task.command';

@QueryHandler(ListByIdTaskQuery)
export class ListByIdTaskHandler implements IQueryHandler<ListByIdTaskQuery> {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async execute(query: ListByIdTaskQuery): Promise<Task> {
        const { id } = query;
        return await this.taskRepository.findOneBy({ id });
    }
}
