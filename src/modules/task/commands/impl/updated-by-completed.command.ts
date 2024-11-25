import { ICommand } from "@nestjs/cqrs";

export class UpdateByCompletedCommand implements ICommand {
    id: number;
    completed: boolean;
    constructor(id: number, completed: boolean) {
        this.id = id;
        this.completed = completed;
    }
}
