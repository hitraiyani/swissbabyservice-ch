import {useRef, Suspense, useMemo, useState} from 'react';
import {Disclosure, Listbox} from '@headlessui/react';
import {defer} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  Await,
  useSearchParams,
  useLocation,
  useNavigation,
} from '@remix-run/react';
import {AnalyticsPageType, Money, ShopPayButton} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';
import clsx from 'clsx';

import {
  Heading,
  IconCaret,
  IconCheck,
  IconClose,
  ProductGallery,
  ProductSwimlane,
  Section,
  Skeleton,
  Text,
  Link,
  AddToCartButton,
  Button,
  SortFilter,
  IconMinus,
  IconPlus,
  IconHome,
  IconCart,
} from '~/components';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({params, request, context}) {
  const {productHandle} = params;
  const {language, country} = context.storefront.i18n;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const searchParams = new URL(request.url).searchParams;

  const selectedOptions = [];
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  return defer({
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
    seo,
    language,
  });
}

export default function Product() {
  const {product, shop, recommended, language} = useLoaderData();
  const {media, title, vendor, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;

  return (
    <>
      {console.log()}
      {console.log('product')}
      <Section className="!p-0 !gap-0">
        <div className="breadcrumb-wrap my-[20px]">
          <div className="container">
            <div className="breadcrumb flex items-center gap-[20px]">
              <ul className="flex flex-wrap gap-y-[15px] text-[13px] leading-[1.2] text-[#337ab7] [&>li>a:hover]:opacity-70 [&>li>a:hover]:transition-all [&>li>a:hover]:duration-500 [&>*:last-child]:font-semibold">
                <li>
                  <a href="#">
                    <IconHome className={'w-[15px] h-[15px]'} />
                  </a>
                </li>
                <li>
                  <a href="#">Produkte</a>
                </li>
                <li>
                  <a href="#">Pingo</a>
                </li>
                <li>
                  <a href="#">
                    Pampers Baby-Dry Gr.3 Midi 6-10kg (124 STK) Maxi Pack
                  </a>
                </li>
              </ul>
              <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
            </div>
          </div>
        </div>
        <div className="product-detail">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-[30px]">
              <SortFilter
                filters={''}
                appliedFilters={''}
                collections={''}
                locale={language}
                selectedHandle={product?.collections?.edges?.[0]?.node?.handle}
                menudata={
                  shop?.aico_navigation_menu?.value
                    ? JSON.parse(shop?.aico_navigation_menu?.value)
                    : []
                }
              ></SortFilter>
              <div className="w-[75%]">
                <div className="flex flex-wrap">
                  <ProductGallery media={media.nodes} className="w-[50%]" />
                  <div className="w-[50%] product-info-wrap pl-[30px]">
                    <section className="product-info">
                      <Heading
                        as="h1"
                        className="text-[20px] font-['Open_Sans'] font-semibold text-[#2380B1] mb-[15px]"
                      >
                        {title}
                      </Heading>
                      {vendor && (
                        <Text className={'!text-[14px] text-[#2380B1] block'}>
                          {vendor}
                        </Text>
                      )}
                      <ProductForm locale={language} />
                    </section>
                  </div>
                  <div className="product-desc w-full mt-[48px]">
                    {descriptionHtml && (
                      <ProductDetail
                        title="Produktdetails"
                        content={descriptionHtml}
                      />
                    )}
                    {shippingPolicy?.body && (
                      <ProductDetail
                        title="Shipping"
                        content={getExcerpt(shippingPolicy.body)}
                        learnMore={`/policies/${shippingPolicy.handle}`}
                      />
                    )}
                    {refundPolicy?.body && (
                      <ProductDetail
                        title="Returns"
                        content={getExcerpt(refundPolicy.body)}
                        learnMore={`/policies/${refundPolicy.handle}`}
                      />
                    )}
                  </div>
                  <div className='pro-tags font-["Open_Sans"] text-[13px] text-[#2380B1] leading-[1.2] [&>p>a]:underline [&>p>a:hover]:opacity-70 border-t-[1px] border-[#0000001a] mt-[16px] pt-[16px]'>
                  <p><span><b>Schnellsuche: </b></span> <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=pingo pants">pingo pants</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=pants">pants</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=pingo">pingo</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=superweich">superweich</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=hautfreundlich">hautfreundlich</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=atmungsaktiv">atmungsaktiv</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=perfekte passform">perfekte passform</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=dünner windelkern">dünner windelkern</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=zuverlässig">zuverlässig</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=trocken">trocken</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=kein parfum">kein parfum</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=keine parabene">keine parabene</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=kein latex">kein latex</a>, <a href="https://www.swissbabyservice.ch/index.php?route=product/search&amp;tag=keine lotion">keine lotion</a> 																				 <a href=""></a> 										 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* <Suspense fallback={<Skeleton className="h-32" />}>
        <Await
          errorElement="There was a problem loading related products"
          resolve={recommended}
        >
          {(products) => (
            <ProductSwimlane title="Related Products" products={products} />
          )}
        </Await>
      </Suspense> */}
    </>
  );
}

