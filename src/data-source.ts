import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User.js";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "Chinook_Sqlite.sqlite",
  synchronize: false,
  logging: true,
});
