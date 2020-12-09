import { client } from './apolloClient';
import { resolveQueryContext } from './resolveQueryContext';

import gql from 'graphql-tag';
export const getDocument = (documentType, language, uid, optionalRef) => {
  // remove display_title eventually
  const query = gql`query{
  result: ${documentType}(lang:"${language.toLowerCase()}", uid: "${uid}"){
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
}`;

  return client
    .query({
      query,
      context: resolveQueryContext(optionalRef),
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      console.error(error);
    });
};
