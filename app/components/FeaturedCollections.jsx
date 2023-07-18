import {Image} from '@shopify/hydrogen';
import {Heading, Section, Grid, Link} from '~/components';

export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  console.log(collections)
  
  const collectionsWithImage = collections.nodes.filter((item) => item.image);

  return (
    <Section {...props} heading={title} className={'!pt-[15px] !pb-[15px] !px-[0]'}>
      <div className='container'>
        <div items={collectionsWithImage.length} className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4'}>
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
        </div>
      </div>
    </Section>
  );
}
