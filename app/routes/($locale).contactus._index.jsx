import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';

import {PageHeader, Section, Heading, Link} from '~/components';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import { translate } from '~/lib/utils';
import { Contactus } from '~/components/contactus';

export const headers = routeHeaders;

export const loader = async ({request, context: {storefront}}) => {
  const {language, country} = storefront.i18n;
 const seo = seoPayload.customPage({title : translate('contact', storefront.i18n.language), url: request.url});

 return json(
   { seo,language},
   { 
   },
 );
};
export default function Policies() {
  const {
    seo,
    language,
  } = useLoaderData();

  return (
    <>
      <PageHeader heading={translate('contact',language)} />
      <Section padding="x" className="mb-24">
         <Contactus className={''} locale={language}/>
      </Section>
    </>
  );
}

const POLICIES_QUERY = `#graphql
  fragment PolicyIndex on ShopPolicy {
    id
    title
    handle
  }

  query PoliciesIndex {
    shop {
      privacyPolicy {
        ...PolicyIndex
      }
      shippingPolicy {
        ...PolicyIndex
      }
      termsOfService {
        ...PolicyIndex
      }
      refundPolicy {
        ...PolicyIndex
      }
      subscriptionPolicy {
        id
        title
        handle
      }
    }
  }
`;
