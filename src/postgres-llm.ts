/**
 * Instead of SQL queries we use NLP to find the right data
 */
import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains";
import { PostgresAppDataSource } from "./data-source-postgresql";

export async function run() {
  console.log("run start");

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: PostgresAppDataSource,
    sampleRowsInTableInfo: 3, // how many rows to sample from each table
  });

  // console.log("db", db);

  const chain = new SqlDatabaseChain({
    llm: new OpenAI({
      temperature: 0,
    }),
    database: db,
  });

  chain.verbose = true;

  const response = await chain.run(
    "What is the average initial investment amount for funds managed by 'Andrew F. Dierdorf'?"
  );
  console.log("response/n", response);
}

(async () => {
  await run();
  console.log("run complete");
})();
