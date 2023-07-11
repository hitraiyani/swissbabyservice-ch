import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

import {PageHeader} from '~/components';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader({request, params, context}) {
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'about-us',
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.customPage({title: page.title, url: request.url});

  return json({page, seo});
}

export default function AboutUs() {
  const {page} = useLoaderData();

  return (
    <>
      <div className="page-information py-[48px]">
        <div className="container">
          <PageHeader heading={page.title} className={''}>
            <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
          </PageHeader>
          <div className="page-content">
            <div
              dangerouslySetInnerHTML={{__html: page.body}}
              className="w-full min-[992px]:max-w-[550px] font-['Open_Sans'] text-[13px] text-[#2380B1] leading-[1.2]"
            />
          </div>
          <div className="how-it-works-section mt-[40px]">
            <div className="mb-[30px]">
              <h2 className='title font-["Open_Sans"] font-semibold leading-[1.3] text-[#2380B1] p-0 flex items-center gap-[20px] mb-[35px] relative'>
                So funktioniert es
                <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
              </h2>
              <div className="balloon-row flex flex-col md:flex-row gap-[15px]">
                <div className='balloon-block relative bg-[url("https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloons-bullet-large.png?v=1689064287")] min-h-[140px] pl-[65px] pt-[30px] pb-10 bg-no-repeat bg-left-top w-full md:w-[33.33%]'>
                  <div className='balloon-block-text absolute text-3xl text-[white] left-[30px] top-5 font-["dkpisang"]'>
                    1
                  </div>
                  <div className='desc text-[#2380B1] font-["Open_Sans"] text-[13px]'>
                    <h4 className="text-[16px] mb-0 font-semibold">
                      Ich melde mich an...
                    </h4>
                    <p>
                      Ich möchte vom Lieferservice profitieren und melde mich
                      auf www.swissbabyservice an.
                    </p>
                  </div>
                </div>
                <div className='balloon-block relative bg-[url("https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloons-bullet-large.png?v=1689064287")] min-h-[140px] pl-[65px] pt-[30px] pb-10 bg-no-repeat bg-left-top w-full md:w-[33.33%]'>
                  <div className='balloon-block-text absolute text-3xl text-[white] left-[30px] top-5 font-["dkpisang"]'>
                    2
                  </div>
                  <div className='desc text-[#2380B1] font-["Open_Sans"] text-[13px]'>
                    <h4 className="text-[16px] mb-0 font-semibold">
                      ICH WÄHLE MEINE WINDELMARKE
                    </h4>
                    <p>Dabei kann ich aus den besten Marken wählen.</p>
                  </div>
                </div>
                <div className='balloon-block relative bg-[url("https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloons-bullet-large.png?v=1689064287")] min-h-[140px] pl-[65px] pt-[30px] pb-10 bg-no-repeat bg-left-top w-full md:w-[33.33%]'>
                  <div className='balloon-block-text absolute text-3xl text-[white] left-[30px] top-5 font-["dkpisang"]'>
                    3
                  </div>
                  <div className='desc text-[#2380B1] font-["Open_Sans"] text-[13px]'>
                    <h4 className="text-[16px] mb-0 font-semibold">EXKLUSIV</h4>
                    <p>
                      Ich möchte vom Lieferservice profitieren und melde mich
                      auf www.swissbabyservice an.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h2 className='title font-["Open_Sans"] font-semibold leading-[1.3] text-[#2380B1] p-0 flex items-center gap-[20px] mb-[35px] relative'>
                Was wir Ihnen bieten
                <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
              </h2>
              <div className="balloon-row flex flex-col md:flex-row gap-[15px]">
                <div className='balloon-block relative bg-[url("https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloons-bullet-large.png?v=1689064287")] min-h-[140px] pl-[65px] pt-[30px] pb-10 bg-no-repeat bg-left-top w-full md:w-[33.33%]'>
                  <div className='balloon-block-text absolute text-3xl text-[white] left-[30px] top-5 font-["dkpisang"]'>
                    4
                  </div>
                  <div className='desc text-[#2380B1] font-["Open_Sans"] text-[13px]'>
                    <h4 className="text-[16px] mb-0 font-semibold">
                      WIR LIEFERN DAS PAKET DIREKT NACH HAUSE
                    </h4>
                    <p>
                      Dank dem Dauerrabatt sparen Sie Geld. Der Gang ins
                      Einkaufszentrum und die Jagd nach Spezialaktionen
                      entfällt. Dadurch gewinnen Sie kostbare Zeit, die Sie mit
                      ihren Kindern verbringen können.
                    </p>
                  </div>
                </div>
                <div className='balloon-block relative bg-[url("https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloons-bullet-large.png?v=1689064287")] min-h-[140px] pl-[65px] pt-[30px] pb-10 bg-no-repeat bg-left-top w-full md:w-[33.33%]'>
                  <div className='balloon-block-text absolute text-3xl text-[white] left-[30px] top-5 font-["dkpisang"]'>
                    5
                  </div>
                  <div className='desc text-[#2380B1] font-["Open_Sans"] text-[13px]'>
                    <h4 className="text-[16px] mb-0 font-semibold">
                      IHR VORTEIL…
                    </h4>
                    <p>Sie haben 30 Tage, um Ihre Rechnung zu begleichen.</p>
                  </div>
                </div>
                <div className='balloon-block relative bg-[url("https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloons-bullet-large.png?v=1689064287")] min-h-[140px] pl-[65px] pt-[30px] pb-10 bg-no-repeat bg-left-top w-full md:w-[33.33%]'>
                  <div className='balloon-block-text absolute text-3xl text-[white] left-[30px] top-5 font-["dkpisang"]'>
                    6
                  </div>
                  <div className='desc text-[#2380B1] font-["Open_Sans"] text-[13px]'>
                    <h4 className="text-[16px] mb-0 font-semibold">
                      IMMER EINE WINDEL ZUR HAND…
                    </h4>
                    <p>
                      Per Email oder SMS erhalten Sie eine kleine Mitteilung,
                      bevor der Windelvorrat aufgebraucht ist. Teilen Sie uns
                      Ihre Bedürfnisse mit.
                    </p>
                    <p>
                      Falls Sie nicht mehr von den Swissbabyservice-Vorteilen
                      profitieren möchten, können Sie die Lieferung jederzeit
                      stoppen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const PAGE_QUERY = `#graphql
  query PageDetails($language: LanguageCode, $handle: String!)
  @inContext(language: $language) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
