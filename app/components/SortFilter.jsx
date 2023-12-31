import {useMemo, useState} from 'react';
import {Menu} from '@headlessui/react';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
  NavLink,
} from '@remix-run/react';
import {useDebounce} from 'react-use';
import {Disclosure} from '@headlessui/react';

import {
  Heading,
  IconFilters,
  IconCaret,
  IconXMark,
  Text,
  IconHome,
} from '~/components';
import {getMenuHandle, translate} from '~/lib/utils';

export function SortFilter({
  filters,
  appliedFilters = [],
  children,
  menudata = [],
  collections = [],
  locale,
  selectedHandle = null,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* <div className="flex items-center justify-between w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={
            'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5'
          }
        >
          <IconFilters />
        </button>
        <SortMenu />
      </div> */}
      <div
        className={`transition-all duration-200 w-[25%] hidden min-[992px]:block ${isOpen ? '' : ''}`}
      >
        <FiltersDrawer
          collections={collections}
          filters={filters}
          menudata={menudata}
          appliedFilters={appliedFilters}
          locale={locale}
          selectedHandle={selectedHandle}
        />
      </div>
      {/* <div className="w-[75%]">{children}</div> */}
    </>
  );
}

export function FiltersDrawer({
  filters = [],
  menudata = [],
  appliedFilters = [],
  collections = [],
  locale,
  selectedHandle,
}) {
  const [params] = useSearchParams();
  const location = useLocation();
  const [categoryName, setCategoryName] = useState('null');

  const filterMarkup = (filter, option) => {
    switch (filter.type) {
      case 'PRICE_RANGE':
        const min =
          params.has('minPrice') && !isNaN(Number(params.get('minPrice')))
            ? Number(params.get('minPrice'))
            : undefined;

        const max =
          params.has('maxPrice') && !isNaN(Number(params.get('maxPrice')))
            ? Number(params.get('maxPrice'))
            : undefined;

        return <PriceRangeFilter min={min} max={max} />;

      default:
        const to = getFilterLink(filter, option.input, params, location);
        return (
          <Link
            className="focus:underline hover:underline"
            prefetch="intent"
            to={to}
          >
            {option.label}
          </Link>
        );
    }
  };

  // const collectionsMarkup = collections.map((collection) => {
  //   return (
  //     <li key={collection.handle} className="pb-4">
  //       <Link
  //         to={`/collections/${collection.handle}`}
  //         className="focus:underline hover:underline"
  //         key={collection.handle}
  //         prefetch="intent"
  //       >
  //         {collection.title}
  //       </Link>
  //     </li>
  //   );
  // });

  return (
    <>
      <nav className="filter-list-wrap bg-[#978bbc] min-h-[245px] overflow-hidden px-[15px] py-[24px]">
        <Heading
          as="h4"
          size="lead"
          className="text-[#1C5F7B] text-[24px] xl:text-[28px] font-bold py-[27px] bg-[#CCDDF1] leading-none px-[30px] xl:px-[48px] hidden"
        >
          {translate('category', locale)}
        </Heading>
        <div className="px-[30px] xl:px-[48px] py-[27px] hidden">
          {appliedFilters.length > 0 ? (
            <div className="">
              <AppliedFilters filters={appliedFilters} />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-y-[10px]">
          {menudata?.map(
            (filter) =>
              filter.category.name != 'Home' && (
                <div key={filter?.category?.name}>
                  <ul
                    key={filter.category.name}
                    className="flex flex-col gap-y-[8px] filter-sub-items"
                  >
                    <li key={filter.category.name} className="">
                      <NavLink
                        className={`block border-none ${
                          selectedHandle === filter.category.handle
                            ? 'active bg-[#8f2999]'
                            : ''
                        } text-white p-[12px] transition-all duration-700 hover:bg-[#8f2999] font-['OpenSans'] rounded-[8px] text-[20px] leading-[1.2]`}
                        prefetch="intent"
                        to={getMenuHandle(filter.category)}
                      >
                        {translate(filter.category.name, locale)}
                      </NavLink>
                    </li>
                  </ul>

                  {/* <Disclosure
                    as="div"
                    key={filter.category.handle+categoryName}
                    id={filter.category.handle}
                    className="w-full"
                    defaultOpen={
                      filter.category.handle == categoryName ? true : false
                    }
                    >
                    {({open}) => (
                      <>
                        <Disclosure.Button className="flex justify-between items-center w-full text-[20px] text-[#292929] font-medium outline-none text-left">
                          <Text size="lead" className={'flex-1'}>{translate(filter.category.name,locale)}</Text>
                          <IconCaret direction={open ? 'up' : 'down'} />
                        </Disclosure.Button>
                        <Disclosure.Panel key={filter.category.name}>
                         
                          <ul
                            key={filter.category.name}
                            className="py-[18px] flex flex-col gap-y-[18px] filter-sub-items"
                          >
                           
                                  
                                  <li
                                    key={filter.category.name}
                                    className="text-[16px] text-[#292929] font-normal hover:text-[#0A627E] hover:font-bold"
                                  >
                                    <NavLink
                                      className="block border-none"
                                      prefetch="intent"
                                      to={  getMenuHandle(filter.category)}
                                    >
                                      {translate(filter.category.name,locale)}
                                    </NavLink>
                                  </li>
                             
                            
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure> */}
                </div>
              ),
          )}
        </div>
      </nav>
    </>
  );
}

function AppliedFilters({filters = []}) {
  const [params] = useSearchParams();
  const location = useLocation();
  return (
    <>
      <Heading as="h4" size="lead" className="pb-4">
        Applied filters
      </Heading>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          return (
            <Link
              to={getAppliedFilterLink(filter, params, location)}
              className="flex px-2 border rounded-full gap"
              key={`${filter.label}-${filter.urlParam}`}
            >
              <span className="flex-grow">{filter.label}</span>
              <span>
                <IconXMark />
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function getAppliedFilterLink(filter, params, location) {
  const paramsClone = new URLSearchParams(params);
  if (filter.urlParam.key === 'variantOption') {
    const variantOptions = paramsClone.getAll('variantOption');
    const filteredVariantOptions = variantOptions.filter(
      (options) => !options.includes(filter.urlParam.value),
    );
    paramsClone.delete(filter.urlParam.key);
    for (const filteredVariantOption of filteredVariantOptions) {
      paramsClone.append(filter.urlParam.key, filteredVariantOption);
    }
  } else {
    paramsClone.delete(filter.urlParam.key);
  }
  return `${location.pathname}?${paramsClone.toString()}`;
}

function getSortLink(sort, params, location) {
  params.set('sort', sort);
  return `${location.pathname}?${params.toString()}`;
}

function getFilterLink(filter, rawInput, params, location) {
  const paramsClone = new URLSearchParams(params);
  const newParams = filterInputToParams(filter.type, rawInput, paramsClone);
  return `${location.pathname}?${newParams.toString()}`;
}

const PRICE_RANGE_FILTER_DEBOUNCE = 500;

function PriceRangeFilter({max, min}) {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(min ? String(min) : '');
  const [maxPrice, setMaxPrice] = useState(max ? String(max) : '');

  useDebounce(
    () => {
      if (
        (minPrice === '' || minPrice === String(min)) &&
        (maxPrice === '' || maxPrice === String(max))
      )
        return;

      const price = {};
      if (minPrice !== '') price.min = minPrice;
      if (maxPrice !== '') price.max = maxPrice;

      const newParams = filterInputToParams('PRICE_RANGE', {price}, params);
      navigate(`${location.pathname}?${newParams.toString()}`);
    },
    PRICE_RANGE_FILTER_DEBOUNCE,
    [minPrice, maxPrice],
  );

  const onChangeMax = (event) => {
    const newMaxPrice = event.target.value;
    setMaxPrice(newMaxPrice);
  };

  const onChangeMin = (event) => {
    const newMinPrice = event.target.value;
    setMinPrice(newMinPrice);
  };

  return (
    <div className="flex flex-col">
      <label className="mb-4">
        <span>from</span>
        <input
          name="maxPrice"
          className="text-black"
          type="text"
          defaultValue={min}
          placeholder={'$'}
          onChange={onChangeMin}
        />
      </label>
      <label>
        <span>to</span>
        <input
          name="minPrice"
          className="text-black"
          type="number"
          defaultValue={max}
          placeholder={'$'}
          onChange={onChangeMax}
        />
      </label>
    </div>
  );
}

function filterInputToParams(type, rawInput, params) {
  const input = typeof rawInput === 'string' ? JSON.parse(rawInput) : rawInput;
  switch (type) {
    case 'PRICE_RANGE':
      if (input.price.min) params.set('minPrice', input.price.min);
      if (input.price.max) params.set('maxPrice', input.price.max);
      break;
    case 'LIST':
      Object.entries(input).forEach(([key, value]) => {
        if (typeof value === 'string') {
          params.set(key, value);
        } else if (typeof value === 'boolean') {
          params.set(key, value.toString());
        } else {
          const {name, value: val} = value;
          const allVariants = params.getAll(`variantOption`);
          const newVariant = `${name}:${val}`;
          if (!allVariants.includes(newVariant)) {
            params.append('variantOption', newVariant);
          }
        }
      });
      break;
  }

  return params;
}

export default function SortMenu() {
  const items = [
    {label: 'Featured', key: 'featured'},
    {
      label: 'Price: Low - High',
      key: 'price-low-high',
    },
    {
      label: 'Price: High - Low',
      key: 'price-high-low',
    },
    {
      label: 'Best Selling',
      key: 'best-selling',
    },
    {
      label: 'Newest',
      key: 'newest',
    },
  ];
  const [params] = useSearchParams();
  const location = useLocation();
  const activeItem = items.find((item) => item.key === params.get('sort'));

  return (
    <Menu as="div" className="relative z-40">
      <Menu.Button className="flex items-center">
        <span className="px-2">
          <span className="px-2 font-medium">Sort by:</span>
          <span>{(activeItem || items[0]).label}</span>
        </span>
        <IconCaret />
      </Menu.Button>

      <Menu.Items
        as="nav"
        className="absolute right-0 flex flex-col p-4 text-right rounded-sm bg-contrast"
      >
        {items.map((item) => (
          <Menu.Item key={item.label}>
            {() => (
              <Link
                className={`block text-sm pb-2 px-3 ${
                  activeItem?.key === item.key ? 'font-bold' : 'font-normal'
                }`}
                to={getSortLink(item.key, params, location)}
              >
                {item.label}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
