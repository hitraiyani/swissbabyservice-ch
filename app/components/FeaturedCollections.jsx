import {Image} from '@shopify/hydrogen';
import {Heading, Section, Grid, Link} from '~/components';

export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}) {
  const haveCollections = collections?.nodes?.length > 0;
  if (!haveCollections) return null;

  const collectionsWithImage = collections.nodes.filter((item) => item.image);

  return (
    <Section {...props} heading={title} className={'!pt-[15px] !pb-[15px] !px-[0]'}>
      <div className='container'>
        <Grid items={collectionsWithImage.length}>
          {collectionsWithImage.map((collection) => {
            return (
              <Link key={collection.id} to={`/collections/${collection.handle}`}>
                <div className="grid gap-4">
                  <div className="card-image relative overflow-hidden pb-[126%] before:!rounded-none bg-white before:hover:border-[3px] before:hover:border-[#7ec24b] !rounded-none">
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
        </Grid>
      </div>
    </Section>
  );
}
