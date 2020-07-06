# API Design
## Overview
The API will have to communicate with a couple of different things so it's important to get that down on paper first. However, as we're using GraphQL to build the API out, things might seem a bit different.

## Primary Data Flow
Primary data here refers to the pamphlets. Initially this will consist of only anonymous link pamphlets, but if we add user auth, then that'll change a bit. But for now it'll look like this:
```
  PostgreSQL(data store) <==> GraphQL <==> Next.js/ Express <==> React App Query/ Mutation
```

Pretty straight-forwards with the primary consideration being that we need to build the GraphQL Schema from the bottom up. In terms of how that's going to be built, we'll need to define our SQL schema, and we'll need to define the GraphQL schema. If that sounds redundant, it is and we'll need to figure out how to not be constantly repeating ourselves in that process.


If and when we do implement user auth, then it'll probably look like the below:
```
  # User data
  PostgreSQL(User data) <==> GraphQL <==> Next.js/ Express <==> React App Query/ Mutation

  # Pamphlet data
  PostgreSQL(Pamphlet data) <==> GraphQL <==> Next.js/ Express <==> React App Query/ Mutation
```

Where any added pamphlets will also mutate the User data as well.

## SSR App Data Flow
SSR Data flow will look much like a normal REST API, although we do have the option of having page caching for performance.