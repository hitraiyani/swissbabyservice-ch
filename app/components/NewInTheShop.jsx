import clsx from 'clsx';
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {
  IconChevronRight,
  IconStar,
  AddToCartButton,
  Text,
  Link,
} from '~/components';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {discountedPer, isDiscounted, productTranslate, translate} from '~/lib/utils';
import {CompareAtPrice} from './CompareAtPrice';
import { DiscountPercentage } from './DiscountPercentage';

export function NewInTheShop({products, title, locale}) {
  return (
    <section
      className={`new-in-Shop-section py-[20px] md:py-[30px] xl:py-[40px] 2xl:py-[50px]`}
    >
      <div className="container">
        <div className="title-wrap mb-[22px]">
          <h2 className="text-[20px] font-medium text-left text-[#2380B1] flex items-center gap-[20px] mb-[40px] font-['Open_Sans']">
            {title}
            <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
          </h2>
        </div>
        <div className="relative new-in-Shop-slider">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={28}
            slidesPerView={4}
            navigation={{
              prevEl: '#swiper-button-prev-new-in-Shop',
              nextEl: '#swiper-button-next-new-in-Shop',
            }}
            // pagination={{
            //   clickable: true,
            // }}
            loop={true}
           
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1201: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            className="new-in-Shop-slider"
          >
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
                <SwiperSlide key={index}>
                  <div className="slide-item p-[15px] bg-white relative">
                    <div className="product-card">
                      <div className="product-card-inner">
                        <div className={`sale-label ${isDiscounted(price, compareAtPrice) ? "bg-[#9a2ea3]" : '' }  text-white p-[5px] leading-none uppercase text-[13px] absolute right-0 top-0 z-[1]`}> {(isDiscounted(price, compareAtPrice)) &&   (<>SALE <span>{discountedPer(price,compareAtPrice)}</span></> )}  </div>
                        <Link
                          to={`/products/${product.handle}`}
                          prefetch="intent"
                          className="img-link"
                        >
                          <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
                            {image && (
                              <Image
                                className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
                                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                                data={image}
                                alt={
                                  image.altText || `Picture of ${product.title}`
                                }
                              />
                            )}
                          </div>
                        </Link>
                        <h4 className="pro-name text-[13px] text-[#2380b1] font-normal pt-[20px]">
                          {productTranslate(product,'title',locale)}
                          {/* {console.log(product)} */}
                        </h4>
                        {/* <div className="rating flex gap-[6px] text-[#666666] mt-[12px]">
                        <IconStar className={'w-[17px] h-[15px]'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                        <IconStar className={'w-[17px] h-[15px] fill-black'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                        <IconStar className={'w-[17px] h-[15px]'} />
                      </div> */}
                        <div className="price text-[20px] text-black mt-[8px] flex flex-wrap items-center font-['OpenSans'] gap-x-[15px] gap-y-[10px] leading-none">
                          
                            {/* CHF 88.10 */}
                            {/* {isDiscounted(price, compareAtPrice) && 
                            console.log(product)
                            } */}
                            
                            {isDiscounted(price, compareAtPrice) && (
                              <CompareAtPrice
                                // className={'opacity-50'}
                                data={compareAtPrice}
                              />
                            )}
                              {isDiscounted(price, compareAtPrice) && (
                                 <DiscountPercentage
                                 // className={'opacity-50'}
                                 price={price}
                                 compareAtPrice={compareAtPrice}
                               />
                              )
                              }
                         
                          {/* <span className="pd-price bg-[#b7d4e9] p-[5px] text-white">
                             {discountedPer(price, compareAtPrice)}
                          </span> */}
                          <span className="price-new price-old text-[#9a2ea3]">
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
                        <div className="buy-now-btn flex flex-col gap-[15px] absolute top-1/2 -translate-y-1/2 left-0 w-full right-0 mx-auto p-[20px] h-full bg-[#dbd4e9f2] items-center justify-center">
                        
                          <button className='!p-[8.2px_16px] text-[20px] rounded-[5px] bg-transparent border-[2px] border-[#9a2ea3] text-[#9a2ea3] font-["OpenSans"] hover:bg-[#9a2ea3] hover:text-white leading-none transition-all duration-500 w-full'>
                          <Link
                          to={`/products/${product.handle}`}
                          prefetch="intent"
                         
                        >
                            <Text as="span" className="block !text-[20px]">
                              {translate("view_detail",locale)}
                            </Text>
                            </Link>
                          </button>
                         
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
                            className='!p-[8.2px_16px] text-[20px] rounded-[5px] bg-transparent border-[2px] border-[#9a2ea3] text-[#9a2ea3] font-["OpenSans"] hover:bg-[#9a2ea3] hover:text-white leading-none transition-all duration-500'
                          >
                            <Text as="span" className="block !text-[20px]">
                              {translate('add_to_cart', locale)}
                            </Text>
                          </AddToCartButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div
            id="swiper-button-prev-new-in-Shop"
            className="absolute left-0 md:left-[-20px] top-1/2 -translate-y-1/2 w-[40px] h-[45px] z-[1] transition-all duration-500 flex items-center justify-center"
          >
            <img
              className="w-full h-full object-contain"
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/left-a.png?v=1688967073"
              alt=""
            />
          </div>
          <div
            id="swiper-button-next-new-in-Shop"
            className="absolute right-0 md:right-[-20px] top-1/2 -translate-y-1/2 w-[40px] h-[45px] z-[1] transition-all duration-500 flex items-center justify-center"
          >
            <img
              className="w-full h-full object-contain"
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/right-a.png?v=1688967073"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
