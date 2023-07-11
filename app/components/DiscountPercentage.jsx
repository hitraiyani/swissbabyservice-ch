import clsx from 'clsx';
import {useMoney} from '@shopify/hydrogen';
import { discountedPer } from '~/lib/utils';

export function DiscountPercentage({price,compareAtPrice, className}) {
    // const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    //   useMoney(data);
  
    //const styles = clsx('strike text-[#777777] font-normal line-through !opacity-100', className);
    const styles = clsx('pd-price bg-[#b7d4e9] p-[5px] text-white', className);
  
    return (
      <span className={styles}>
          {discountedPer(price, compareAtPrice)}
      </span>
    );
  }