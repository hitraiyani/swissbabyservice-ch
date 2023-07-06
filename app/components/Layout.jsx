import {useParams, Form, Await, useMatches} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {
  Drawer,
  useDrawer,
  Text,
  Input,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  CountrySelector,
  Cart,
  CartLoading,
  Link,
} from '~/components';
import {useIsHomePath, getMenuHandle} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';

export function Layout({children, layout}) {
  const {headerMenu, footerMenu} = layout;
 

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
         <Header title={layout.shop.name}  aicoMenu={layout?.aicoHeaderMenu} menu={headerMenu} />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({title,aicoMenu, menu}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers('ADD_TO_CART');

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} aicoMenu={aicoMenu} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        aicoMenu={aicoMenu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}) {
  const [root] = useMatches();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block">
          <Link
            to={item.to}
            target={item.target}
            onClick={onClose}
            className={({isActive}) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            <Text as="span" size="copy">
              {item.title}
            </Text>
          </Link>
        </span>
      ))}
    </nav>
  );
}

function MobileHeader({title, isHome, openCart, openMenu}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${
        isHome
          ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
          : 'bg-contrast/80 text-primary'
      } flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({isHome,aicoMenu, menu, openCart, title}) {
  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <header
      role="banner"
      className={`${
        isHome
          ? ''
          : ''
      } ${
        !isHome && y > 50 && ''
      } site-header py-[16px] bg-white`}
    >
      <div className='container'>
        <div className='row flex justify-between'>
          <div className='logo-col max-w-[400px]'>
              <a href="/" className='block w-full'>
                <img className='w-full h-auto' src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/swissbabyservice.png?v=1688547438" alt="" />
              </a>
          </div>
          <div className='language-col'>
              <div className='language-block flex gap-[5px] mt-[-16px] items-start'>
                <button className='p-[7px] text-[12px] text-white bg-[#428bca] leading-none rounded-[0_0_3px_3px] hover:bg-[#3071a9] font-bold font-["Roboto"] active'>de</button>
                <button className='p-[7px] text-[12px] text-white bg-[#428bca] leading-none rounded-[0_0_3px_3px] hover:bg-[#3071a9] font-bold font-["Roboto"]'>it</button>
                <button className='p-[7px] text-[12px] text-white bg-[#428bca] leading-none rounded-[0_0_3px_3px] hover:bg-[#3071a9] font-bold font-["Roboto"]'>fr</button>
              </div>
          </div>
          <div className='right-col flex items-center'>
            <a href="/account" className='header-login p-[16px] flex text-[13px] items-end text-[#2A6496] font-["Open_Sans"] font-medium mr-[16px]'>
              <span className='icon text-[30px]'><i className="hr-icon-login"></i></span>
              <span className='name'> Anmelden</span>
            </a>
            <div className='header-cart'>
              <CartCount isHome={isHome} openCart={openCart} />
            </div>
          </div>
        </div>
          {/* <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" /> */}
      </div>
      <div className='nav-header bg-[#e4f0fa] border-b-[1px] border-[#3890bf]'>
        <div className='container'>
            <div className='navbar-wrap'>
              <ul className='navbar-items flex'>
                {aicoMenu?.map((item,index) => {
                    return (
                      <li key={index} className="navbar-item flex-1">
                        <Link
                          to={`${
                            item.category.name == ' Home'
                              ? '/'
                              : getMenuHandle(item.category)
                          }`}
                          className='nav-link font-["Open_Sans"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'
                        >
                          {item.category.name}
                        </Link>
                      </li>
                    );
                })}
                {/* <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["Open_Sans"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Produkte</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["Open_Sans"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Über uns</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["Open_Sans"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Engagement</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["Open_Sans"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Kontakt</a>
                </li> */}
              </ul>
            </div>
        </div>
      </div>
    </header>
  );
}

function AccountLink({className}) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

