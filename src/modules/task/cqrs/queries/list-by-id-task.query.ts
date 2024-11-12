import { IQuery } from "@nestjs/cqrs";

export class ListByIdTaskQuery implements IQuery {
    id: number;
    constructor(id: number) {
        this.id = id;
    }
}
