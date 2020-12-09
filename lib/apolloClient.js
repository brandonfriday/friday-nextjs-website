import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import PrismicConfiguration from '../prismic-configuration';

export const client = new ApolloClient({
  link: PrismicLink({
    uri: PrismicConfiguration.graphQLApiEndpoint,
  }),
  cache: new InMemoryCache(),
});
