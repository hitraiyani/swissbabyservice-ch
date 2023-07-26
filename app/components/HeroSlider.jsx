import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconArrowRight, IconChevronRight, Link} from '~/components';
import {useEffect} from 'react';
/**
 * Hero component that renders metafields attached to collection resources
 **/
export function HeroSlider({slides, ballon}) {
  const slideOne = slides[0] ? slides[0] : {};
  const slideTwo = slides[1] ? slides[1] : {};
  const ballons = ballon['nodes'] ? ballon['nodes'][0] : {};

  useEffect(() => {
    window.addEventListener('scroll', function (e) {
      parallaxScroll();
    });

    function parallaxScroll() {
      if (true) {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        document.querySelector('.baloon-1').style.marginTop =
          0 + scrolled * 0.09 + 'px';
        document.querySelector('.baloon-1').style.marginLeft =
          0 - scrolled * 0.1 + 'px';
        document.querySelector('.baloon-2').style.marginTop =
          0 - scrolled * 0.15 + 'px';
        document.querySelector('.baloon-2').style.marginRight =
          0 + scrolled * 0.05 + 'px';
        document.querySelector('.baloon-3').style.marginTop =
          0 - scrolled * 0.05 + 'px';
        document.querySelector('.baloon-3').style.marginLeft =
          0 + scrolled * 0.02 + 'px';
        document.querySelector('.baloon-4').style.marginTop =
          0 - scrolled * 0.13 + 'px';
        document.querySelector('.baloon-4').style.marginRight =
          0 - scrolled * 0.13 + 'px';
        document.querySelector('.baloon-5').style.marginTop =
          0 + scrolled * 0.2 + 'px';
        document.querySelector('.baloon-5').style.marginRight =
          0 + scrolled * 0.09 + 'px';
        document.querySelector('.baloon-6').style.marginTop =
          0 - scrolled * 0.35 + 'px';
        document.querySelector('.baloon-6').style.marginRight =
          0 + scrolled * 0.1 + 'px';
      }
    }
  }, []);

  return (
    <section className="heroslider-section relative">
      <div className="relative w-full">
        <div className="heroslider-wrap relative">
          <Swiper
            modules={[
              Autoplay,
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              EffectFade,
            ]}
            spaceBetween={10}
            slidesPerView={1}
            effect={'fade'}
            // navigation={{
            //   nextEl: '#swiper-button-next-heroslider',
            //   prevEl: '#swiper-button-prev-heroslider',
            // }}
            loop={true}
            autoHeight={false}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            breakpoints={{
              0: {
                autoHeight: true,
              },
              992: {
                autoHeight: false,
              },
            }}
            className="myswiper1"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-item h-full pt-[114px] pb-[140px] bg-[#D1E7FC] relative overflow-hidden min-h-[670px]">
                  {/* <div className="bg-img absolute w-full h-full inset-0 z-[-1]">
                    <img
                      className="w-full h-full object-cover"
                      src={slide?.background?.reference?.image?.url}
                      alt=""
                    />
                  </div> */}
                  <div className="container h-full">
                    <div className="slide-item-inner items-center rounded-[30px] h-full z-[1] relative">
                      <div className="content-left w-full relative z-[1] max-w-[600px] h-full">
                        <div className="col-inner flex flex-col h-full text-left">
                          <h2 className="title text-[75px] font-bold text-[#1F6B8F] leading-none">
                            {slide?.heading?.value}
                          </h2>
                          <div className="subtitle text-[32px] font-normal text-[#05557B]">
                            {slide?.sub_heading?.value}
                          </div>
                          <div className="btn-wrap flex mt-[37px] justify-center min-[992px]:justify-start">
                            <Link
                              to={slide?.cta_redirect?.value}
                              className="bg-[#05557B] text-white py-[17px] px-[73px] text-[26px] leading-none font-semibold rounded-[37px] hover:opacity-70 transition-all duration-500"
                            >
                              <span className="name">
                                {slide?.cta_label?.value}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="img-col w-full">
                        {/* <img
                          className="pro-img absolute"
                          src={slide?.main_image?.reference?.image?.url}
                          alt=""
                        /> */}
                         <img
                          className="pro-img-1 absolute max-w-[760px] h-auto top-[-40px] left-1/2 -translate-x-1/2"
                          src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/Pingo_Pinguin_Eisplatte-1_1.png?v=1690352725"
                          alt=""
                        />
                        <img
                          className="pro-logo absolute right-0 bottom-0 max-w-[191px] h-auto"
                          src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/myClimate_Logo_Head-Office_klimaneutral_en-removebg-preview_1.png?v=1690352723"
                          alt=""
                        />
                        <img
                          className="pro-img-2 absolute right-[100px] top-[-164px] max-w-[520px]"
                          src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/pingo_logo_1.png?v=1690352724"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className='bottom-round-box w-[100%] h-[2160px] rounded-full bg-[#ECF0F4] absolute top-[70%]'></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div
          id="swiper-button-prev-heroslider"
          className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[40px] h-[45px] z-[1] transition-all duration-500 flex items-center justify-center"
        >
          <img
            className="w-full h-full object-contain"
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/left-a.png?v=1688967073"
            alt=""
          />
        </div>
        <div
          id="swiper-button-next-heroslider"
          className="absolute right-[20px] top-1/2 -translate-y-1/2 w-[40px] h-[45px] z-[1] transition-all duration-500 flex items-center justify-center"
        >
          <img
            className="w-full h-full object-contain"
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/right-a.png?v=1688967073"
            alt=""
          />
        </div> */}
      </div>
      <div className="bz-baloons-container hidden min-[992px]:block !hidden">
        {ballons && (
          <div className="baloon-1">
            <img src={ballons?.balloon_1?.reference?.image?.url} alt="" />
          </div>
        )}
        {ballons && (
          <div className="baloon-2">
            <img src={ballons?.balloon_2?.reference?.image?.url} alt="" />
          </div>
        )}
        {ballons && (
          <div className="baloon-3">
            <img src={ballons?.balloon_3?.reference?.image?.url} alt="" />
          </div>
        )}
        {ballons && (
          <div className="baloon-4">
            <img src={ballons?.balloon_4?.reference?.image?.url} alt="" />
          </div>
        )}
        {ballons && (
          <div className="baloon-5">
            <img src={ballons?.balloon_5?.reference?.image?.url} alt="" />
          </div>
        )}
        {ballons && (
          <div className="baloon-6">
            <img src={ballons?.balloon_6?.reference?.image?.url} alt="" />
          </div>
        )}

        {/* <div className="baloon-1">
          <img
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-1-de.png?v=1688968486"
            alt=""
          />
        </div>
        <div className="baloon-2">
          <img
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-2-de.png?v=1688968485"
            alt=""
          /> 
        </div> */}
        {/* <div className="baloon-3">
          <img
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-3-de.png?v=1688968485"
            alt=""
          />
        </div> */}
        {/* <div className="baloon-4">
          <img
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-4-de.png?v=1688968485"
            alt=""
          />
        </div>
        <div className="baloon-5">
          <img
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-5-de.png?v=1688968486"
            alt=""
          />
        </div>
        <div className="baloon-6">
          <img
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-6-de.png?v=1688968485"
            alt=""
          />
        </div> */}
      </div>
    </section>
  );
}
