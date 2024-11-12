import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './modules/task/task.controller';

@Module({
    imports: [],
    controllers: [AppController, TaskController],
    providers: [AppService],
})
export class AppModule {}