export function ProductForm(locale) {
  const {product, analytics, storeDomain} = useLoaderData();

  const [currentSearchParams] = useSearchParams();
  const {location} = useNavigation();

  /**
   * We update `searchParams` with in-flight request data from `location` (if available)
   * to create an optimistic UI, e.g. check the product option before the
   * request has completed.
   */
  const searchParams = useMemo(() => {
    return location
      ? new URLSearchParams(location.search)
      : currentSearchParams;
  }, [currentSearchParams, location]);

  const firstVariant = product.variants.nodes[0];

  /**
   * We're making an explicit choice here to display the product options
   * UI with a default variant, rather than wait for the user to select
   * options first. Developers are welcome to opt-out of this behavior.
   * By default, the first variant's options are used.
   */
  const searchParamsWithDefaults = useMemo(() => {
    const clonedParams = new URLSearchParams(searchParams);

    for (const {name, value} of firstVariant.selectedOptions) {
      if (!searchParams.has(name)) {
        clonedParams.set(name, value);
      }
    }

    return clonedParams;
  }, [searchParams, firstVariant.selectedOptions]);

  /**
   * Likewise, we're defaulting to the first variant for purposes
   * of add to cart if there is none returned from the loader.
   * A developer can opt out of this, too.
   */
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;

  const [quantity, setQuantity] = useState(1);

  const productAnalytics = {
    ...analytics.products[0],
    quantity: 1,
  };

  return (
    <>
      <ProductOptions
        options={product.options}
        searchParamsWithDefaults={searchParamsWithDefaults}
      />
      <div className="flex flex-wrap gap-[20px] justify-between items-center mt-[20px]">
        <QuantityComponent
          quantity={quantity}
          setQuantity={setQuantity}
          locale={locale}
        />
        <div className='flex flex-col text-[30px] font-["opensans"] gap-[5px] text-right'>
          {isOnSale && (
            <Money
              withoutTrailingZeros
              data={selectedVariant?.compareAtPrice}
              as="span"
              className="text-[#b7d4e9] line-through"
            />
          )}
          <Money
            withoutTrailingZeros
            data={selectedVariant?.price}
            as="span"
            className="text-[#9a2ea3]"
          />
        </div>
      </div>
      {selectedVariant && (
        <div className="flex flex-col gap-[20px] mt-[30px]">
          {isOutOfStock ? (
            <Button
              variant="secondary"
              disabled
              className="border-[2px] border-[#9a2ea3]  px-[20px] py-[10px] rounded-[5px] w-full bg-[#9a2ea3] text-white transition-all duration-500 opacity-50"
            >
              <Text className={'!text-[20px]'}>Sold out</Text>
            </Button>
          ) : (
            <AddToCartButton
              lines={[
                {
                  merchandiseId: selectedVariant.id,
                  quantity: quantity,
                },
              ]}
              variant="primary"
              data-test="add-to-cart"
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price),
              }}
              className="border-[2px] border-[#9a2ea3]  px-[20px] py-[10px] rounded-[5px] w-full text-[#9a2ea3] hover:bg-[#9a2ea3] hover:text-white transition-all duration-500"
            >
              <Text
                as="span"
                className="flex items-center justify-center gap-[10px] !text-[20px] leading-none"
              >
                <span>
                  <IconCart className={'w-[25px] h-[25px]'} />
                </span>
                <span>In den Warenkorb</span>
              </Text>
            </AddToCartButton>
          )}
          {/* {!isOutOfStock && (
            <ShopPayButton
              width="100%"
              variantIds={[selectedVariant?.id]}
              storeDomain={storeDomain}
            />
          )} */}
        </div>
      )}
    </>
  );
}

