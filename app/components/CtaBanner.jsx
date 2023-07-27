import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import { Link } from './Link';


export function CtaBanner({banner}) {
  return (
    <section className={`cta-banner-section py-[15px] `} >
      <div className="container">
        <div className="relative flex flex-col md:flex-row lg:flex-row bg-[#D1E7FC] rounded-[30px] ">
          <div className='w-[100%] md:w-[60%] lg:w-[60%] xl:w-[60%] pl-[30px] md-[50px] xl:pl-[75px] pt-[30px] md:pt-[50px] xl:pt-[80px] pb-[30px] md:pb-[50px] xl:pb-[90px] pr-[20px] flex flex-col items-center md:items-start lg:items-start'>
                <h4 className="title text-[36px] md:text-[50px] lg:text-[75px] text-[#1F6B8F] font-bold  mt-[0px] w-100">
                Gutschein kaufen
                  </h4>
                  <p className="text-[20px] md:text-[24px] xl:text-[32px] text-[#1F6B8F]  font-normal leading-[35px] w-100 mb-[20px]">
                  Weil Schenken Freude macht!
                  </p>

                  <a
                    className="btn text-white text-[20px]  font-bold w-auto max-w-max leading-none py-[15px] px-[20px] bg-[#05557B] rounded-[40px] hover:opacity-70 transition-all duration-500"
                    href="/collections/windelnundreinigungswaren"
                    to="Mehr erfahren"
                  >
                   Mehr erfahren
                  </a>
          </div>
          <div className="img-wrap w-[100%] md:w-[40%] lg:w-[40%] xl:w-[40%] items-end flex">
            
            <Image 
              className="w-auto max-w-max	ml-auto mr-auto mt-0 mb-0 h-auto lg:min-w-[350px] xl:min-w-[490px]"
              data={banner?.reference?.image}
              alt={banner?.reference?.alt}
            />
            
          </div>
        </div>
      </div>
    </section>
  );
}
