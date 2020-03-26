import fetch from 'node-fetch';

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const link = new HttpLink({
  uri: "https://cors-anywhere.herokuapp.com/https://todo-mongo-graphql-server.herokuapp.com/",
  fetch
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});

export default client;
