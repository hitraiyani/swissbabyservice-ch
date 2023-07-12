import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  flattenConnection,
  AnalyticsPageType,
  Pagination__unstable as Pagination,
  getPaginationVariables__unstable as getPaginationVariables,
} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {
  PageHeader,
  Section,
  Text,
  SortFilter,
  Grid,
  ProductCard,
  Button,
  ProductSwimlane,
} from '~/components';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';
import {getImageLoadingPriority} from '~/lib/const';

export const headers = routeHeaders;

export async function loader({params, request, context}) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });
  const {language, country} = context.storefront.i18n;
  const {collectionHandle} = params;

  invariant(collectionHandle, 'Missing collectionHandle param');

  const searchParams = new URL(request.url).searchParams;
  const knownFilters = ['productVendor', 'productType'];
  const available = 'available';
  const variantOption = 'variantOption';
  const {sortKey, reverse} = getSortValuesFromParam(searchParams.get('sort'));
  const filters = [];
  const appliedFilters = [];

  for (const [key, value] of searchParams.entries()) {
    if (available === key) {
      filters.push({available: value === 'true'});
      appliedFilters.push({
        label: value === 'true' ? 'In stock' : 'Out of stock',
        urlParam: {
          key: available,
          value,
        },
      });
    } else if (knownFilters.includes(key)) {
      filters.push({[key]: value});
      appliedFilters.push({label: value, urlParam: {key, value}});
    } else if (key.includes(variantOption)) {
      const [name, val] = value.split(':');
      filters.push({variantOption: {name, value: val}});
      appliedFilters.push({label: val, urlParam: {key, value}});
    }
  }

  // Builds min and max price filter since we can't stack them separately into
  // the filters array. See price filters limitations:
  // https://shopify.dev/custom-storefronts/products-collections/filter-products#limitations
  if (searchParams.has('minPrice') || searchParams.has('maxPrice')) {
    const price = {};
    if (searchParams.has('minPrice')) {
      price.min = Number(searchParams.get('minPrice')) || 0;
      appliedFilters.push({
        label: `Min: $${price.min}`,
        urlParam: {key: 'minPrice', value: searchParams.get('minPrice')},
      });
    }
    if (searchParams.has('maxPrice')) {
      price.max = Number(searchParams.get('maxPrice')) || 0;
      appliedFilters.push({
        label: `Max: $${price.max}`,
        urlParam: {key: 'maxPrice', value: searchParams.get('maxPrice')},
      });
    }
    filters.push({
      price,
    });
  }
  const {shop} = await context.storefront.query(MENU_QUERY, {
    variables: {
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  const {collection, collections} = await context.storefront.query(
    COLLECTION_QUERY,
    {
      variables: {
        ...paginationVariables,
        handle: collectionHandle,
        filters,
        sortKey,
        reverse,
        country: context.storefront.i18n.country,
        language: context.storefront.i18n.language,
      },
    },
  );

  if (!collection) {
    throw new Response('collection', {status: 404});
  }

  const seo = seoPayload.collection({collection, url: request.url});

  return json({
    collection,
    shop,
    appliedFilters,
    collections: flattenConnection(collections),
    analytics: {
      pageType: AnalyticsPageType.collection,
      collectionHandle,
      resourceId: collection.id,
    },
    seo,
  });
}

export default function Collection() {
  const {collection, collections, appliedFilters, shop, language} =
    useLoaderData();

  return (
    <>
      <div className="product-category-wrap mt-[48px]">
        <div className="container">
          <div className="category-title-wrap mb-[35px]">
            <div className="category-title flex items-center gap-[20px]">
              <h1 className='text-[30px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1] max-w-[80%]'>
                {collection.title}
              </h1>
              <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
            </div>
          </div>
          {/* {collection?.description && (
                <div className="flex items-baseline justify-between w-full">
                  <div>
                    <Text format width="narrow" as="p" className="inline-block">
                      {collection.description}
                    </Text>
                  </div>
                </div>
              )} */}
          <Section className={'!p-0 !gap-0 !block'}>
            <div className="flex flex-row gap-[30px]">
              <SortFilter
                filters={collection.products.filters}
                appliedFilters={appliedFilters}
                collections={collections}
                locale={language}
                menudata={
                  shop?.aico_navigation_menu?.value
                    ? JSON.parse(shop?.aico_navigation_menu?.value)
                    : []
                }
              ></SortFilter>
              <div className="product-grid-wrap w-full min-[992px]:w-[75%]">
                <div className='product-category-description text-[13px] font-["Open_Sans"] text-[#2380B1] mb-[20px]'>
                  <p>Pingo Windeln werden in der Schweiz produziert und haben alle Eigenschaften sowie den Leistungsstandard des Marktführers. Swiss Made seit über 30 Jahren.</p>
                </div>
                <Pagination connection={collection.products}>
                  {({nodes, isLoading, PreviousLink, NextLink}) => (
                    <>
                      <div className="flex items-center justify-center">
                        <Button
                          as={PreviousLink}
                          variant="secondary"
                          width="full"
                        >
                          {isLoading ? 'Loading...' : 'Load previous'}
                        </Button>
                      </div>
                      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 min-[992px]:grid-cols-3 gap-[30px]">
                        {nodes.map((product, i) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            loading={getImageLoadingPriority(i)}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-center mt-6">
                        <Button as={NextLink} variant="secondary" width="full">
                          {isLoading ? 'Loading...' : 'Load more products'}
                        </Button>
                      </div>
                    </>
                  )}
                </Pagination>
                <div className="you-might-also-be-interested-in-this border-t-[1px] border-b-[1px] border-[#0000001a] my-[16px] py-[26px]">
                  <div className="section-title flex items-center gap-[20px]">
                    <h3 className='text-[20px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
                      Das könnte Sie auch noch interessieren
                    </h3>
                    <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}
const MENU_QUERY = `#graphql
  query CollectionDetails(
    $country: CountryCode
    $language: LanguageCode
    
  ) @inContext(country: $country, language: $language) {
    shop {
      id
      name
      aico_navigation_menu: metafield(namespace: "aico_metafields", key: "aico_navigation_menu") {
        value
      }
    }
  }`;
const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

function getSortValuesFromParam(sortParam) {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        reverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        reverse: false,
      };
    default:
      return {
        sortKey: 'RELEVANCE',
        reverse: false,
      };
  }
}
