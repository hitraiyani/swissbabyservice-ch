import clsx from 'clsx';
import {useRef} from 'react';
import {useScroll} from 'react-use';
import {flattenConnection, Image, Money} from '@shopify/hydrogen';
import {useFetcher} from '@remix-run/react';

import {
  Button,
  Heading,
  IconRemove,
  Text,
  Link,
  FeaturedProducts,
  Iconclose2,
} from '~/components';
import {getInputStyleClasses} from '~/lib/utils';
import {CartAction} from '~/lib/type';

export function Cart({layout, onClose, cart}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);

  return (
    <>
      <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
    </>
  );
}

export function CartDetails({layout, cart}) {
  // @todo: get optimistic cart cost
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  const container = {
    drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
    page: 'w-full pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  return (
    <div className="mt-[38px]">
      <CartLines lines={cart?.lines} layout={layout} />
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          <CartDiscounts discountCodes={cart.discountCodes} />
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );
}

/**
 * Temporary discount UI
 * @param discountCodes the current discount codes applied to the cart
 * @todo rework when a design is ready
 */
function CartDiscounts({discountCodes}) {
  const codes = discountCodes?.map(({code}) => code).join(', ') || null;

  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes ? 'grid' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Discount(s)</Text>
          <div className="flex items-center justify-between">
            <UpdateDiscountForm>
              <button>
                <IconRemove
                  aria-hidden="true"
                  style={{height: 18, marginRight: 4}}
                />
              </button>
            </UpdateDiscountForm>
            <Text as="dd">{codes}</Text>
          </div>
        </div>
      </dl>

      {/* No discounts, show an input to apply a discount */}
      <UpdateDiscountForm>
        <div
          className={clsx(
            codes ? 'hidden' : 'flex',
            'items-center gap-4 justify-between text-copy',
          )}
        >
          <input
            className={getInputStyleClasses()}
            type="text"
            name="discountCode"
            placeholder="Discount code"
          />
          <button className="flex justify-end font-medium whitespace-nowrap">
            Apply Discount
          </button>
        </div>
      </UpdateDiscountForm>
    </>
  );
}

function UpdateDiscountForm({children}) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.UPDATE_DISCOUNT}
      />
      {children}
    </fetcher.Form>
  );
}

function CartLines({layout = 'drawer', lines: cartLines}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const className = clsx([
    y > 0 ? 'border-t' : '',
    layout === 'page'
      ? 'flex-grow'
      : 'px-6 pb-6 sm-max:pt-2 overflow-auto transition md:px-12',
  ]);

  return (
    <section
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className={className}
    >
      <div className="section-title flex items-center gap-[20px] mb-[35px]">
        <h1 className='text-[30px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
          Warenkorb
        </h1>
        <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
      </div>
      <ul className="flex flex-col">
        <li className="flex bg-[#92BCDC] [&>*:first-child]:border-l-0">
          <div className="p-[10px] border-l-[1px] border-white text-white text-center Bild w-[100px]">
            Bild
          </div>
          <div className="p-[10px] border-l-[1px] border-white text-white text-left Name flex-1">
            Name
          </div>
          <div className="p-[10px] border-l-[1px] border-white text-white text-left Menge w-[130px]">
            Menge
          </div>
          <div className="p-[10px] border-l-[1px] border-white text-white text-right Einzelpreis w-[130px]">
            Einzelpreis
          </div>
          <div className="p-[10px] border-l-[1px] border-white text-white text-right TotalBetrag w-[130px]">
            Total Betrag
          </div>
          <div className="p-[10px] border-l-[1px] border-white text-white text-center remove-btn w-[70px]"></div>
        </li>
        {currentLines.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
      </ul>
    </section>
  );
}

function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex flex-col mt-2">
      <a href={checkoutUrl} target="_self">
        <Button as="span" width="full">
          Continue to Checkout
        </Button>
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({cost, layout, children = null}) {
  const summary = {
    drawer: 'grid gap-4 p-6 border-t md:px-12',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full',
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className="cart-footer pt-[30px]"
    >
      <div className="flex flex-row gap-[30px]">
        <div className="col-left flex-1">
          <div className="section-title flex items-center gap-[20px] mb-[35px]">
            <h3 className='text-[25px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
              Nächster Schritt
            </h3>
            <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
          </div>
          <div className='desc text-[13px] font-["Open_Sans"] text-[#2380B1]'>
            <p>
              Eine der nachstehenden Möglichkeiten auswählen, oder zur Kassa
              gehen
            </p>
          </div>
          {/* {children} */}
        </div>
        <div className="col-right flex-1">
          <ul className='flex gap-[20px] border-b-[1px] border-[#92bcdc] p-[10px] items-center font-semibold text-[#2380b1]'>
            <li className='flex-1 text-right text-[16px]'>Zwischensumme:</li>
            <li className='w-[150px] text-right text-[#9a2ea3] text-[25px] font-["opensans"] font-normal'>CHF 00.00</li>
          </ul>
          <ul className='flex gap-[20px] border-b-[1px] border-[#92bcdc] p-[10px] items-center font-semibold text-[#2380b1]'>
            <li className='flex-1 text-right text-[16px]'>Enthaltene MwSt. 7.7%:</li>
            <li className='w-[150px] text-right text-[#9a2ea3] text-[25px] font-["opensans"] font-normal'>CHF 00.00</li>
          </ul>
          <ul className='flex gap-[20px] border-b-[1px] border-[#92bcdc] p-[10px] items-center font-semibold text-[#2380b1]'>
            <li className='flex-1 text-right text-[16px]'>Gesamtsumme:</li>
            <li className='w-[150px] text-right'>
              <Text as="dd" data-test="subtotal" className={'text-[#9a2ea3] !text-[25px] font-["opensans"] font-normal'}>
                {cost?.subtotalAmount?.amount ? (
                  <Money data={cost?.subtotalAmount} />
                ) : (
                  '-'
                )}
              </Text>
            </li>
          </ul>
        </div>
      </div>
      {/* <h2 id="summary-heading" className="sr-only">
        Order summary
      </h2>
      <dl className="grid">
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Subtotal</Text>
          <Text as="dd" data-test="subtotal">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
      </dl> */}
    </section>
  );
}

function CartLineItem({line}) {
  if (!line?.id) return null;

  const {id, quantity, merchandise} = line;

  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <li key={id} className="flex items-center border-b-[1px] border-[#92bcdc]">
      <div className="w-[100px] flex items-center justify-center img-col p-[10px]">
        {merchandise.image && (
          <Image
            width={57}
            height={57}
            data={merchandise.image}
            className="object-cover object-center w-[57px] h-[57px] rounded-[4px] border-[#dee2e6] border-[1px] p-[4px] bg-white block"
            alt={merchandise.title}
          />
        )}
      </div>
      <div className="name-col flex-1 p-[10px]">
        <Heading as="h3" className="text-[16px] font-normal text-[#2380b1]">
          {merchandise?.product?.handle ? (
            <Link to={`/products/${merchandise.product.handle}`}>
              {merchandise?.product?.title || ''}
            </Link>
          ) : (
            <Text>{merchandise?.product?.title || ''}</Text>
          )}
        </Heading>
      </div>
      <div className="qty-col w-[130px] p-[10px]">
        <div className="qty-inner w-[106px] mx-auto">
          <CartLineQuantityAdjust line={line} />
        </div>
      </div>
      <div className="unit-price-col w-[130px] p-[10px] text-right">
        <Text className={'text-[#9a2ea3] text-[25px] font-["OpenSans"]'}>
          <CartLinePrice line={line} as="span" />
        </Text>
      </div>
      <div className="price-col w-[130px] p-[10px] text-right">
        <Text className={'text-[#9a2ea3] text-[25px] font-["OpenSans"]'}>
          <CartLinePrice line={line} as="span" />
        </Text>
      </div>
      <div className="remove-btn-col w-[70px] p-[10px]">
        <div className="remove-btn-inner">
          <ItemRemoveButton lineIds={[id]} />
        </div>
      </div>
      {/* <div className="flex justify-between flex-grow">
        <div className="grid gap-2">
          <div className="grid pb-2">
            {(merchandise?.selectedOptions || []).map((option) => (
              <Text color="subtle" key={option.name}>
                {option.name}: {option.value}
              </Text>
            ))}
          </div>
        </div>
      </div> */}
    </li>
  );
}

