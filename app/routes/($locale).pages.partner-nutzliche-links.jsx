import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';

import {PageHeader} from '~/components';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader({request, params, context}) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'partner-nutzliche-links',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.customPage({title: page.title, url: request.url});

  return json({page, seo});
}

export default function supportNGO() {
  const {page} = useLoaderData();

  return (
    <>
      <div className="page-information py-[48px]">
        <div className="container">
          <div className="page-content">
            <div
              dangerouslySetInnerHTML={{__html: page.body}}
              className="w-full font-['Open_Sans'] text-[13px] text-[#2380B1] leading-[1.2]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const PAGE_QUERY = `#graphql
  query PageDetails($language: LanguageCode, $handle: String!)
  @inContext(language: $language) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
