import {useParams, Form, Await, useMatches} from '@remix-run/react';
import {useWindowScroll} from 'react-use';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import Cookies from 'js-cookie';

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
import {useIsHomePath, getMenuHandle, translate} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';

export function Layout({children, layout, locale}) {
  const {headerMenu, footerMenu} = layout;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Header
          title={layout.shop.name}
          locale={locale}
          aicoMenu={layout?.aicoHeaderMenu}
          menu={headerMenu}
        />
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      {footerMenu && <Footer menu={footerMenu} locale={locale} />}
    </>
  );
}

function Header({title, aicoMenu, menu, locale}) {
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
        <MenuDrawer
          isOpen={isMenuOpen}
          aicoMenu={aicoMenu}
          onClose={closeMenu}
          menu={menu}
        />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        aicoMenu={aicoMenu}
        openCart={openCart}
        locale={locale}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
        aicoMenu={aicoMenu}
        locale={locale}
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

function MobileHeader({title, isHome, openCart, openMenu,aicoMenu }) {
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
const handleLanguageChange = (e) => {
  e.stopPropagation();
  let selectedLang = e.currentTarget.getAttribute('data-lang');
  if (selectedLang) {
    Cookies.set('language', selectedLang, {expires: 30});
    setTimeout(() => {
      var selectedLanguage = selectedLang;
      const currentUrl = window.location.href;
      let newUrl = currentUrl;
      const firstPathPart = location.pathname
        .substring(1)
        .split('/')[0]
        .toLowerCase();

      if (
        firstPathPart == 'fr' &&
        (selectedLanguage != 'fr' || selectedLanguage != 'it')
      ) {
        newUrl = currentUrl.replace('/fr', '');
      }
      if (
        firstPathPart == 'it' &&
        (selectedLanguage != 'fr' || selectedLanguage != 'it')
      ) {
        newUrl = currentUrl.replace('/it', '');
      }

      if (firstPathPart == 'it' && selectedLanguage == 'fr') {
        newUrl = currentUrl.replace('/it', '/fr');
      }

      if (firstPathPart == 'fr' && selectedLanguage == 'it') {
        newUrl = currentUrl.replace('/fr', '/it');
      }

      if (
        firstPathPart != 'fr' &&
        firstPathPart != 'it' &&
        selectedLanguage == 'fr'
      ) {
        newUrl =
          location.origin +
          '/fr/' +
          (location.pathname + location.search).substr(1);
      }

      if (
        firstPathPart != 'fr' &&
        firstPathPart != 'it' &&
        selectedLanguage == 'it'
      ) {
        newUrl =
          location.origin +
          '/it/' +
          (location.pathname + location.search).substr(1);
      }

      window.location.href = newUrl;
    }, 200);
  }
};

function DesktopHeader({isHome, aicoMenu, menu, openCart, title, locale}) {
  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <header
      role="banner"
      className={`${isHome ? '' : ''} ${
        !isHome && y > 50 && ''
      } site-header bg-white`}
    >
      <div className="container">
        <div className="row flex justify-between py-[16px]">
          <div className="logo-col max-w-[400px]">
            <a href="/" className="block w-full">
              <img
                className="w-full h-auto"
                src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/swissbabyservice.png?v=1688547438"
                alt=""
              />
            </a>
          </div>
          <div className="language-col">
            <div className="language-block flex gap-[5px] mt-[-16px] items-start ml-[-79px]">
              <button data-lang="de" onClick={handleLanguageChange} className={`p-[7px] text-[12px] text-white bg-[#428bca] leading-none rounded-[0_0_3px_3px] hover:bg-[#3071a9] font-bold font-["Roboto"] ${
                  locale == 'DE' ? 'active' : ''
                }`}>
                de
              </button>
              <button data-lang="it" onClick={handleLanguageChange} className={`p-[7px] text-[12px] text-white bg-[#428bca] leading-none rounded-[0_0_3px_3px] hover:bg-[#3071a9] font-bold font-["Roboto"] ${
                  locale == 'IT' ? 'active' : ''
                } `}>
                it
              </button>
              <button data-lang="fr" onClick={handleLanguageChange}  className={`p-[7px] text-[12px] text-white bg-[#428bca] leading-none rounded-[0_0_3px_3px] hover:bg-[#3071a9] font-bold font-["Roboto"] ${
                  locale == 'FR' ? 'active' : ''
                }`}>
                fr
              </button>
            </div>
          </div>
          <div className="right-col flex items-center">
            <a
              href="/account"
              className='header-login p-[16px] flex text-[13px] text-[#2A6496] font-["arial"] font-medium mr-[16px] items-baseline gap-[2px]' 
            >
              <span className="icon text-[30px]">
                <i className="hr-icon-login"></i>
              </span>
              <span className="name"> {translate("register",locale)}</span>
            </a>
            <div className="header-cart">
              <CartCount isHome={isHome} openCart={openCart}  locale={locale} />
            </div>
          </div>
        </div>
        {/* <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" /> */}
      </div>
      <div className="nav-header bg-[#e4f0fa] border-b-[1px] border-[#3890bf]">
        <div className="container">
          <div className='flex justify-between gap-[40px] items-center'>
          <div className="navbar-wrap">
            <ul className="navbar-items flex gap-[20px]">
              {aicoMenu?.map((item, index) => {
                return (
                  <li key={index} className="navbar-item flex-auto">
                    <Link
                      to={`${
                        item.category.name == ' Home'
                          ? '/'
                          : getMenuHandle(item.category)
                      }`}
                      className='nav-link font-["OpenSans"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block relative'
                    >
                      {translate(item.category.name,locale)}
                    </Link>
                  </li>
                );
              })}
              {/* <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["arial"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Produkte</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["arial"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Über uns</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["arial"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Engagement</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["arial"] text-[#2380b1] py-[22px] text-[20px] font-normal uppercase inline-block'>Kontakt</a>
                </li> */}
            </ul>
          </div>
          <div className="search-bar-col max-w-[190px]">
            <Form
              method="get"
              action={params.locale ? `/${params.locale}/search` : '/search'}
              className="flex items-center gap-2"
            >
              <Input
                className={
                  isHome
                    ? ''
                    : ''
                }
                type="search"
                variant="minisearch"
                placeholder="Produkt suchen"
                name="q"
              />
              {/* <button
                type="submit"
                className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
              >
                <IconSearch />
              </button> */}
            </Form>
          </div>
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

function CartCount({isHome, openCart,locale}) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart}  locale={locale} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
            locale={locale}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({openCart, dark, count,locale}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        {/* <IconBag /> */}
        <div className={`${dark ? '' : ''} flex items-center`}>
          <i className="hr-icon-cart mr-2"></i>
          <span className="cart-text text-[13px] font-['arial']"> {translate("shoping_cart",locale) }</span>
          <span className='bg-[#e4f0fa] px-[10px] py-[5px] text-[13px] ml-[8px] rounded-[5px] text-[#2380b1] font-["arial"]'>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="w-full bg-[#c0d4e6] font-['arial'] p-[13px_12px_13px_15px] rounded-[8px] text-[#2380b1] hover:bg-[#2380b1] hover:text-white transition-all duration-500"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="w-full bg-[#c0d4e6] font-['arial'] p-[13px_12px_13px_15px] rounded-[8px] text-[#2380b1] hover:bg-[#2380b1] hover:text-white transition-all duration-500"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu,locale}) {

  const isHome = useIsHomePath();

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className={`w-full p-0 lg:p-0 md:p-0 bg-[#fff] text[#3391c2] relative main-footer`}
    >
      <div className="footer-cloud"></div>
      <div className="container max-w-[1100px] m-auto pl-[15px] pr-[15px] pt-[40px]">
        <div className="footer-row-wrap relative">
          <div className="bz-footer-row hidden sm:hidden lg:block xl:block"></div>
          <div className="flex flex-row flex-wrap xl:flex-nowrap mx-[-15px] gap-y-5">
            <div className="px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
              <div className="col-inner">
                <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                  Swissbabyservice
                </h4>
                <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px]">
                   {translate("footer_desc",locale) } 
                </p>
              </div>
            </div>
            <div className="px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
              <div className="col-inner">
                <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                 {translate("information",locale) }
                </h4>
                <ul className="nav-list flex flex-col gap-[10px] mb-[10px]">
                  {menu?.items?.map((item,index) => {
                    return (
                      <li key={index} className="text-[13px] text-[#2380b1] font-normal font-['arial']">
                        <Link
                          className="hover:text-[#2A6496] transition-all duration-500 underline"
                          href="/"
                          to={item.to}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
              <div className="col-inner">
                <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                 {translate("shipment",locale) }
                </h4>
                <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px] mb-[10px]">
                  {translate("delivery_cost",locale)} <strong>CHF 6.90</strong>
                </p>
                <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px] mb-[10px]">
                  {translate("free_delivery_of_order",locale)} {' '}
                  <strong>CHF 65.00</strong>
                </p>
                <div className="flex items-start gap-[5px]">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/rechnung.png?v=1688561840"
                    height="auto"
                    alt=""
                  />
                  <div className="flex">
                    <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px] mb-[10px]">
                      <strong className="font-semibold">{translate("invoice",locale)}</strong>
                      <br />
                      30 {translate("take_net",locale)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
              <div className="col-inner">
                <h4 className="title text-[20px] text-[#3391c2] font-semibold font-serif pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                 {translate("contact",locale) }
                </h4>
                <div className="contact-info">
                  <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px] mb-[10px] ">
                    <b className="font-semibold">SWISSBABYSERVICE</b>
                    <br />
                    Schulstrasse 13a
                    <br />
                    9553 Bettwiesen
                    <br />
                  </p>
                  <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px] mb-[10px]">
                    <strong className="font-semibold">FR 079 434 62 99</strong>
                  </p>
                  <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px] mb-[10px]">
                    <strong className="font-semibold">DE 052 720 58 58</strong>
                  </p>
                  <p className="text-[13px] text-[#3391c2] font-normal font-['arial'] leading-[18px] mb-[10px]">
                    <a
                      href="mailto:info@swissbabyservice.ch"
                      className="hover:text-[#2A6496] transition-all duration-500 underline"
                    >
                      info@swissbabyservice.ch
                    </a>
                  </p>
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
