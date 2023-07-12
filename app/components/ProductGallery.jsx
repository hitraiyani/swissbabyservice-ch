import {ATTR_LOADING_EAGER} from '~/lib/const';
import React, {useEffect, useState} from 'react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
  Controller,
} from 'swiper';
import {Link} from '~/components';
import {Swiper, SwiperSlide} from 'swiper/react';
import {MediaFile} from '@shopify/hydrogen';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({media, dicountedPr, className}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!media.length) {
    return null;
  }
  let thumbsParams = {
    modules: [Controller],
    slideToClickedSlide: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    onSwiper: setThumbsSwiper, // Get swiper instance callback
    style: {
      width: '100px',
    },
  };

  return (
    <div className={` ${className}`}>
      <div className="slider__flex flex flex-col">
        <div className="slider__images w-full border-b-[1px] border-[#eee]">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
            thumbs={{swiper: thumbsSwiper}}
            spaceBetween={30}
            loop={true}
            onSwiper={(swiper) => {}}
          >
            {media.map((med, i) => {
              let mediaProps = {};
              const data = {
                ...med,
                image: {
                  // @ts-ignore
                  ...med.image,
                  altText: med.alt || 'Product image',
                },
              };

              switch (med.mediaContentType) {
                case 'IMAGE':
                  mediaProps = {
                    width: 800,
                    widths: [400, 800, 1200, 1600, 2000, 2400],
                  };
                  break;
                case 'VIDEO':
                  mediaProps = {
                    width: '100%',
                    autoPlay: true,
                    controls: false,
                    muted: true,
                    loop: true,
                    preload: 'auto',
                  };
                  break;
                case 'EXTERNAL_VIDEO':
                  mediaProps = {width: '100%'};
                  break;
                case 'MODEL_3D':
                  mediaProps = {
                    width: '100%',
                    interactionPromptThreshold: '0',
                    ar: true,
                    loading: ATTR_LOADING_EAGER,
                    disableZoom: true,
                  };
                  break;
              }

              if (i === 0 && med.mediaContentType === 'IMAGE') {
                mediaProps.loading = ATTR_LOADING_EAGER;
              }

              return (
                <SwiperSlide key={i}>
                  <div
                    className="pb-[100%] overflow-hidden relative bg-white"
                    // @ts-ignore
                    key={med.id || med.image.id}
                  >
                    {/* TODO: Replace with MediaFile when it's available */}

                    <MediaFile
                      tabIndex="0"
                      className={`w-full h-full absolute fadeIn object-contain p-[10px] inset-0`}
                      data={data}
                      sizes={
                        '(min-width: 64em) 30vw, (min-width: 48em) 25vw, 90vw'
                      }
                      // @ts-ignore
                      options={{
                        crop: 'center',
                        scale: 2,
                      }}
                      {...mediaProps}
                    />
                    {dicountedPr != 0 && (
                      <div className="sale-label bg-[#9a2ea3] text-white p-[5px] leading-none uppercase text-[13px] absolute left-0 top-0 z-[1]">
                        <span>sale-{dicountedPr}%</span>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="slider__col w-[calc(100%_+_1px)] ">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Navigation, Thumbs]}
            direction="horizontal"
            spaceBetween={0}
            centeredSlides="false"
            centeredSlidesBounds="true"
            slidesPerView={3}
            watchOverflow="true"
            watchslidesvisibility="true"
            watchSlidesProgress="true"
            className="swiper-container1" 
            navigation
            loop={true}
            breakpoints={{
              0: {
                direction: 'horizontal',
              },
              768: {
                direction: 'horizontal',
              },
            }}
          >
            {media.map((med, i) => {
              let mediaProps = {};
              const isFirst = i === 0;
              const data = {
                ...med,
                image: {
                  // @ts-ignore
                  ...med.image,
                  altText: med.alt || 'Product image',
                },
              };

              switch (med.mediaContentType) {
                case 'IMAGE':
                  mediaProps = {
                    width: 800,
                    widths: [400, 800, 1200, 1600, 2000, 2400],
                  };
                  break;
                case 'VIDEO':
                  mediaProps = {
                    width: '100%',
                    autoPlay: true,
                    controls: false,
                    muted: true,
                    loop: true,
                    preload: 'auto',
                  };
                  break;
                case 'EXTERNAL_VIDEO':
                  mediaProps = {width: '100%'};
                  break;
                case 'MODEL_3D':
                  mediaProps = {
                    width: '100%',
                    interactionPromptThreshold: '0',
                    ar: true,
                    loading: ATTR_LOADING_EAGER,
                    disableZoom: true,
                  };
                  break;
              }

              if (i === 0 && med.mediaContentType === 'IMAGE') {
                mediaProps.loading = ATTR_LOADING_EAGER;
              }

              return (
                <SwiperSlide key={i}>
                  <div
                    // @ts-ignore
                    key={med.id || med.image.id}
                    className="border-r-[1px] bg-white border-[#eee] relative pb-[100%]"
                  >
                    <MediaFile
                      tabIndex="0"
                      className={`w-full object-contain rounded-[10px] h-full cursor-pointer absolute inset-0 p-[10%]`}
                      data={data}
                      sizes={
                        '(min-width: 64em) 30vw, (min-width: 48em) 25vw, 90vw'
                      }
                      // @ts-ignore
                      options={{
                        crop: 'center',
                        scale: 2,
                      }}
                      {...mediaProps}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
