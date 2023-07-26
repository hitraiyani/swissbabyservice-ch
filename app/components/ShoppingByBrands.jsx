import {useEffect, useState} from 'react';
import {AICO_API_URL, AICO_API_TOKEN, STORE_LOCALE} from '~/lib/const';
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y, 
  EffectFade,
} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Link} from '~/components';
import {translate} from '~/lib/utils';

export function ShoppingByBrands({className, locale}) {
  const [brandData, setbrandData] = useState([]);

  const loadBrandData = async () => {
    const brandResponse = await fetch(
      `${AICO_API_URL}brands?filter[isTopBrand]=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AICO_API_TOKEN}`,
        },
      },
    );
    const brandResponseData = await brandResponse.json();
    setbrandData(brandResponseData.data);
  };

  useEffect(() => {
    loadBrandData();
  }, []);

  return (
    <section
      className={`${className} shopping-by-brands-section py-[30px] md:py-[40px] xl:py-[60px] 2xl:py-[90px]`}
    >
      <div className="container">
        <div className="title-wrap">
          <h2 className="text-center text-[24px] lg:text-[28px] xl:text-[38px] 2xl:text-[48px] font-bold text-[#05557B] mb-[20px] lg:mb-[34px] xl:mb-[54px] 2xl:mb-[74px]">
            {translate('shop_by_brand', locale)}
            {/* <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span> */}
          </h2>
        </div>
        <div className="logo-lists-wrap">
          <div className="logo-list flex flex-wrap gap-x-[20px] gap-y-[20px] justify-center">
            {/* <Swiper
              modules={[
                Autoplay,
                Navigation,
                Pagination,
                Scrollbar,
                A11y,
                EffectFade,
              ]}
              spaceBetween={24}
              slidesPerView={'auto'}
              // autoplay={{
              //   delay: 5000,
              //   disableOnInteraction: false,
              // }}
              className="shopping-by-brands-slider"
            > */}
              {brandData?.map((item, index) => {
                let brandImage = '';
                let brandRedirectUrl = '';
                if (item?.attributes?.translations != null) {
                  const itemTrans = item?.attributes?.translations;
                  for (var nc = 0; nc < itemTrans.length; nc++) {
                    if (itemTrans[nc].locale == STORE_LOCALE) {
                      brandImage = itemTrans[nc].image;
                      brandRedirectUrl = itemTrans[nc].videoUrl;
                      var prefix = 'http://';
                      if (
                        brandRedirectUrl &&
                        brandRedirectUrl.substr(0, prefix.length) !== prefix
                      ) {
                        brandRedirectUrl = prefix + brandRedirectUrl;
                      }
                    }
                  }
                }
                return (
                  <div key={index} className="relative h-[62px] md:h-[145px] w-[124px] md:w-[207px] overflow-hidden">
                    <Link
                      to={'/'}
                      className="w-full h-full absolute inset-0"
                    >
                      <img
                        className="w-full h-full object-contain transition-all duration-500 absolute inset-0 p-[5px]"
                        src={brandImage}
                        alt=""
                      />
                    </Link>
                  </div>
                );
              })}
            {/* </Swiper> */}
          </div>
        </div>
      </div>
    </section>
  );
}
