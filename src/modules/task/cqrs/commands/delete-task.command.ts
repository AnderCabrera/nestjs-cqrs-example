import { ICommand } from "@nestjs/cqrs";

export class DeleteTaskCommand implements ICommand {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}
