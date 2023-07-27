import clsx from 'clsx';
import Slider from 'react-slick';
import {
  IconChevronRight,
  IconStar,
  AddToCartButton,
  Text,
  Link,
  IconCart3,
} from '~/components';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {
  discountedPer,
  isDiscounted,
  productTranslate,
  translate,
} from '~/lib/utils';
import {CompareAtPrice} from './CompareAtPrice';
import {DiscountPercentage} from './DiscountPercentage';

function SampleNextArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      onClick={onClick}
      id="swiper-button-next-new-in-Shop"
      className="absolute right-0 md:right-[-20px] top-1/2 -translate-y-1/2 w-[40px] h-[45px] z-[1] transition-all duration-500 flex items-center justify-center cursor-pointer"
    >
      <img
        className="w-full h-full object-contain"
        src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/right-a.png?v=1688967073"
        alt=""
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      onClick={onClick}
      id="swiper-button-prev-new-in-Shop"
      className="absolute left-0 md:left-[-20px] top-1/2 -translate-y-1/2 w-[40px] h-[45px] z-[1] transition-all duration-500 flex items-center justify-center cursor-pointer"
    >
      <img
        className="w-full h-full object-contain"
        src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/left-a.png?v=1688967073"
        alt=""
      />
    </div>
  );
}

export function Bestseller({products, title, locale}) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    nextArrow: false,
    prevArrow: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section
      className={`new-in-Shop-section pb-[20px] md:pb-[30px] xl:pb-[40px] 2xl:pb-[50px]`}
    >
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-[24px] lg:text-[32px] text-[#05557B] font-bold text-center mb-[46px]">
            {title}
            {/* <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span> */}
          </h2>
        </div>
        <div className="relative new-in-Shop-slider">
          <Slider {...settings} className="new-in-Shop-slider">
            {products.map((product, index) => {
              const firstVariant = flattenConnection(product?.variants)[0];

              if (!firstVariant) return null;
              const {image, price, compareAtPrice} = firstVariant;

              const productAnalytics = {
                productGid: product.id,
                variantGid: firstVariant.id,
                name: productTranslate(product, 'title', locale),
                variantName: firstVariant.title,
                brand: product.vendor,
                price: firstVariant.price.amount,
                quantity: 1,
              };

              return (
                <div key={index} className="h-full">
                  <div className="slide-item bg-white relative">
                    <div className="product-card">
                      <div className="product-card-inner">
                        <Link
                          to={`/products/${product.handle}`}
                          prefetch="intent"
                          className="img-link"
                        >
                          <div className="img-wrap relative overflow-hidden pb-[80%] mb-[10px] rounded-[30px] bg-[#D1E7FC]">
                            {image && (
                              <Image
                                className="absolute inset-0 object-contain w-full h-full transition-all duration-500 p-[20px]"
                                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                                data={image}
                                alt={
                                  image.altText || `Picture of ${product.title}`
                                }
                              />
                            )}
                            <div
                              className={`sale-label ${
                                isDiscounted(price, compareAtPrice)
                                  ? 'bg-[#EE603D]'
                                  : ''
                              }  text-white px-[7px] py-[15px] leading-none absolute right-0 top-[50%] z-[1] text-[20px] font-normal`}
                            >
                              {isDiscounted(price, compareAtPrice) && (
                                <>
                                  SALE
                                  <span>
                                    {discountedPer(price, compareAtPrice)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </Link>
                        <div className="flex flex-wrap items-start gap-[30px]">
                          <div className='flex-1'>
                            <h4 className="pro-name text-[18px] text-[#00334B] font-bold">
                              {productTranslate(product, 'title', locale)}
                              {/* {console.log(product)} */}
                            </h4>
                            {/* <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                        <IconStar className={'w-[17px] h-[15px]'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                        <IconStar className={'w-[17px] h-[15px] fill-black'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                      </div> */}
                            <div className="price text-[20px] text-[#00334B] mt-[8px] flex flex-wrap items-center gap-x-[5px] gap-y-[5px] leading-none font-normal">
                              {/* CHF 88.10 */}
                              {/* {isDiscounted(price, compareAtPrice) && 
                            console.log(product)
                            } */}

                              {isDiscounted(price, compareAtPrice) && (
                                <CompareAtPrice
                                  className={'!opacity-100 !text-[#00334B]'}
                                  data={compareAtPrice}
                                />
                              )}
                              {/* {isDiscounted(price, compareAtPrice) && (
                                <DiscountPercentage
                                  // className={'opacity-50'}
                                  price={price}
                                  compareAtPrice={compareAtPrice}
                                />
                              )} */}

                              {/* <span className="pd-price bg-[#b7d4e9] p-[5px] text-white">
                             {discountedPer(price, compareAtPrice)}
                          </span> */}
                              <span className="price-new price-old text-[#00334B]">
                                {/* CHF 71.35 */}
                                <Money withoutTrailingZeros data={price} />
                              </span>
                              {/* <Money withoutTrailingZeros data={price} />
                            {isDiscounted(price, compareAtPrice) && (
                              <CompareAtPrice
                                className={'opacity-50'}
                                data={compareAtPrice}
                              />
                            )} */}
                            </div>
                          </div>
                          <div className="addToCartButton-wrap w-[35px] h-[35px]">
                            <AddToCartButton
                              lines={[
                                {
                                  quantity: 1,
                                  merchandiseId: firstVariant.id,
                                },
                              ]}
                              variant="secondary"
                              locale={locale}
                              productLink={`/products/${product.handle}`}
                              analytics={{
                                products: [productAnalytics],
                                totalValue: parseFloat(productAnalytics.price),
                              }}
                              className='w-[33px] h-[33px] text-[#00334B] !p-0 border-none bg-transparent'
                            >
                              <IconCart3 className="w-full h-full" />
                              {/* <Text as="span" className="block !text-[20px]">
                                {translate('add_to_cart', locale)}
                              </Text> */}
                            </AddToCartButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
        <div className='btn-wrap flex justify-center mt-[20px] xl:mt-[40px] 2xl:mt-[60px]'>
          <a href="/collections/windelnundreinigungswaren" className='btn text-white text-[20px]  font-bold w-auto max-w-max leading-none py-[15px] px-[20px] bg-[#05557B] rounded-[40px] hover:opacity-70 transition-all duration-500'>All ansehen</a>
        </div>
      </div>
    </section>
  );
}
