import {Image} from '@shopify/hydrogen';
import {Heading, Section, Grid, Link} from '~/components';

export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  console.log(collections);

  const collectionsWithImage = collections.nodes.filter((item) => item.image);

  return (
    <Section
      {...props}
      heading={title}
      className={'!pt-[15px] !pb-[15px] !px-[0] featuredCollections-sec'}
    >
      <div className="container">
        {/* <div items={collectionsWithImage.length} className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4'}>
          {collectionsWithImage.map((collection) => {
            return (
              <Link key={collection.id} to={`/collections/${collection.handle}`}>
                <div className="grid gap-4">
                  <div className={`card-image relative overflow-hidden pb-[126%] before:!rounded-none bg-white before:hover:border-[3px] before:border-inherit !rounded-none`} style={{ borderColor: collection.boarder_color ? '#'+collection.boarder_color?.value : '#7ec24b' }}>
                    {collection?.image && (
                      <Image
                        alt={`Image of ${collection.title}`}
                        data={collection.image}
                        // sizes="(max-width: 32em) 100vw, 33vw"
                        // aspectRatio="3/2"
                        className='absolute inset-0 !object-contain w-full h-full'
                      />
                    )}
                  </div>
                  <Heading className='hidden' size="copy">{collection.title}</Heading>
                </div>
              </Link>
            );
          })}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[30px]">
          <div className="collection-col rounded-[30px] overflow-hidden bg-[#9CD6BD]">
            <div className="col-inner py-[22px] px-[33px]">
              <a href="#" className='relative'>
                <div className="title-wrap absolute top-0 left-0 w-full">
                  <h2 className='text-[24px] lg:text-[32px] text-[#05557B] font-bold'>BIO</h2>
                </div>
                <div className="btn-wrap absolute bottom-0 w-full flex flex-wrap left-0 z-[1]">
                  <button className="btn text-white text-[20px] leading-none py-[12px] px-[30px] bg-[#05557B] rounded-[40px]">Jetzt ansehen</button>
                </div>
                <div className='collection-img relative overflow-hidden w-[90%] pb-[75%] mr-[-60px] lg:mr-[-80px] ml-auto'>
                  <img className='inset-0 absolute object-contain' src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/image.png?v=1690368693" alt="" />
                </div>
              </a>
            </div>
          </div>
          <div className="collection-col rounded-[30px] overflow-hidden bg-[#F8AFA8]">
            <div className="col-inner py-[22px] px-[33px]">
              <a href="#" className='relative'>
                <div className="title-wrap absolute top-0 left-0 w-full">
                  <h2 className='text-[24px] lg:text-[32px] text-[#05557B] font-bold'>Hygiene</h2>
                </div>
                <div className="btn-wrap absolute bottom-0 w-full flex flex-wrap left-0 z-[1]">
                  <button className="btn text-white text-[20px] leading-none py-[12px] px-[30px] bg-[#05557B] rounded-[40px]">Jetzt ansehen</button>
                </div>
                <div className='collection-img relative overflow-hidden w-[90%] pb-[75%] mr-[-60px] lg:mr-[-80px] ml-auto'>
                  <img className='inset-0 absolute object-contain' src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/image_1.png?v=1690368693" alt="" />
                </div>
              </a>
            </div>
          </div>
          <div className="collection-col rounded-[30px] overflow-hidden bg-[#F9BE3C]">
            <div className="col-inner py-[22px] px-[33px]">
              <a href="#" className='relative'>
                <div className="title-wrap absolute top-0 left-0 w-full">
                  <h2 className='text-[24px] lg:text-[32px] text-[#05557B] font-bold'>Pflegeprodukte</h2>
                </div>
                <div className="btn-wrap absolute bottom-0 w-full flex flex-wrap left-0 z-[1]">
                  <button className="btn text-white text-[20px] leading-none py-[12px] px-[30px] bg-[#05557B] rounded-[40px]">Jetzt ansehen</button>
                </div>
                <div className='collection-img relative overflow-hidden w-[90%] pb-[75%] mr-[-60px] lg:mr-[-80px] ml-auto'>
                  <img className='inset-0 absolute object-contain' src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/image.png?v=1690368693" alt="" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
