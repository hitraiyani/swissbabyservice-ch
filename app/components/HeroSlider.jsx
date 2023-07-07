import {Autoplay, Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {IconArrowRight,IconChevronRight, Link} from '~/components';
/**
 * Hero component that renders metafields attached to collection resources
 **/
export function HeroSlider({slides}) {
  const slideOne = slides[0] ? slides[0] : {};
  const slideTwo = slides[1] ? slides[1] : {};
 
  return (
    <section className="heroslider-section pt-[20px] md:pt-[30px] pb-[20px] md:pb-[30px] xl:pb-[40px] 2xl:pb-[50px]">
      <div className="container">
        <div className="heroslider-wrap relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: '#swiper-button-next-heroslider',
              prevEl: '#swiper-button-prev-heroslider',
            }}
            loop={true}
            // autoplay={{
            //   delay: 5000,
            //   disableOnInteraction: false,
            // }}
            className='myswiper1'
          >
            { slides.map((slide,index) =>(
               <SwiperSlide key={index}>
               <div className="slide-item h-full">
                 <div className="slide-item-inner flex flex-col-reverse lg:flex-row overflow-hidden rounded-[30px] h-full">
                   <div className="content-left w-full lg:w-[40%]">
                     <div className="col-inner bg-[#E7EFFF] pt-[20px] lg:pt-[29px] pb-[20px] lg:pb-[37px] px-[30px] lg:px-[70px] flex flex-col h-full">
                       <div className="brand-logo w-full pb-[50px] xl:pb-[95px] relative overflow-hidden">
                         {/* <img
                           className="w-full h-full block object-contain absolute inset-0 object-left-top"
                           src={slide?.sub_image?.reference?.image?.url}
                           alt=""
                         /> */}
                       </div>
                       <h2 className="title mt-[25px] 2xl:mt-[43px] text-[#00A49B] text-[25px] leading-[1] font-semibold">
                         {slide?.heading?.value}
                       </h2>
                       <div className="subtitle mt-[5px] mb-[10%] xl:mb-[17%] 2xl:mb-[27%] text-[#00A49B] leading-[1.2] text-[18px]">
                         {slide?.sub_heading?.value}
                       </div>
                       <div className="btn-wrap flex mt-auto">
                       <Link
                           to={slide?.cta_redirect?.value}
                           className='leading-none w-fit flex items-center justify-center text-center gap-[10px] text-[#00A49B] font-["Open_Sans"] uppercase font-bold text-[12px] hover:opacity-70 transition-all duration-500'
                         >
                           <span className="name">{slide?.cta_label?.value}</span>
                           <span className="icon">
                             <IconArrowRight className={'w-[22px] h-[12px]'} />
                           </span>
                         </Link>
                       </div>
                     </div>
                   </div>
                   <div className="img-col w-full lg:w-[60%]">
                     <div className="col-inner h-full">
                       <div className="img-wrap h-full relative overflow-hidden pb-[40%] lg:pb-0">
                         <img
                           className="absolute w-full inset-0 h-full object-cover object-left-top"
                           src={slide?.main_image?.reference?.image?.url}
                           alt=""
                         />
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </SwiperSlide>
            ))
          }
            
          </Swiper>
          <div
            id="swiper-button-prev-heroslider"
            className="absolute left-[-20px] md:left-[-36px] top-1/2 translate-y-[-130%] md:translate-y-[-30%] min-[992px]:translate-y-[20%] lg:-translate-y-1/2 w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          ><IconChevronRight className={'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] rotate-[180deg] relative left-[-1px]'} /></div>
          <div
            id="swiper-button-next-heroslider"
            className="absolute right-[-20px] md:right-[-36px] top-1/2 translate-y-[-130%] md:translate-y-[-30%] min-[992px]:translate-y-[20%] lg:-translate-y-1/2 w-[50px] h-[50px] xl:w-[73px] xl:h-[73px] bg-[#1C5F7B] rounded-[100px] z-[1] text-white hover:opacity-70 transition-all duration-500 flex items-center justify-center"
          ><IconChevronRight className={'w-[20px] h-[20px] xl:w-[14px] xl:h-[27px] relative left-[3px]'} /></div>
        </div>
      </div>
    </section>
  );
}
