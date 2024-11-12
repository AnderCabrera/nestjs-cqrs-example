export class UpdateByCompletedCommand {
    id: number;
    completed: boolean;
    constructor(id: number, completed: boolean | string) {
        this.id = id;
        this.completed = completed === 'true' ? true : false;
    }
}
