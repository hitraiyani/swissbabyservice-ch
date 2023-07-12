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
export function HeroSlider({slides}) {
  const slideOne = slides[0] ? slides[0] : {};
  const slideTwo = slides[1] ? slides[1] : {};

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
            navigation={{
              nextEl: '#swiper-button-next-heroslider',
              prevEl: '#swiper-button-prev-heroslider',
            }}
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
                <div className="slide-item h-full pt-[30px] pb-[30px]">
                  <div className="bg-img absolute w-full h-full inset-0 z-[-1]">
                    <img
                      className="w-full h-full object-cover"
                      src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/Slide-2.jpg?v=1688966228"
                      alt=""
                    />
                  </div>
                  <div className="container max-[1279px]:max-w-[760px]">
                    <div className="slide-item-inner flex gap-y-[30px] flex-col min-[992px]:flex-row items-center overflow-hidden rounded-[30px] h-full z-[1] relative">
                      <div className="content-left w-full min-[992px]:w-[40%] lg:w-[50%]">
                        <div className="col-inner flex flex-col h-full text-center min-[992px]:text-left">
                          <h2 className="title text-[#00989e] text-[20px] leading-[1.2] font-['Open_Sans'] font-bold tracking-[2px]">
                            {slide?.heading?.value}
                          </h2>
                          <div className="subtitle text-[#00989e] text-[20px] leading-[1.2] tracking-[2px] font-['Open_Sans']">
                            {slide?.sub_heading?.value}
                          </div>
                          <div className="btn-wrap flex mt-[30px] justify-center min-[992px]:justify-start">
                            <Link
                              to={slide?.cta_redirect?.value}
                              className='leading-none w-fit flex items-center justify-center text-center gap-[10px]  font-["OpenSans"] uppercase text-[20px] h-[50px] min-w-[200px] border-[2px] border-[#2380b1] rounded-[8px] text-[#2380b1] hover:bg-[#2380b1] hover:text-white transition-all duration-700'
                            >
                              <span className="name">
                                {slide?.cta_label?.value}
                              </span>
                              {/* <span className="icon">
                             <IconArrowRight className={'w-[22px] h-[12px]'} />
                           </span> */}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="img-col w-full min-[992px]:w-[60%] lg:w-[50%]">
                        <div className="col-inner h-full">
                          <div className="img-wrap relative overflow-hidden pb-[42%] min-[992px]:pb-[57%]">
                            <img
                              className="absolute w-full inset-0 h-full object-contain object-center"
                              src={slide?.main_image?.reference?.image?.url}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
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
        </div>
      </div>
      <div className="bz-baloons-container hidden min-[992px]:block">
        <div className="baloon-1">
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
        </div>
        <div className="baloon-3">
          <img
            src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-3-de.png?v=1688968485"
            alt=""
          />
        </div>
        <div className="baloon-4">
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
        </div>
      </div>
    </section>
  );
}
