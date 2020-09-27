import knex from "knex";
// import Cors from 'micro-cors'
// import DataLoader from 'dataloader'

const db = knex({
  client: "postgres",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.DB_PORT ? process.env.DB_PORT : 5432,
  },
});

db.raw("SELECT 1")
  .then(() => {
    console.log("DB up");
  })
  .catch((err) => {
    console.log("Database Error, error follows this message:");
    throw err;
  });

export default db;
