import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}) {
  let cardLabel;

  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <div className="product-card p-[15px] bg-white relative">
      <div className="product-card-inner"></div>
      <Text
        as="label"
        size="fine"
        className="sale-label bg-[#9a2ea3]  text-white p-[5px] leading-none uppercase text-[13px] absolute right-0 top-0 z-[1]"
      >
        {cardLabel}
      </Text>
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="intent"
        className="img-link"
      >
        <div className="img-wrap relative overflow-hidden pb-[100%] mb-[10px] rounded-[20px]">
          {image && (
            <Image
              className="absolute inset-0 object-contain w-full h-full transition-all duration-500"
              sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
              // aspectRatio="4/5"
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}
        </div>
      </Link>
      <Text
        className="pro-name !mt-0 !text-[13px] text-[#2380b1] font-normal pt-[20px]"
        as="h4"
      >
        {product.title}
      </Text>
      <div className="price text-[20px] text-black mt-[8px] flex flex-wrap items-center font-['OpenSans'] gap-x-[15px] gap-y-[10px] leading-none">
        {isDiscounted(price, compareAtPrice) && (
          <CompareAtPrice
            className={'price-old text-[#b7d4e9] line-through'}
            data={compareAtPrice}
          />
        )}
        <span className='pd-price bg-[#b7d4e9] p-[5px] text-white'>-24%</span>
        <Money
          withoutTrailingZeros
          data={price}
          className="price-new price-old text-[#9a2ea3]"
        />
      </div>
      <div className="buy-now-btn flex flex-col gap-[15px] absolute top-1/2 -translate-y-1/2 left-0 w-full right-0 mx-auto p-[20px] h-full bg-[#dbd4e9f2] items-center justify-center z-[2]">
        <button className='!p-[8.2px_16px] text-[20px] rounded-[5px] bg-transparent border-[2px] border-[#9a2ea3] text-[#9a2ea3] font-["OpenSans"] hover:bg-[#9a2ea3] hover:text-white leading-none transition-all duration-500 w-full'>
          <a href="#">
            <Text as="span" className="block !text-[20px]">
              Artikel ansehen
            </Text>
          </a>
        </button>
        <AddToCartButton
          lines={[
            {
              quantity: 1,
              merchandiseId: firstVariant.id,
            },
          ]}
          variant="secondary"
          className='!p-[8.2px_16px] text-[20px] rounded-[5px] bg-transparent border-[2px] border-[#9a2ea3] text-[#9a2ea3] font-["OpenSans"] hover:bg-[#9a2ea3] hover:text-white leading-none transition-all duration-500'
          analytics={{
            products: [productAnalytics],
            totalValue: parseFloat(productAnalytics.price),
          }}
        >
          <Text as="span" className="block !text-[20px]">
            In den Warenkorb
          </Text>
        </AddToCartButton>
        {/* {quickAdd && (
          <AddToCartButton
            lines={[
              {
                quantity: 1,
                merchandiseId: firstVariant.id,
              },
            ]}
            variant="secondary"
            className='!p-[8.2px_16px] text-[20px] rounded-[5px] bg-transparent border-[2px] border-[#9a2ea3] text-[#9a2ea3] font-["OpenSans"] hover:bg-[#9a2ea3] hover:text-white leading-none transition-all duration-500'
            analytics={{
              products: [productAnalytics],
              totalValue: parseFloat(productAnalytics.price),
            }}
          >
            <Text
              as="span"
              className='block !text-[20px]'
            >
              In den Warenkorb
            </Text>
          </AddToCartButton>
        )}  */}
      </div>
    </div>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
