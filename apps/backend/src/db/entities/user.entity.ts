import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import type { IUser } from "@repo/types";

@Entity("users")
export class User implements IUser {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	email!: string;

	@Column()
	password!: string;
}
