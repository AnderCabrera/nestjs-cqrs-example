// +---------------------------------------------------+
// | Hints                                             |
// +---------------------------------------------------+
// | * idk what is this for --> @Version(['1'])        |
// | * if implements auth --> @UseGuards(JwtAuthGuard) |
// +---------------------------------------------------+

import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Version,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './cqrs/commands/create-task.command';
import { UpdateByCompletedCommand } from './cqrs/commands/updated-by-completed.command';
import { DeleteTaskCommand } from './cqrs/commands/delete-task.command';
import { Task } from './entities/task.entity';
import { ListTaskQuery } from './cqrs/queries/list-task.query';
import { ListByIdTaskQuery } from './cqrs/queries/list-by-id-task.query';

@Controller('/api/task')
export class TaskController {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Get('/')
    async getTasks(): Promise<Task[]> {
        const command = new ListTaskQuery();
        console.log(command)
        return await this.queryBus.execute(command);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: number) {
        const taskId = Number(id);

        if (isNaN(taskId)) {
            throw new BadRequestException(
                'The "id" parameter must be a valid number.',
            );
        }

        const command = new ListByIdTaskQuery(taskId);

        return await this.queryBus.execute(command);
    }

    @Post('/add')
    async createTask(@Body() body: { description: string }): Promise<void> {
        const { description } = body;
        
        if (!description)
            throw new BadRequestException("Description can't be empty");

        const command = new CreateTaskCommand(description);

        return await this.commandBus.execute(command);
    }

    @Put('/update/:id')
    async updateTask(
        @Param('id') id: number,
        @Body() completed: boolean,
    ): Promise<void> {
        const taskId = Number(id);

        if (isNaN(taskId)) {
            throw new BadRequestException(
                'The "id" parameter must be a valid number.',
            );
        }

        const command = new UpdateByCompletedCommand(taskId, completed);

        return await this.commandBus.execute(command);
    }

    @Delete('/delete/:id')
    async deleteTask(@Param('id') id: number) {
        const taskId = Number(id);

        if (isNaN(taskId)) {
            throw new BadRequestException(
                'The "id" parameter must be a valid number.',
            );
        }

        const command = new DeleteTaskCommand(taskId);

        return await this.commandBus.execute(command);
    }
}
