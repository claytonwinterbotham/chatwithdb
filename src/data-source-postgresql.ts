import "reflect-metadata";
import { DataSource } from "typeorm";
import { Fund } from "./entity/Funds";

export const PostgresAppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "workshop",
  synchronize: false, //
  logging: true,
  entities: [Fund],
});