function CartCount({isHome, openCart}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, dark, count}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        {/* <IconBag /> */}
        <div
          className={`${
            dark
              ? ''
              : ''
          } flex items-center`}
        >
          <i className="hr-icon-cart mr-2"></i>
          <span className="cart-text text-[13px] font-['Open_Sans']">Warenkorb</span>
          <span className='bg-[#e4f0fa] px-[10px] py-[5px] text-[13px] ml-[8px] rounded-[5px] text-[#2380b1] font-["Open_Sans"]'>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="w-full bg-[#c0d4e6] font-['Open_Sans'] p-[13px_12px_13px_15px] rounded-[8px] text-[#2380b1] hover:bg-[#2380b1] hover:text-white transition-all duration-500"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="w-full bg-[#c0d4e6] font-['Open_Sans'] p-[13px_12px_13px_15px] rounded-[8px] text-[#2380b1] hover:bg-[#2380b1] hover:text-white transition-all duration-500"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu}) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className={`w-full p-0 lg:p-0 md:p-0 bg-[#fff] text[#3391c2] relative main-footer`}
    >
      {/* <FooterMenu menu={menu} /> */}
      {/* <CountrySelector /> */}
      {/* <div
        className={`self-end pt-8 opacity-50 md:col-span-2 lg:col-span-${itemsCount}`}
      >
        &copy; {new Date().getFullYear()} / Shopify, Inc. Hydrogen is an MIT
        Licensed Open Source project.
      </div> */}
      <div class="footer-cloud"></div>
      <div className="container max-w-[1100px] m-auto pl-[15px] pr-[15px] pt-[40px]">
  <div className="footer-row-wrap relative">
    <div className="bz-footer-row hidden sm:hidden lg:block xl:block"></div>
    <div
     className="footer-row flex flex-row flex-wrap xl:flex-nowrap mx-[-15px] gap-y-5">
      <div className="footer-col px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
        <div className="col-inner">
        <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">Swissbabyservice</h4>
          <p className="text-[13px] text-[#3391c2] font-normal font-['arial']">
            Mit unserem umfangreichen Sortiment an klassichen, ökologischen oder biologischen Windeln, 
                      Pflege- & Hygieneprodukten und Zubehör sind wir Ihr zuverlässiger Partner,
                       sowohl für Private als auch für Geschäfts/Grosskunden.
          </p>
        </div>
      </div>
      <div className="footer-col px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
        <div className="col-inner">
          
            <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">Informationen</h4>
            <ul className="nav-list flex flex-col gap-[10px] mb-[10px]">
              <li className="text-[13px] text-[#2380b1] font-normal font-['arial']"><a className="hover:text-[#2A6496] transition-all duration-500 underline"
                  href="/" target="_self">Swissbabyservice Portrait</a></li>
              <li className="text-[13px] text-[#2380b1] font-normal font-['arial']"><a className="hover:text-[#2A6496] transition-all duration-500 underline"
                  href="/" target="_self">Ein Herz für Andere</a></li>
                  <li className="text-[13px] text-[#2380b1] font-normal font-['arial']"><a className="hover:text-[#2A6496] transition-all duration-500 underline"
                  href="/" target="_self">Partner / Nützliche Links</a></li>
                  <li className="text-[13px] text-[#2380b1] font-normal font-['arial']"><a className="hover:text-[#2A6496] transition-all duration-500 underline"
                  href="/" target="_self">Bestellinfos</a></li>
                  <li className="text-[13px] text-[#2380b1] font-normal font-['arial']"><a className="hover:text-[#2A6496] transition-all duration-500 underline"
                  href="/" target="_self">AGBs</a></li>
                  <li className="text-[13px] text-[#2380b1] font-normal font-['arial']"><a className="hover:text-[#2A6496] transition-all duration-500 underline"
                  href="/" target="_self">Datenschutz</a></li>
            </ul>
        </div>
      </div>
      <div className="footer-col px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
        <div className="col-inner">         
            <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">Versand/Zahlung</h4>
             <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] mb-[10px]">Lieferkosten <strong>CHF 6.90</strong></p>
             <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] mb-[10px]">Gratislieferung ab einem Bestellwert von <strong>CHF 65.00</strong></p>
             <div className='flex items-start gap-[5px]'>
                    <img src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/rechnung.png?v=1688561840" height="auto" alt="" />
                    <div className='flex'>
                    <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] mb-[10px]"><strong  className='font-semibold'>Rechnung</strong><br/>30 Tage netto</p>
                    </div>
             </div>
        </div>
      </div>
      <div className="footer-col px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
        <div className="col-inner">
          <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">Kontakt</h4>
          <div className="contact-info">
           <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] mb-[10px] "><b className='font-semibold'>SWISSBABYSERVICE</b><br/>Schulstrasse 13a<br/>9553 Bettwiesen<br/></p>
             <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] mb-[10px]"><strong className='font-semibold'>FR 079 434 62 99</strong></p>
             <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] mb-[10px]"><strong className='font-semibold'>DE 052 720 58 58</strong></p>
             <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] mb-[10px]"><a href="mailto:info@swissbabyservice.ch" className="hover:text-[#2A6496] transition-all duration-500 underline">info@swissbabyservice.ch</a></p>
          </div>
       
        </div>
      </div>
    </div>
  </div>
</div>
    </Section>
  );
}



function FooterLink({item}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
