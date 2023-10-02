/**
 * Instead of SQL queries we use NLP to find the right data
 */
import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains";
import { createSqlAgent, SqlToolkit } from "langchain/agents";

export async function run() {
  console.log("run start");
  const datasource = new DataSource({
    type: "sqlite",
    database: "Chinook_Sqlite.sqlite",
    synchronize: false, // because we are using a pre-existing database
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  // console.log("db", db);

  const toolkit = new SqlToolkit(db);
  const model = new OpenAI({ temperature: 0 });
  const executor = createSqlAgent(model, toolkit);

  // const chain = new SqlDatabaseChain({
  //   llm: new OpenAI({
  //     temperature: 0,
  //   }),
  //   database: db,
  // });

  // const response = await chain.run(
  //   "What was the total bill for invoices in Italy?"
  // );
  // console.log("response/n", response);

  const input = "What was the total bill for invoices in Italy?";

  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);

  console.log(
    `Got intermediate steps ${JSON.stringify(
      result.intermediateSteps,
      null,
      2
    )}`
  );

  await datasource.destroy();
}

(async () => {
  await run();
  console.log("run complete");
})();
