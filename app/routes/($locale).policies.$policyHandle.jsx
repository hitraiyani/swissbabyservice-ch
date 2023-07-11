import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';

import {PageHeader, Section, Button} from '~/components';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {translate} from '~/lib/utils';
export const headers = routeHeaders;

export async function loader({request, params, context}) {
  invariant(params.policyHandle, 'Missing policy handle');

  const policyName = params.policyHandle.replace(/-([a-z])/g, (_, m1) =>
    m1.toUpperCase(),
  );

  const data = await context.storefront.query(POLICY_CONTENT_QUERY, {
    variables: {
      privacyPolicy: false,
      shippingPolicy: false,
      termsOfService: false,
      refundPolicy: false,
      [policyName]: true,
      language: context.storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');
  const policy = data.shop?.[policyName];

  if (!policy) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.customPage({
    title: translate(
      `${policy.handle}-title`,
      context.storefront.i18n.language,
    ),
    url: request.url,
    description: '',
  });

  return json({policy, seo});
}

export default function Policies() {
  const {policy} = useLoaderData();

  return (
    <>
      <div className="page-information py-[48px]">
        <div className="container">
          <div className="page-content">
            <div
              dangerouslySetInnerHTML={{__html: policy.body}}
              className="w-full font-['Roboto'] text-[13px] text-[#2380B1] leading-[1.2]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const POLICY_CONTENT_QUERY = `#graphql
  fragment PolicyHandle on ShopPolicy {
    body
    handle
    id
    title
    url
  }

  query PoliciesHandle(
    $language: LanguageCode
    $privacyPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
    $refundPolicy: Boolean!
  ) @inContext(language: $language) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) {
        ...PolicyHandle
      }
      shippingPolicy @include(if: $shippingPolicy) {
        ...PolicyHandle
      }
      termsOfService @include(if: $termsOfService) {
        ...PolicyHandle
      }
      refundPolicy @include(if: $refundPolicy) {
        ...PolicyHandle
      }
    }
  }
`;
