import {ProductCard, Section} from '~/components';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}) {
  return (
    <Section padding="y" {...props}>
      <div className="container">
        <div className="flex items-center gap-[20px] mb-[30px] ">
          <h3 className='text-[20px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
            {title}
          </h3>
          <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
        </div>
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 min-[992px]:grid-cols-3 gap-[30px]">
          {products.nodes.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              className="snap-start w-80"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
