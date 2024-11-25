import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { Repository } from 'typeorm';
import { ListTaskQuery } from '../impl/list-task.query';
import { PinoLogger } from 'nestjs-pino';

@QueryHandler(ListTaskQuery)
export class ListTaskHandler implements IQueryHandler<ListTaskQuery> {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        private readonly logger: PinoLogger,
    ) {}

    async execute(): Promise<Task[]> {
        this.logger.warn("returning all tasks!")

        return await this.taskRepository.find();
    }
}