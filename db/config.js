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
  },
});

db.raw("SELECT 1")
  .then(() => {
    console.log("DB up");
  })
  .catch((err) => {
    throw err;
  });

export default db;