function QuantityComponent({quantity, setQuantity, locale}) {
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Ensure input value is a number
    if (!isNaN(inputValue)) {
      setQuantity(parseInt(inputValue));
    }
  };

  return (
    <div className="qty-box">
      <div className="flex border-[2px] border-[#2380b1] rounded-[8px] w-[120px]">
        <div className="flex flex-col w-[50px]">
          <button
            onClick={decreaseQuantity}
            disabled={quantity === 0}
            className={`${
              quantity === 0 ? 'bg-opacity-50 pointer-events-none' : ''
            } bg-[#3291c2] h-[35px] w-[50px] py-[6px] px-[12px] text-white text-center`}
          >
            <IconMinus className={'m-auto'} />
          </button>
          <button
            onClick={increaseQuantity}
            className="bg-[#3291c2] h-[35px] w-[50px] py-[6px] px-[12px] text-white text-center"
          >
            <IconPlus className={'m-auto'} />
          </button>
        </div>
        <input
          type="number"
          id="quantity"
          className='flex-1 w-full flex items-center justify-center border-none text-[30px] font-bold font-["Open_Sans"] text-[#18A1DC] !ring-0 !shadow-none appearance-none text-center bg-transparent'
          value={quantity}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
function ProductOptions({options, searchParamsWithDefaults}) {
  const closeRef = useRef(null);
  return (
    <>
      {options
        .filter((option) => option.values.length > 1)
        .map((option) => (
          <div
            key={option.name}
            className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
          >
            <Heading as="legend" size="lead" className="min-w-[4rem]">
              {option.name}
            </Heading>
            <div className="flex flex-wrap items-baseline gap-4">
              {/**
               * First, we render a bunch of <Link> elements for each option value.
               * When the user clicks one of these buttons, it will hit the loader
               * to get the new data.
               *
               * If there are more than 7 values, we render a dropdown.
               * Otherwise, we just render plain links.
               */}
              {option.values.length > 7 ? (
                <div className="relative w-full">
                  <Listbox>
                    {({open}) => (
                      <>
                        <Listbox.Button
                          ref={closeRef}
                          className={clsx(
                            'flex items-center justify-between w-full py-3 px-4 border border-primary',
                            open
                              ? 'rounded-b md:rounded-t md:rounded-b-none'
                              : 'rounded',
                          )}
                        >
                          <span>
                            {searchParamsWithDefaults.get(option.name)}
                          </span>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Listbox.Button>
                        <Listbox.Options
                          className={clsx(
                            'border-primary bg-contrast absolute bottom-12 z-30 grid h-48 w-full overflow-y-scroll rounded-t border px-2 py-2 transition-[max-height] duration-150 sm:bottom-auto md:rounded-b md:rounded-t-none md:border-t-0 md:border-b',
                            open ? 'max-h-48' : 'max-h-0',
                          )}
                        >
                          {option.values.map((value) => (
                            <Listbox.Option
                              key={`option-${option.name}-${value}`}
                              value={value}
                            >
                              {({active}) => (
                                <ProductOptionLink
                                  optionName={option.name}
                                  optionValue={value}
                                  className={clsx(
                                    'text-primary w-full p-2 transition rounded flex justify-start items-center text-left cursor-pointer',
                                    active && 'bg-primary/10',
                                  )}
                                  searchParams={searchParamsWithDefaults}
                                  onClick={() => {
                                    if (!closeRef?.current) return;
                                    closeRef.current.click();
                                  }}
                                >
                                  {value}
                                  {searchParamsWithDefaults.get(option.name) ===
                                    value && (
                                    <span className="ml-2">
                                      <IconCheck />
                                    </span>
                                  )}
                                </ProductOptionLink>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </>
                    )}
                  </Listbox>
                </div>
              ) : (
                <>
                  {option.values.map((value) => {
                    const checked =
                      searchParamsWithDefaults.get(option.name) === value;
                    const id = `option-${option.name}-${value}`;

                    return (
                      <Text key={id}>
                        <ProductOptionLink
                          optionName={option.name}
                          optionValue={value}
                          searchParams={searchParamsWithDefaults}
                          className={clsx(
                            'leading-none py-1 border-b-[1.5px] cursor-pointer transition-all duration-200',
                            checked ? 'border-primary/50' : 'border-primary/0',
                          )}
                        />
                      </Text>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

function ProductOptionLink({
  optionName,
  optionValue,
  searchParams,
  children,
  ...props
}) {
  const {pathname} = useLocation();
  const isLocalePathname = /\/[a-zA-Z]{2}-[a-zA-Z]{2}\//g.test(pathname);
  // fixes internalized pathname
  const path = isLocalePathname
    ? `/${pathname.split('/').slice(2).join('/')}`
    : pathname;

  const clonedSearchParams = new URLSearchParams(searchParams);
  clonedSearchParams.set(optionName, optionValue);

  return (
    <Link
      {...props}
      preventScrollReset
      prefetch="intent"
      replace
      to={`${path}?${clonedSearchParams.toString()}`}
    >
      {children ?? optionValue}
    </Link>
  );
}

function ProductDetail({title, content, learnMore}) {
  return (
    <>
      <Text size="lead" as="h3" className={'flex items-center gap-[20px] relative text-[#2380B1] !text-[20px] font-["Open_Sans"] font-semibold mb-[20px]'}>
        {title}
        <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
      </Text>
      <div className='tab-content'>
        <div
          className="w-full font-['Open_Sans'] text-[13px] text-[#2380B1] leading-[1.2]"
          dangerouslySetInnerHTML={{__html: content}}
        />
        {learnMore && (
          <div className="">
            <Link
              className="pb-px border-b border-primary/30 text-primary/50"
              to={learnMore}
            >
              Learn more
            </Link>
          </div>
        )}
      </div>
      {/* <Disclosure key={title} as="div" className="grid w-full gap-2">
        {({open}) => (
          <>
            <Disclosure.Button className="text-left">
              <div className="flex justify-between">
                <Text size="lead" as="h4">
                  {title}
                </Text>
                <IconClose
                  className={clsx(
                    'transition-transform transform-gpu duration-200',
                    !open && 'rotate-[45deg]',
                  )}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{__html: content}}
              />
              {learnMore && (
                <div className="">
                  <Link
                    className="pb-px border-b border-primary/30 text-primary/50"
                    to={learnMore}
                  >
                    Learn more
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure> */}
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      collections(first:1) {
        edges {
          node {
            id,
            handle,
         }
      }
    }
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      aico_navigation_menu: metafield(namespace: "aico_metafields", key: "aico_navigation_menu") {
        value
      }
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

async function getRecommendedProducts(storefront, productId) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}
