import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {translate} from '~/lib/utils';
import {Swiper, SwiperSlide} from 'swiper/react';
import {ShoppingByBrands} from '~/components/ShoppingByBrands';
import {NewInTheShop} from '~/components/NewInTheShop';
import {Bestseller} from '~/components/Bestseller';
import {CtaBanner} from '~/components/CtaBanner';
import {HeroSlider} from '~/components/HeroSlider';

export const headers = routeHeaders;

export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero, home_hero_slider, slider_ballons} =
    await context.storefront.query(HOMEPAGE_SEO_QUERY, {
      variables: {handle: 'freestyle'},
    });

  const seo = seoPayload.home();
  var ImageId = 'gid://shopify/Metaobject/1449656611';

  if (language == 'FR') {
    var ImageId = 'gid://shopify/Metaobject/4294377763';
  }

  return defer({
    shop,
    homeHeroSlider: home_hero_slider,
    slider_ballons: slider_ballons,
    language,
    primaryHero: hero,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      },
    ),
    secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    }),
    featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    }),
    tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    }),
    latestProducts: context.storefront.query(HOMEPAGE_LATEST_PRODUCTS_QUERY, {
      variables: {
        /**
         * Country and language properties are automatically injected
         * into all queries. Passing them is unnecessary unless you
         * want to override them from the following default:
         */
        country,
        language,
      },
    }),

    childBanner: context.storefront.query(
      HOMEPAGE_SLEEPING_CHILD_BANNER_QUERY,
      {
        variables: {metaObjectId: ImageId},
      },
    ),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  });
}

export default function Homepage() {
  const {
    primaryHero,
    homeHeroSlider,
    slider_ballons,
    secondaryHero,
    tertiaryHero,
    featuredCollections,
    featuredProducts,
    latestProducts,
    childBanner,
    language,
  } = useLoaderData();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <>
      <HeroSlider slides={homeHeroSlider?.nodes} ballon={slider_ballons} />

      {/* {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )}
      
      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )} */}

      {/* {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )} */}
      <ShoppingByBrands className={''} locale={language} />
      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return <FeaturedCollections collections={collections} title="" />;
            }}
          </Await>
        </Suspense>
      )}
      {latestProducts && (
        <Suspense>
          <Await resolve={latestProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <NewInTheShop
                  products={products.nodes}
                  title={translate('new_in_shop', language)}
                  locale={language}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      {latestProducts && (
        <Suspense>
          <Await resolve={latestProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <Bestseller
                  products={products.nodes}
                  title={translate('new_in_shop', language)}
                  locale={language}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      {childBanner && (
        <Suspense>
          <Await resolve={childBanner}>
            {({data}) => {
              return <CtaBanner banner={data.banner} />;
            }}
          </Await>
        </Suspense>
      )}

      {/* {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )} */}
    </>
  );
}

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_LATEST_PRODUCTS_QUERY = `#graphql
  query homepagelatestProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

const HOMEPAGE_SLEEPING_CHILD_BANNER_QUERY = `#graphql
${MEDIA_FRAGMENT}
  query homeTopCollections($metaObjectId: ID!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    data: metaobject(id : $metaObjectId) {
      handle
      id
      type
      banner : field(key: "banner") {
        reference {
          ...Media
        }
      }
    }
      
  }
`;

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
`;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    slider_ballons: metaobjects(type: "ballons", first: 1) {
      nodes {
        id
        balloon_1: field(key: "balloon_1") {
          reference {
            ...Media
          }
        }
        balloon_2: field(key: "balloon_2") {
          reference {
            ...Media
          }
        }
        balloon_3: field(key: "balloon_3") {
          reference {
            ...Media
          }
        }
        balloon_4: field(key: "balloon_4") {
          reference {
            ...Media
          }
        }
        balloon_5: field(key: "balloon_5") {
          reference {
            ...Media
          }
        }
        balloon_6: field(key: "balloon_6") {
          reference {
            ...Media
          }
        }
      }
    }

    home_hero_slider: metaobjects(type: "home_slider", first: 5) {
      nodes {
        id
        heading: field(key: "heading") {
          value
        }
        sub_heading: field(key: "sub_heading") {
          value
        }
        background: field(key: "background") {
          reference {
            ...Media
          }
        }
        main_image: field(key: "main_image") {
          reference {
            ...Media
          }
        }
       
        cta_label: field(key: "cta_label") {
          value
        }
        cta_redirect: field(key: "cta_redirect") {
          value
        }
      }
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 3,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
        boarder_color: metafield(namespace: "custom", key: "boadercolor") {
          value
        }
      }
    }
  }
`;
