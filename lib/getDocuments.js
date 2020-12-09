import { client } from './apolloClient';
import capitalize from 'lodash/capitalize';

import gql from 'graphql-tag';
export const getDocuments = (documentType, language) => {
  const query = gql`query{
  results: all${capitalize(documentType)}s(lang:"${language.toLowerCase()}"){
    edges{
      node{
        _meta{
          id
          uid
          type
          tags
          lang
          alternateLanguages{
            lang
            type
          }
        }
      }
    }
  }
}`;

  return client
    .query({
      query,
    })
    .then((response) => {
      const results = response.data.results;
      return results.edges.map((edge) => {
        return edge.node;
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
