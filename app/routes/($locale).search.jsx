import {defer, redirect} from '@shopify/remix-oxygen';
import {
  Await,
  Form,
  NavLink,
  useLoaderData,
  useSearchParams,
} from '@remix-run/react';
import {Suspense} from 'react';
import {
  Pagination__unstable as Pagination,
  getPaginationVariables__unstable as getPaginationVariables,
} from '@shopify/hydrogen';

import {
  FeaturedCollections,
  Grid,
  Heading,
  Input,
  PageHeader,
  ProductCard,
  ProductSwimlane,
  Section,
  Text,
  SortFilter,
} from '~/components';
import {PAGINATION_SIZE} from '~/lib/const';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';

import {getFeaturedData} from './($locale).featured-products';
import {useLocation} from 'react-use';
import {getMenuHandle, translate} from '~/lib/utils';

export async function loader({request, context: {storefront}}) {
  const searchParams = new URL(request.url).searchParams;
  const {language, country} = storefront.i18n;
  const searchTerm = searchParams.get('q');
  const variables = getPaginationVariables(request, {pageBy: 8});

  const {products, shop} = await storefront.query(SEARCH_QUERY, {
    variables: {
      searchTerm,
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const shouldGetRecommendations = !searchTerm || products?.nodes?.length === 0;

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'search',
      title: 'Search',
      handle: 'search',
      descriptionHtml: 'Search results',
      description: 'Search results',
      seo: {
        title: 'Search',
        description: `Showing ${products.nodes.length} search results for "${searchTerm}"`,
      },
      metafields: [],
      products,
      updatedAt: new Date().toISOString(),
    },
  });

  return defer({
    seo,
    shop,
    language,
    searchTerm,
    products,
    noResultRecommendations: shouldGetRecommendations
      ? getNoResultRecommendations(storefront)
      : Promise.resolve(null),
  });
}
const handleSubmit = (event) => {
  event.preventDefault();
  const [params] = useSearchParams();
  const location = useLocation();
  const name = event.target[0].value;
  const inDescription = event.target[1].value;
  const category = event.target[2].value;
  const inCategory = event.target[3].value;

  console.log('namem' + name);
  console.log('inDescription' + inDescription);
  console.log('category' + category);
  console.log('inCategory' + inCategory);
  redirect('est');
  alert(`The name you entered was`);
  params.set('sort', 's');
  //return navigate(params.toString());
};

