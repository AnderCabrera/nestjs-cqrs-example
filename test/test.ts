import { Test, TestingModule } from "@nestjs/testing";
import { ListTaskHandler } from "src/modules/task/queries/handlers/list-task.handler";
import { Repository } from "typeorm";
import { Task } from "src/modules/task/entities/task.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ListTaskQuery } from "src/modules/task/queries/impl/list-task.query";

describe('GetTasksQueryHandler', () => {
    let handler: ListTaskHandler;
    let taskRepository: jest.Mocked<Repository<Task>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListTaskHandler,
                {
                    provide: getRepositoryToken(Task),
                    useValue: {
                        find: jest.fn(),
                    }
                }
            ]
        }).compile();

        handler = module.get<ListTaskHandler>(ListTaskHandler);
        taskRepository = module.get(getRepositoryToken(Task));
    });
})