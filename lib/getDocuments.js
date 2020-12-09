import { client } from './apolloClient';
import capitalize from 'lodash/capitalize';
import { resolveQueryContext } from './resolveQueryContext';

import gql from 'graphql-tag';
export const getDocuments = (documentType, language, optionalRef) => {
  // remove display_title eventually
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
          display_title
      }
    }
  }
}`;

  return client
    .query({
      query,
      context: resolveQueryContext(optionalRef),
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
