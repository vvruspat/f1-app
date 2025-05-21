import { Injectable } from "@nestjs/common";

@Injectable()
export class SeasonsService {
	getHello(): string {
		return "Hello World!";
	}
}
