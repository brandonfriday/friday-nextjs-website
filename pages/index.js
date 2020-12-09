import React from 'react';
import { Client, manageLocal } from 'utils/prismicHelpers';
import { homepageToolbarDocs } from 'utils/prismicToolbarQueries';
import useUpdatePreviewRef from 'utils/hooks/useUpdatePreviewRef';
import useUpdateToolbarDocs from 'utils/hooks/useUpdateToolbarDocs';
import { Layout, SliceZone } from 'components';
import { getDocuments } from '../lib/getDocuments';
import { RichText } from 'prismic-reactjs';

/**
 * Homepage component
 */
const Homepage = ({ doc, menu, lang, preview, graphQLDoc }) => {
  if (doc && doc.data) {
    useUpdatePreviewRef(preview, doc.id);
    useUpdateToolbarDocs(homepageToolbarDocs(preview.activeRef, doc.lang), [
      doc,
    ]);

    return (
      <Layout
        altLangs={doc.alternate_languages}
        lang={lang}
        menu={menu}
        isPreview={preview.isActive}
      >
        <h1>{RichText.render(graphQLDoc.display_title)}</h1>
        <SliceZone sliceZone={doc.data.body} />
      </Layout>
    );
  }
};

export async function getStaticProps({
  preview,
  previewData,
  locale,
  locales,
}) {
  const ref = previewData ? previewData.ref : null;
  const isPreview = preview || false;
  const client = Client();
  const graphQLDoc = (await getDocuments('homepage', locale, ref))[0];
  console.log('🚀 ~ file: index.js ~ line 44 ~ graphQLDoc', graphQLDoc);

  const doc =
    (await client.getSingle(
      'homepage',
      ref ? { ref, lang: locale } : { lang: locale }
    )) || {};
  const menu =
    (await client.getSingle(
      'top_menu',
      ref ? { ref, lang: locale } : { lang: locale }
    )) || {};

  const { currentLang, isMyMainLanguage } = manageLocal(locales, locale);

  return {
    props: {
      menu,
      doc,
      graphQLDoc,
      preview: {
        isActive: isPreview,
        activeRef: ref,
      },
      lang: {
        currentLang,
        isMyMainLanguage,
      },
    },
    revalidate: 1,
  };
}

export default Homepage;
