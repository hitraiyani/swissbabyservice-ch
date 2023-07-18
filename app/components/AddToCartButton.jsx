import {Links, NavLink, useFetcher, useMatches} from '@remix-run/react';

import {Button, Link} from '~/components';
import {CartAction} from '~/lib/type';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { translate } from '~/lib/utils';
import { toHTML } from '../lib/utils';




export function AddToCartButton({
  children,
  lines,
  className = '',
  variant = 'primary',
  width = 'full',
  disabled,
  analytics,
  locale="",
  productLink,
  ...props
}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const fetcherIsNotIdle = fetcher.state !== 'idle';
  const MySwal = withReactContent(Swal)
 
   if(fetcher?.state == 'submitting'){
     
      console.log(analytics?.products[0]);
      // const handledata = <Links to={`/products/${analytics?.products[0].handle}`}  prefetch="intent">{analytics?.products[0].name}</Links>;
      // console.log(handledata);
    MySwal.fire({
      //title: <strong>Good job!</strong>,
      html: <><i> {translate("you_added",locale)} </i><a href={productLink}>{analytics?.products[0].name}</a>{translate("to_your",locale) } <a href='/cart'>{translate("shoppin_cart",locale)}</a> </>,
      icon: 'success'
    })
   }

  return (
    <fetcher.Form action="/cart" method="post" className='w-full'>
      <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
      <input type="hidden" name="countryCode" value={selectedLocale.country} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
      <Button
        as="button"
        type="submit"
        width={width}
        variant={variant}
        className={className}
        disabled={disabled ?? fetcherIsNotIdle}
        {...props}
      >
        {children}
      </Button>
    </fetcher.Form>
  );
}
