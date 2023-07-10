import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import { Link } from './Link';


export function CtaBanner({banner}) {
  return (
    <section className={`cta-banner-section py-[15px]`}>
      <div className="container">
      <Link to={'/'} className="relative block">
        <div className="img-wrap before:hover:border-[4px] before:border-[#cc5060] before:absolute before:inset-0 before:w-full before:h-full">
          
          <Image 
             className="max-w-full w-full h-auto"
             data={banner?.reference?.image}
             alt={banner?.reference?.alt}
          />
          
        </div>
        </Link>
      </div>
    </section>
  );
}
