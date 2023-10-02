export const promptTemplate = `
'Given an input question, first create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer. 
Unless the user specifies in his question a specific number of examples he wishes to obtain, always limit your query to at most {top_k} results. 
You can order the results by a relevant column to return the most interesting examples in the database.\n\n
Never query for all the columns from a specific table, only ask for a the few relevant columns given the question.\n\n
Pay attention to use only the column names that you can see in the schema description. 

Be careful to not query for columns that do not exist. Also, pay attention to which column is in which table.
\n\nUse the following format:
\n\nQuestion: "Question here"
\nSQLQuery: "SQL Query to run"
\nSQLResult: "Result of the SQLQuery"
\nAnswer: "Final answer here"
\n\nOnly use the tables listed below.

\n\n{table_info}\n\nQuestion: {input}'`;

export const tableInfo = `
  CREATE TABLE Album (AlbumId INTEGER NOT NULL, Title NVARCHAR(160) NOT NULL, ArtistId INTEGER NOT NULL) 
  SELECT * FROM "Album" LIMIT 3; 
  AlbumId Title ArtistId 1 For Those About To Rock We Salute You 1 2 Balls to the Wall 2 3 Restless and Wild 2
  
  CREATE TABLE Artist (ArtistId INTEGER NOT NULL, Name NVARCHAR(120) ) 
  SELECT * FROM "Artist" LIMIT 3; 
  ArtistId Name 1 AC/DC 2 Accept 3 Aerosmith
  
  CREATE TABLE Customer (CustomerId INTEGER NOT NULL, FirstName NVARCHAR(40) NOT NULL, LastName NVARCHAR(20) NOT NUL… NULL, GenreId INTEGER , Composer NVARCHAR(220) , Milliseconds INTEGER NOT NULL, Bytes INTEGER , UnitPrice NUMERIC(10,2) NOT NULL) 
  SELECT * FROM "Track" LIMIT 3; 
  TrackId Name AlbumId MediaTypeId GenreId Composer Milliseconds Bytes UnitPrice 1 For Those About To Rock (We Salute You) 1 1 1 Angus Young, Malcolm Young, Brian Johnson 343719 11170334 0.99 2 Balls to the Wall 2 2 1 null 342562 5510424 0.99 3 Fast As a Shark 3 2 1 F. Baltes, S. Kaufman, U. Dirkscneider & W. Hoffman 230619 3990994 0.99'`;