export default function Search() {
  const {searchTerm, products, noResultRecommendations, shop, language} =
    useLoaderData();
  const noResults = products?.nodes?.length === 0;
  const menudata = shop?.aico_navigation_menu?.value
    ? JSON.parse(shop?.aico_navigation_menu?.value)
    : [];

  return (
    <>
      <div className="search-wrap mt-[48px]">
        <div className="container">
          <Form method="get">
            <div className="section-title flex items-center gap-[20px] mb-[35px]">
              <Heading
                as="h1"
                className='text-[30px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'
              >
                {translate("search",language)} - {searchTerm}
              </Heading>
              <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
            </div>
            <div className="flex flex-row gap-[30px]">
              <div className="transition-all duration-200 w-[25%] hidden min-[992px]:block ">
                <nav className="filter-list-wrap bg-[#978bbc] min-h-[245px] overflow-hidden px-[15px] py-[24px]">
                  <h4 className="whitespace-pre-wrap max-w-prose text-[#1C5F7B] text-[24px] xl:text-[28px] font-bold py-[27px] bg-[#CCDDF1] leading-none px-[30px] xl:px-[48px] hidden">
                    category
                  </h4>
                  <div className="px-[30px] xl:px-[48px] py-[27px] hidden" />
                  <div className="flex flex-col gap-y-[10px]">
                    {menudata?.map(
                      (filter) =>
                        filter.category.name != 'Home' && (
                          <div key={filter.category.name}>
                            <ul
                              className="flex flex-col gap-y-[8px] filter-sub-items"
                              key={filter.category.name}
                            >
                              <li className="" key={filter.category.name}>
                                <NavLink
                                  aria-current="page"
                                  className="block border-none  text-white p-[12px] transition-all duration-700 hover:bg-[#8f2999] font-['OpenSans'] rounded-[8px] text-[20px] leading-[1.2] active"
                                  to={getMenuHandle(filter.category)}
                                >
                                  {translate(filter.category.name, language)}
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        ),
                    )}

                    {/* <div>
                    <ul className="flex flex-col gap-y-[8px] filter-sub-items">
                      <li className="">
                        <a
                          aria-current="page"
                          className="block border-none  text-white p-[12px] transition-all duration-700 hover:bg-[#8f2999] font-['OpenSans'] rounded-[8px] text-[20px] leading-[1.2] active"
                          href="/collections/windeln-und-reinigungswaren-windeln-windeln"
                        >
                          Wickelzubehör
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-y-[8px] filter-sub-items">
                      <li className="">
                        <a
                          aria-current="page"
                          className="block border-none  text-white p-[12px] transition-all duration-700 hover:bg-[#8f2999] font-['OpenSans'] rounded-[8px] text-[20px] leading-[1.2] active"
                          href="/collections/windeln-und-reinigungswaren-windeln-windeln"
                        >
                          Pflege und Hygiene
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-y-[8px] filter-sub-items">
                      <li className="">
                        <a
                          aria-current="page"
                          className="block border-none  text-white p-[12px] transition-all duration-700 hover:bg-[#8f2999] font-['OpenSans'] rounded-[8px] text-[20px] leading-[1.2] active"
                          href="/collections/windeln-und-reinigungswaren-windeln-windeln"
                        >
                          Marken
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="flex flex-col gap-y-[8px] filter-sub-items">
                      <li className="">
                        <a
                          className="block border-none  text-white p-[12px] transition-all duration-700 hover:bg-[#8f2999] font-['OpenSans'] rounded-[8px] text-[20px] leading-[1.2]"
                          href="/collections/abo-gutscheine-1"
                        >
                          Abo &amp; Gutscheine
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  </div>
                </nav>
              </div>
              <div className="w-full min-[992px]:w-[75%]">
                <div className="filter-form-wrap mb-[40px]">
                  <div className="filter-form-inner bg-[#f8f9fa] p-[20px] border-[1px] border-[#00000020] rounded-[4px]">
                    <div className="flex flex-col sm:flex-row gap-[20px]">
                      <div className="flex-1">
                        <input
                          type="text"
                          name="q"
                          defaultValue={searchTerm}
                          className="bg-white border border-[#92bcdd] text-black text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control"
                          placeholder="Suchbegriff(e)"
                        />
                        <div className="flex items-center mt-[15px]">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            //defaultValue="false"
                            name="in_decription_search"
                            className="w-4 h-4 text-blue-600 bg-white border-[#333333] rounded focus:ring-0 focus:ring-transparent focus:shadow-none"
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="ml-2 text-[16px] text-[#2380B1]"
                          >
                            {/* In Produktbeschreibungen suchen */}
                            {translate("search_in_lable",language)}
                          </label>
                        </div>
                      </div>
                      <div className="flex-1">
                        <select
                          id="countries"
                          name="category"
                          className="bg-white border border-[#92bcdd] text-black text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control"
                        >
                          <option value="" selected="">Choose a country</option>
                          {menudata?.map(
                            (filter) =>
                              filter.category.name != 'Home' && (
                                <option value={filter.category.name}>
                                  {' '}
                                  {translate(filter.category.name, language)}
                                </option>
                              ),
                          )}
                        </select>

                        <div className="flex items-center mt-[15px]">
                          <input
                            id="link-checkbox2"
                            type="checkbox"
                            name="category_search"
                            // defaultValue=""
                            className="w-4 h-4 text-blue-600 bg-white border-[#333333] rounded focus:ring-0 focus:ring-transparent focus:shadow-none"
                          />
                          <label
                            htmlFor="link-checkbox2"
                            className="ml-2 text-[16px] text-[#2380B1]"
                          >
                            {/* In Unterkategorien suchen */}
                            {translate("search_in_sub",language)}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="btn-wrap flex justify-end mt-[20px]">
                      <button className="button-search hover:bg-[#9a2ea3] hover:text-white text-[#9a2ea3] border-[2px] border-[#9a2ea3] transition-all duration-500 py-[10px] px-[20px] rounded-[4px]">
                        Suche
                      </button>
                    </div>
                  </div>
                </div>
                <div className="title flex items-center gap-[20px] mb-[30px]">
                  <h3 className='text-[25px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1] max-w-[80%]'>
                    {/* Produkte die den Suchkriterien entsprechen */}
                    {translate("match_product",language)}
                  </h3>
                  <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
                </div>
                {!searchTerm || noResults ? (
                  <NoResults
                    noResults={noResults}
                    recommendations={noResultRecommendations}
                  />
                ) : (
                  <Section className={'!p-0 !gap-0'}>
                    <Pagination connection={products}>
                      {({nodes, isLoading, NextLink, PreviousLink}) => {
                        const itemsMarkup = nodes.map((product, i) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            loading={getImageLoadingPriority(i)}
                          />
                        ));
                        return (
                          <>
                            <div className="flex items-center justify-center">
                              <PreviousLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                                {isLoading ? 'Loading...' : 'Previous'}
                              </PreviousLink>
                            </div>
                            <div
                              data-test="product-grid"
                              className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px]"
                            >
                              {itemsMarkup}
                            </div>
                            <div className="flex items-center justify-center">
                              <NextLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                                {isLoading ? 'Loading...' : 'Next'}
                              </NextLink>
                            </div>
                          </>
                        );
                      }}
                    </Pagination>
                  </Section>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
      {/* <PageHeader>
        <Heading as="h1" size="copy">
          Search
        </Heading>
        <Form method="get" className="relative flex w-full text-heading">
          <Input
            defaultValue={searchTerm}
            name="q"
            placeholder="Search…"
            type="search"
            variant="search"
          />
          <button className="absolute right-0 py-2" type="submit">
            Go
          </button>
        </Form>
      </PageHeader> */}
    </>
  );
}

function NoResults({noResults, recommendations}) {
  return (
    <>
      {noResults && (
        <Section className={'!p-0 !gap-0'}>
          <Text className="!text-[13px] text-[#2380B1] font-['Open_Sans']">
            Keine Produkte vorhanden, die den Suchkriterien entsprechen
          </Text>
        </Section>
      )}
      {/* <Suspense>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommendations}
        >
          {(result) => {
            if (!result) return null;
            const {featuredCollections, featuredProducts} = result;

            return (
              <>
                <FeaturedCollections
                  title="Trending Collections"
                  collections={featuredCollections}
                />
                <ProductSwimlane
                  title="Trending Products"
                  products={featuredProducts}
                />
              </>
            );
          }}
        </Await>
      </Suspense> */}
    </>
  );
}

export function getNoResultRecommendations(storefront) {
  return getFeaturedData(storefront, {pageBy: PAGINATION_SIZE});
}

const SEARCH_QUERY = `#graphql
  query PaginatedProductsSearch(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $searchTerm: String
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    shop {
      id
      name
      aico_navigation_menu: metafield(namespace: "aico_metafields", key: "aico_navigation_menu") {
        value
      }
    }
    products(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor,
      sortKey: RELEVANCE,
      query: $searchTerm
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }

  ${PRODUCT_CARD_FRAGMENT}
`;
