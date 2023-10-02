import { AppDataSource } from "./data-source.js";
import { User } from "./entity/User.js";

/**
 * Invoice: 412 rows, 10 columns.
 *
 * 11 tables in total.
 * 15,000 rows of data.
 */
AppDataSource.initialize()
  .then(async () => {
    const invoices = await AppDataSource.manager.query(
      // "SELECT name FROM sqlite_master WHERE type='table';"
      // "SELECT * FROM INVOICE LIMIT 3;"
      "SELECT SUM(Total) FROM INVOICE WHERE BillingCountry = 'Italy'"
    );
    console.log(invoices);
  })
  .catch((error) => console.log(error));
