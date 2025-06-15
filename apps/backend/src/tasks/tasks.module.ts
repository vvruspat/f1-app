import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { ErgastModule } from "../ergast/ergast.module";

@Module({
	imports: [ErgastModule],
	controllers: [],
	providers: [TasksService],
})
export class TasksModule {}
