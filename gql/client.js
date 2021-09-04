import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: 'https://countries.trevorblades.com/',

  // Provide some optional constructor fields
  name: 'countryClient',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
export const requestGQL = async (query, variables = null) => {
  const data = await client
    .query({
      query: query,
      variables: variables
    })
  return data
};
