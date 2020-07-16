import { ApolloServer, gql } from "apollo-server-micro";
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

const typeDefs = gql`
  type Query {
    pamphlet(pamphlet_slug: String!): Pamphlet!
  }

  type Pamphlet {
    id: Int!
    user: String!
    pamphlet_slug: String!
    links_array: [LinkObj!]!
  }

  type LinkObj {
    link: String!
    name: String!
  }
`;

const resolvers = {
  Query: {
    pamphlet: (parent, args, context) => {
      return db
        .column("id", "pamphlet_slug", "links_array", "user")
        .select()
        .first()
        .from("pamphlets")
        .where({
          pamphlet_slug: args.pamphlet_slug,
        });
    },
  },
};

// const cors = Cors({
//   allowMethods: ['GET', 'POST', 'OPTIONS']
// })

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({}),
});

export const config = {
  api: { bodyParser: false },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });

// export default cors(handler)
export default handler;
