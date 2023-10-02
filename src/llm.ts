/**
 * Instead of SQL queries we use NLP to find the right data
 */
import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains";

export async function run() {
  console.log("run start");
  const datasource = new DataSource({
    type: "sqlite",
    database: "Chinook_Sqlite.sqlite",
    synchronize: false, // because we are using a pre-existing database
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
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
    "What was the total bill for invoices in Italy?"
  );
  console.log("response/n", response);

  await datasource.destroy();
}

(async () => {
  await run();
  console.log("run complete");
})();