function ItemRemoveButton({lineIds}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.REMOVE_FROM_CART}
      />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button
        className="flex items-center justify-center w-[34px] h-[27px] mx-auto rounded-[4px] p-[4px] py-[4px] text-[#dc3545] border-[1px] border-[#dc3545] hover:bg-[#dc3545] hover:text-white transition-all duration-500"
        type="submit"
      >
        <Iconclose2 className="w-full h-full" />
      </button>
    </fetcher.Form>
  );
}

function CartLineQuantityAdjust({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center border rounded bg-white">
        <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:text-primary/10 font-bold"
            value={prevQuantity}
            disabled={quantity <= 1}
          >
            <span>&#8722;</span>
          </button>
        </UpdateCartButton>

        <div className="px-2 text-center" data-test="item-quantity">
          {quantity}
        </div>

        <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            className="w-10 h-10 transition text-primary/50 hover:text-primary  font-bold"
            name="increase-quantity"
            value={nextQuantity}
            aria-label="Increase quantity"
          >
            <span>&#43;</span>
          </button>
        </UpdateCartButton>
      </div>
    </>
  );
}

function UpdateCartButton({children, lines}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.UPDATE_CART} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {children}
    </fetcher.Form>
  );
}

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}

export function CartEmpty({hidden = false, layout = 'drawer', onClose}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const container = {
    drawer: clsx([
      'content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12',
      y > 0 ? 'border-t' : '',
    ]),
    page: clsx([
      hidden ? '' : 'grid',
      `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
    ]),
  };

  return (
    <div ref={scrollRef} className="cartEmpty" hidden={hidden}>
      <section className="mt-[48px]">
        <div className="section-title flex items-center gap-[20px] mb-[35px]">
          <h1 className='text-[30px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
            Warenkorb
          </h1>
          <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
        </div>
        <Text className={'text-[13px] font-["Open_Sans"] text-[#2380B1]'}>
          Warenkorb ist noch leer
        </Text>
        <div>
          <Button
            onClick={onClose}
            className="border-[#9a2ea3] border-[2px] rounded-[5px] text-[#9a2ea3] text-[16px] px-[15px] py-[10px] leading-none hover:bg-[#9a2ea3] hover:text-white mt-[15px] transition-all duration-500"
          >
            Weiter
          </Button>
        </div>
      </section>
      {/* <section className="grid gap-8 pt-16">
        <FeaturedProducts
          count={4}
          heading="Shop Best Sellers"
          layout={layout}
          onClose={onClose}
          sortKey="BEST_SELLING"
        />
      </section> */}
    </div>
  );
}
