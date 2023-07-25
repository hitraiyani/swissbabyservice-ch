import {
  useParams,
  Form,
  Await,
  useMatches,
  useLocation,
} from '@remix-run/react';

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
  IconSearch2,
  IconUser2,
  IconCart2,
} from '~/components';
import {useIsHomePath, getMenuHandle, translate} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';

export function Layout({children, layout, locale}) {
  const {headerMenu, footerMenu} = layout;

  return (
    <>
      <div className="flex flex-col">
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
    //openCart();
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
          locale={locale}
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

export function MenuDrawer({isOpen, onClose, menu, aicoMenu, locale}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav
          menu={menu}
          onClose={onClose}
          aicoMenu={aicoMenu}
          locale={locale}
        />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose, aicoMenu, locale}) {
  const {pathname} = useLocation();
  return (
    <nav className="grid px-[15px]">
      {/* Top level menu items */}
      {/* {(menu?.items || []).map((item) => (
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
      ))} */}
      <div className="flex justify-between gap-[20px] xl:gap-[40px] items-center">
        <div className="navbar-wrap flex-1">
          <ul className="navbar-items flex flex-col">
            {aicoMenu?.map((item, index) => {
              const itemHandle =
                item.category.name == 'Home'
                  ? '/'
                  : getMenuHandle(item.category);
              return (
                <li key={index} className="navbar-item flex-1">
                  <Link
                    to={itemHandle}
                    onClick={onClose}
                    className={`${
                      itemHandle == pathname ? '!text-[#1F6B8F]' : ''
                    } nav-link text-[#333] py-[10px] text-[20px] font-normal uppercase inline-block relative`}
                  >
                    {translate(item.category.name, locale)}
                  </Link>
                </li>
              );
            })}
            {/* <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["OpenSans"] text-[#333] py-[22px] text-[20px] font-normal uppercase inline-block relative'>Produkte</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["OpenSans"] text-[#333] py-[22px] text-[20px] font-normal uppercase inline-block relative'>Über uns</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["OpenSans"] text-[#333] py-[22px] text-[20px] font-normal uppercase inline-block relative'>Engagement</a>
                </li>
                <li className='navbar-item flex-1'>
                  <a href="#" className='nav-link font-["OpenSans"] text-[#333] py-[22px] text-[20px] font-normal uppercase inline-block relative'>Kontakt</a>
                </li> */}
          </ul>
          <div className="language-col mt-[20px]">
            <div className="language-block flex gap-[5px] items-start">
              <button
                data-lang="de"
                onClick={handleLanguageChange}
                className={`p-[2px] w-[25px] h-[25px] text-[14px] text-[#05557B] bg-[#D1E7FC] hover:bg-[#1f6b8f] hover:text-white leading-none rounded-full flex items-center justify-center font-bold ${
                  locale == 'DE' ? '!bg-[#1F6B8F] !text-white' : ''
                } `}
              >
                de
              </button>
              <button
                data-lang="it"
                onClick={handleLanguageChange}
                className={`p-[2px] w-[25px] h-[25px] text-[14px] text-[#05557B] bg-[#D1E7FC] hover:bg-[#1f6b8f] hover:text-white leading-none rounded-full flex items-center justify-center font-bold ${
                  locale == 'IT' ? '!bg-[#1F6B8F] !text-white' : ''
                } `}
              >
                it
              </button>
              <button
                data-lang="fr"
                onClick={handleLanguageChange}
                className={`p-[2px] w-[25px] h-[25px] text-[14px] text-[#05557B] bg-[#D1E7FC] hover:bg-[#1f6b8f] hover:text-white leading-none rounded-full flex items-center justify-center font-bold ${
                  locale == 'FR' ? '!bg-[#1F6B8F] !text-white' : ''
                }  `}
              >
                fr
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileHeader({title, isHome, openCart, openMenu, aicoMenu, locale}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${
        isHome ? '' : ''
      } mobile-header min-[992px]:hidden bg-white py-[15px] border-b-[1px] border-[#3890bf] relative`}
    >
      <div className="container">
        <div className="row flex items-center justify-between gap-[15px]">
          <div className="logo-col w-[60%] max-w-[240px]">
            <a href="/" className="block w-full">
              <img
                className="w-full h-auto"
                src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/swissbabyservice.png?v=1688547438"
                alt=""
              />
            </a>
          </div>
          <div className="right-col w-[40%] flex flex-col gap-[10px]">
            <div className="justify-end flex items-center gap-[10px]">
              <button onClick={openMenu} className="">
                <IconMenu
                  className={'text-[#2380b1] w-[20px] h-[20px] scale-[1.5]'}
                />
              </button>
              <div className="my-account-mobile">
                <a
                  href="/account"
                  className='header-login flex text-[11px] text-[#2380b1] font-["Open_Sans"] font-medium items-baseline gap-[2px]'
                >
                  <IconUser2 className={'w-[20px] h-[20px] text-[#2380b1] '} />
                </a>
              </div>
              <div className="header-cart mobile">
                <CartCount
                  isHome={isHome}
                  openCart={openCart}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row hidden">
          <Form
            method="get"
            action={params.locale ? `/${params.locale}/search` : '/search'}
            className="items-center gap-2 sm:flex"
          >
            {/* <button
              type="submit"
              className="relative flex items-center justify-center w-8 h-8"
            >
              <IconSearch />
            </button> */}
            <Input
              className={isHome ? '' : ''}
              type="search"
              variant="minisearch"
              placeholder="Produkt suchen"
              name="q"
            />
          </Form>
        </div>
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
  const {pathname} = useLocation();
  return (
    <header
      role="banner"
      className={`${isHome ? '' : ''} ${
        !isHome && y > 50 && ''
      } site-header bg-white max-[991px]:hidden`}
    >
      <div className="top-header py-[20px]">
        <div className="container">
          <div className="row flex justify-between items-center">
            <div className="empty-col flex-1"></div>
            <div className="language-col flex-1">
              <div className="language-block flex gap-[5px] items-center justify-center 2xl:mt-[-35px]">
                <button
                  data-lang="de"
                  onClick={handleLanguageChange}
                  className={`p-[2px] w-[30px] h-[30px] text-[20px] text-[#05557B] bg-[#D1E7FC] hover:bg-[#1f6b8f] hover:text-white leading-none rounded-full flex items-center justify-center font-bold ${
                    locale == 'DE' ? '!bg-[#1F6B8F] !text-white' : ''
                  }`}
                >
                  de
                </button>
                <button
                  data-lang="it"
                  onClick={handleLanguageChange}
                  className={`p-[2px] w-[30px] h-[30px] text-[20px] text-[#05557B] bg-[#D1E7FC] hover:bg-[#1f6b8f] hover:text-white leading-none rounded-full flex items-center justify-center font-bold ${
                    locale == 'IT' ? '!bg-[#1F6B8F] !text-white' : ''
                  } `}
                >
                  it
                </button>
                <button
                  data-lang="fr"
                  onClick={handleLanguageChange}
                  className={`p-[2px] w-[30px] h-[30px] text-[20px] text-[#05557B] bg-[#D1E7FC] hover:bg-[#1f6b8f] hover:text-white leading-none rounded-full flex items-center justify-center font-bold ${
                    locale == 'FR' ? '!bg-[#1F6B8F] !text-white' : ''
                  }`}
                >
                  fr
                </button>
              </div>
            </div>
            <div className="right-col flex-1 flex justify-end gap-[30px] items-center">
              <div className="search-col">
                <button className="search-btn w-[24px] h-[24px] relative top-[3px]">
                  <IconSearch2 className={'w-full h-full'} />
                </button>
                <Form
                  method="get"
                  action={
                    params.locale ? `/${params.locale}/search` : '/search'
                  }
                  className="flex items-center gap-2 !hidden"
                >
                  <Input
                    className={isHome ? '' : ''}
                    type="search"
                    variant="minisearch"
                    placeholder="Produkt suchen"
                    name="q"
                  />
                  <button
                    type="submit"
                    className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
                  >
                    <IconSearch />
                  </button>
                </Form>
              </div>
              <a
                href="/account"
                className="header-login text-[20px] text-[#00334B] font-normal flex gap-[5px] items-center"
              >
                <IconUser2 className={'w-[23px] h-[23px]'} />
                <span className="name"> {translate('register', locale)}</span>
              </a>
              <div className="header-cart">
                <CartCount
                  isHome={isHome}
                  openCart={openCart}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-header pb-[20px] 2xl:pb-[40px]">
        <div className="container">
          <div className="row flex justify-between items-center gap-[15px]">
            <div className="logo max-w-[24.6%]">
              <a href="/" className="block w-full">
                <img
                  className="w-full h-auto"
                  src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/swissbabyservice.png?v=1688547438"
                  alt=""
                />
              </a>
            </div>
            <div className="navbar-col">
              <ul className="navbar-items flex gap-x-[10px] 2xl:gap-x-[20px]">
                {aicoMenu?.map((item, index) => {
                  const itemHandle =
                    item.category.name == 'Home'
                      ? '/'
                      : getMenuHandle(item.category);
                  return (
                    <li
                      key={index}
                      className="navbar-item flex-auto text-center"
                    >
                      <Link
                        to={itemHandle} 
                        className={`${
                          itemHandle == pathname ? 'text-[#00a0e0]' : ''
                        } xl:text-[16px] text-[12px] font-bold text-[#00334B] hover:text-[#00a0e0]`}
                      >
                        {translate(item.category.name, locale)}
                      </Link>
                    </li> 
                  );
                })}
              </ul>
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

function CartCount({isHome, openCart, locale}) {
  const [root] = useMatches();

  return (
    <Suspense
      fallback={
        <Badge count={0} dark={isHome} openCart={openCart} locale={locale} />
      }
    >
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

function Badge({openCart, dark, count, locale}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        {/* <IconBag /> */}
        <div
          className={`${
            dark ? '' : ''
          } flex items-center gap-[5px] min-[992px]:gap-[15px] px-[10px] min-[992px]:px-[17px] py-[8px] min-[992px]:py-[12px] text-white text-[14px] min-[992px]:text-[20px] leading-none bg-[#05557B] rounded-[32px] hover:opacity-70`}
        >
          <IconCart2
            className={
              'min-[992px]:w-[24px] min-[992px]:h-[24px] w-[20px] h-[20px]'
            }
          />
          {/* <span className="cart-text">
            {translate('shoping_cart', locale)}
          </span> */}
          <span className="">{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button onClick={openCart} className="">
      {BadgeCounter}
    </button>
  ) : (
    // <Link
    //   to="/cart"
    //   className="w-full bg-[#c0d4e6] font-['Open_Sans'] p-[7px_6px_7px_8px] min-[992px]:p-[13px_12px_13px_15px] rounded-[4px] min-[992px]:rounded-[8px] text-[#2380b1] hover:bg-[#2380b1] hover:text-white transition-all duration-500 block"
    // >
    //   {BadgeCounter}
    // </Link>
    <Link to="/cart" className="">
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu, locale}) {
  const isHome = useIsHomePath();
  useEffect(() => {
    window.addEventListener('scroll', function (e) {
      parallaxScroll();
    });

    function parallaxScroll() {
      if (true) {
        {
          var windowHeight =
            window.innerHeight || document.documentElement.clientHeight;
          var baloonsElement = document.getElementById('baloons');
          var baloonsHeight = baloonsElement.offsetHeight;
          var baloonsOffsetTop = baloonsElement.offsetTop;
          var scrollPosition =
            window.pageYOffset || document.documentElement.scrollTop;

          if (
            scrollPosition + windowHeight >=
            baloonsHeight + baloonsOffsetTop + 100
          ) {
            var scrolled =
              scrollPosition +
              windowHeight -
              (baloonsHeight + baloonsOffsetTop + 100);
            if (scrolled < 0) {
              scrolled = 0;
            }
          } else {
            var scrolled = 0;
          }

          document.querySelector('.baloon-1').style.marginTop =
            0 + scrolled * 0.09 + 'px';
          document.querySelector('.baloon-1').style.marginLeft =
            0 + scrolled * 0.1 + 'px';
          document.querySelector('.baloon-2').style.marginTop =
            0 - scrolled * 0.15 + 'px';
          document.querySelector('.baloon-2').style.marginRight =
            0 + scrolled * 0.05 + 'px';
          document.querySelector('.baloon-3').style.marginTop =
            0 - scrolled * 0.05 + 'px';
          document.querySelector('.baloon-3').style.marginLeft =
            0 - scrolled * 0.15 + 'px';
          document.querySelector('.baloon-4').style.marginTop =
            0 - scrolled * 0.16 + 'px';
          document.querySelector('.baloon-4').style.marginRight =
            0 + scrolled * 0.15 + 'px';
          document.querySelector('.baloon-5').style.marginTop =
            0 - scrolled * 0.21 + 'px';
          document.querySelector('.baloon-5').style.marginRight =
            0 - scrolled * 0.08 + 'px';
          document.querySelector('.baloon-6').style.marginTop =
            0 + scrolled * 0.15 + 'px';
          document.querySelector('.baloon-6').style.marginRight =
            0 + scrolled * 0.18 + 'px';
        }
      }
    }
  }, []);
  return (
    <>
      {isHome ? (
        ''
      ) : (
        <div id="baloons" className="bz-baloons-container block bottom-baloon">
          <div className="baloon-1">
            <img
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-1-de.png?v=1688968486"
              alt=""
            />
          </div>
          <div className="baloon-2">
            <img
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-2-de.png?v=1688968485"
              alt=""
            />
          </div>
          <div className="baloon-3">
            <img
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-3-de.png?v=1688968485"
              alt=""
            />
          </div>
          <div className="baloon-4">
            <img
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-4-de.png?v=1688968485"
              alt=""
            />
          </div>
          <div className="baloon-5">
            <img
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-5-de.png?v=1688968486"
              alt=""
            />
          </div>
          <div className="baloon-6">
            <img
              src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/baloon-6-de.png?v=1688968485"
              alt=""
            />
          </div>
        </div>
      )}
      <div className="footer-cloud"></div>
      <Section
        divider={isHome ? 'none' : 'top'}
        as="footer"
        role="contentinfo"
        className={`w-full p-0 lg:p-0 md:p-0 bg-[#fff] text[#3391c2] relative main-footer`}
      >
        <div className="container max-w-[1100px] m-auto pl-[15px] pr-[15px] pt-[40px]">
          <div className="footer-row-wrap relative">
            <div className="bz-footer-row hidden sm:hidden lg:block xl:block"></div>
            <div className="flex flex-row flex-wrap xl:flex-nowrap mx-[-15px] gap-y-5">
              <div className="px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
                <div className="col-inner">
                  <h4 className="title text-[20px] text-[#3391c2] font-semibold font-['Open_Sans'] pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                    Swissbabyservice
                  </h4>
                  <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px]">
                    {translate('footer_desc', locale)}
                  </p>
                </div>
              </div>
              <div className="px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
                <div className="col-inner">
                  <h4 className="title text-[20px] text-[#3391c2] font-semibold font-['Open_Sans'] pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                    {translate('information', locale)}
                  </h4>
                  <ul className="nav-list flex flex-col gap-[10px] mb-[10px]">
                    {menu?.items?.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="text-[13px] text-[#2380b1] font-normal font-['Open_Sans']"
                        >
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
                  <h4 className="title text-[20px] text-[#3391c2] font-semibold font-['Open_Sans'] pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                    {translate('shipment', locale)}
                  </h4>
                  <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px] mb-[10px]">
                    {translate('delivery_cost', locale)}{' '}
                    <strong>CHF 6.90</strong>
                  </p>
                  <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px] mb-[10px]">
                    {translate('free_delivery_of_order', locale)}{' '}
                    <strong>CHF 65.00</strong>
                  </p>
                  <div className="flex items-start gap-[5px]">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0787/1352/0419/files/rechnung.png?v=1688561840"
                      height="auto"
                      alt=""
                    />
                    <div className="flex">
                      <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px] mb-[10px]">
                        <strong className="font-semibold">
                          {translate('invoice', locale)}
                        </strong>
                        <br />
                        30 {translate('take_net', locale)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-[15px] w-[100%] md:w-[50%] lg:w-[25%] xl:w-[25%]">
                <div className="col-inner">
                  <h4 className="title text-[20px] text-[#3391c2] font-semibold font-['Open_Sans'] pb-[15px] lg:pb-[0px] mb-[5px] lg:mb-[40px] mt-[0px] lg:mt-[-35px] border-b lg:border-b-0 border-[#3890bf]">
                    {translate('contact', locale)}
                  </h4>
                  <div className="contact-info">
                    <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px] mb-[10px] ">
                      <b className="font-semibold">SWISSBABYSERVICE</b>
                      <br />
                      Schulstrasse 13a
                      <br />
                      9553 Bettwiesen
                      <br />
                    </p>
                    <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px] mb-[10px]">
                      <strong className="font-semibold">
                        FR 079 434 62 99
                      </strong>
                    </p>
                    <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px] mb-[10px]">
                      <strong className="font-semibold">
                        DE 052 720 58 58
                      </strong>
                    </p>
                    <p className="text-[13px] text-[#3391c2] font-normal font-['Open_Sans'] leading-[18px] mb-[10px]">
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
    </>
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
