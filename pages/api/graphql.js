import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "cors";

import db from "../../db/config";
import generateRandomSlug from "../../utils/generateSlug";

const typeDefs = gql`
  type Query {
    pamphlet(pamphlet_slug: String!): Pamphlet!
  }

  type Mutation {
    createPamphlet(
      linksArray: [InputLinkObj!]!
      pamphletName: String!
    ): PamphletReturn
  }

  type Pamphlet {
    id: Int!
    user: String!
    pamphlet_name: String!
    pamphlet_slug: String!
    links_array: [LinkObj!]!
  }

  type PamphletReturn {
    user: String!
    pamphlet_name: String!
    pamphlet_slug: String!
    links_array: [LinkObj!]!
  }

  type LinkObj {
    link: String!
    name: String!
  }

  input InputLinkObj {
    link: String!
    name: String!
  }
`;

const resolvers = {
  Query: {
    pamphlet: (_, args, __) => {
      return db
        .column("id", "pamphlet_slug", "links_array", "user", "pamphlet_name")
        .select()
        .first()
        .from("pamphlets")
        .where({
          pamphlet_slug: args.pamphlet_slug,
        });
    },
  },

  Mutation: {
    // TODO will need to update this when user auth is added
    createPamphlet: (_, { linksArray, pamphletName }, __) => {
      // generate pamphlet slug
      const slug = generateRandomSlug();

      // Check if slug exists(overkill for now)
      // db.select("*")
      //   .from("pamphlets")
      //   .where({ pamphlet_slug: slug})
      //   .then((value) => {
      //     if (value.length > 0) {
      //     }
      //   })
      // Post to the database and return the result
      return db("pamphlets")
        .returning(["pamphlet_name", "pamphlet_slug", "user", "links_array"])
        .insert([
          {
            links_array: JSON.stringify(linksArray),
            pamphlet_slug: slug,
            pamphlet_name: pamphletName,
          },
        ])
        .then((vals) => vals[0])
        .catch((err) => {
          throw err;
        });
    },
  },
};

const cors = Cors({
  allowMethods: ["GET", "POST", "OPTIONS"],
});

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
export default process.env.NODE_ENV === "production" ? cors(handler) : handler;
