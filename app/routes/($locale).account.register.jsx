import {redirect, json} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';
import {useState} from 'react';

import {getInputStyleClasses} from '~/lib/utils';
import {
  Link,
  IconArrowRight2,
  IconUsersCog,
  IconArrowRight,
} from '~/components';

import {doLogin} from './($locale).account.login';

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.locale ? `${params.locale}/account` : '/account');
  }

  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
  const {session, storefront} = context;
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return badRequest({
      formError: 'Please provide both an email and a password.',
    });
  }

  try {
    const data = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password},
      },
    });

    if (!data?.customerCreate?.customer?.id) {
      /**
       * Something is wrong with the user's input.
       */
      throw new Error(data?.customerCreate?.customerUserErrors.join(', '));
    }

    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.locale ? `${params.locale}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      return badRequest({
        formError: 'Something went wrong. Please try again later.',
      });
    }

    /**
     * The user did something wrong, but the raw error from the API is not super friendly.
     * Let's make one up.
     */
    return badRequest({
      formError:
        'Sorry. We could not create an account with this email. User might already exist, try to login instead.',
    });
  }
};

export const meta = () => {
  return [{title: 'Register'}];
};

export default function Register() {
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);

  return (
    <div className="account-login mt-[48px]">
      <div className="container">
        <div className="flex gap-[30px] items-start flex-col min-[992px]:flex-row">
          <div className="w-full min-[992px]:w-[75%] flex-col md:flex-row">
            <div className="section-title flex items-center gap-[20px] mb-[35px]">
              <h1 className='text-[30px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
                Create an Account.
              </h1>
              <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
            </div>
            <div className="desc text-[13px] text-[#2380B1] font-['Open_Sans'] mb-[20px]">
              <p> Falls bereits ein Konto in diesem Shop vorhanden ist, bitte <Link to="/account/login" className="underline">hier</Link> anmelden </p>
            </div>
            <form action="">
              <h2 className='text-[#2380B1] text-[25px] font-["Open_Sans"] font-normal mb-[20px]'>
                Persönliche Angaben
              </h2>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-gender"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Anrede
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-radio"
                      type="radio"
                      defaultValue=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-white border-[#333333] focus:ring-blue-500"
                    />
                    <label
                      htmlFor="inline-radio"
                      className="ml-2 text-[16px] font-normal text-[#2380B1]"
                    >
                      Herr
                    </label>
                  </div>
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-2-radio"
                      type="radio"
                      defaultValue=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-white border-[#333333] focus:ring-blue-500"
                    />
                    <label
                      htmlFor="inline-2-radio"
                      className="ml-2 text-[16px] font-normal text-[#2380B1]"
                    >
                      Frau
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-1"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Vorname
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-1"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-2"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Nachname
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-2"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-3"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  E-Mail
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-3"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-4"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Telefon
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-4"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-5"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  Fax
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-5"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-6"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  Firma
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-7"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <h2 className='text-[#2380B1] text-[25px] font-["Open_Sans"] font-normal mb-[20px]'>
                Meine Adresse
              </h2>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-8"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Strasse
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-8"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-9"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  Adresszusatz
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <input
                    id="input-9"
                    type="text"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 "
                  />
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-10"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Postleitzahl/Ort
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <div className="flex gap-[15px] w-full">
                    <input
                      id="input-11"
                      type="text"
                      className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 flex-1"
                    />
                    <input
                      id="input-111"
                      type="text"
                      className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="countries"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Land
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <select
                    id="countries"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 flex-1"
                  >
                    <option selected="">Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="kanton"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Kanton/Gebiet
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <select
                    id="kanton"
                    className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 flex-1"
                  >
                    <option selected="">Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
              <h2 className='text-[#2380B1] text-[25px] font-["Open_Sans"] font-normal mb-[20px]'>
                Passwort
              </h2>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-13"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Passwort
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <div className="flex gap-[15px] w-full">
                    <input
                      id="input-13"
                      type="text"
                      className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-14"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  <span className="text-[#cc0000] font-semibold pr-[2px]">
                    *
                  </span>
                  Wiederholung
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <div className="flex gap-[15px] w-full">
                    <input
                      id="input-14"
                      type="text"
                      className="bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#6c757d] block w-full px-[12px] py-[6px] form-control !m-0 flex-1"
                    />
                  </div>
                </div>
              </div>
              <h2 className='text-[#2380B1] text-[25px] font-["Open_Sans"] font-normal mb-[20px]'>
                Newsletter
              </h2>
              <div className="form-group flex flex-col md:flex-row gap-y-[15px] gap-x-[30px] items-center mb-[20px]">
                <label
                  htmlFor="input-15"
                  className="w-full md:w-[25%] font-normal text-[16px] text-[#2380B1] text-left md:text-right"
                >
                  Anmelden (Abmeldung ist jederzeit möglich)
                </label>
                <div className="flex flex-wrap w-full md:w-[75%]">
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-radio22"
                      type="radio"
                      defaultValue=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-white border-[#333333] focus:ring-blue-500"
                    />
                    <label
                      htmlFor="inline-radio22"
                      className="ml-2 text-[16px] font-normal text-[#2380B1]"
                    >
                      Ja
                    </label>
                  </div>
                  <div className="flex items-center mr-4">
                    <input
                      id="inline-2-radio22"
                      type="radio"
                      defaultValue=""
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-white border-[#333333] focus:ring-blue-500"
                    />
                    <label
                      htmlFor="inline-2-radio22"
                      className="ml-2 text-[16px] font-normal text-[#2380B1]"
                    >
                      Nein
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="link-checkbox"
                  className="font-normal text-[16px] text-[#2380B1] mr-2"
                >
                  <strong>Soziales Engagement</strong> habe ich gelesen und bin
                  einverstanden.
                </label>
                <input
                  id="link-checkbox"
                  type="checkbox"
                  defaultValue=""
                  className="w-4 h-4 text-blue-600 bg-white border-[#333333] rounded focus:ring-0 focus:ring-transparent focus:shadow-none"
                />
              </div>
              <div className="btn-wrap mt-[30px]">
                <button className="hover:bg-[#9a2ea3] uppercase font-semibold hover:text-white text-[#9a2ea3] border-[2px] border-[#9a2ea3] transition-all duration-500 py-[10px] px-[20px] rounded-[4px] flex items-center gap-[5px]">
                  <IconArrowRight />
                  Weiter
                </button>
              </div>
            </form>
            {/* <Form
              method="post"
              noValidate
              className="pt-6 pb-8 mt-4 mb-4 space-y-3"
            >
              {actionData?.formError && (
                <div className="flex items-center justify-center mb-6 bg-zinc-500">
                  <p className="m-4 text-s text-contrast">
                    {actionData.formError}
                  </p>
                </div>
              )}
              <div>
                <input
                  className={`${getInputStyleClasses(nativeEmailError)}`}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  aria-label="Email address"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  onBlur={(event) => {
                    setNativeEmailError(
                      event.currentTarget.value.length &&
                        !event.currentTarget.validity.valid
                        ? 'Invalid email address'
                        : null,
                    );
                  }}
                />
                {nativeEmailError && (
                  <p className="text-red-500 text-xs">
                    {nativeEmailError} &nbsp;
                  </p>
                )}
              </div>
              <div>
                <input
                  className={`${getInputStyleClasses(
                    nativePasswordError,
                  )}`}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  aria-label="Password"
                  minLength={8}
                  required
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  onBlur={(event) => {
                    if (
                      event.currentTarget.validity.valid ||
                      !event.currentTarget.value.length
                    ) {
                      setNativePasswordError(null);
                    } else {
                      setNativePasswordError(
                        event.currentTarget.validity.valueMissing
                          ? 'Please enter a password'
                          : 'Passwords must be at least 8 characters',
                      );
                    }
                  }}
                />
                {nativePasswordError && (
                  <p className="text-red-500 text-xs">
                    {' '}
                    {nativePasswordError} &nbsp;
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
                  type="submit"
                  disabled={!!(nativePasswordError || nativeEmailError)}
                >
                  Create Account
                </button>
              </div>
              <div className="flex items-center mt-8 border-t border-gray-300">
                <p className="align-baseline text-sm mt-6">
                  Already have an account? &nbsp;
                  <Link className="inline underline" to="/account/login">
                    Sign in
                  </Link>
                </p>
              </div>
            </Form> */}
          </div>
          <div className="siderbar-col w-full min-[992px]:w-[25%]">
            <div className="title flex items-center text-[14px] text-[#2380B1] border-b-[1px] px-[20px] py-[12px] border-[#00000020] gap-[5px]">
              <div className="icon">
                <IconUsersCog className="w-[20px] h-[20px]" />
              </div>
              <p>KONTO</p>
            </div>
            <ul className="px-[20px] py-[12px]">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Anmelden
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Registrieren
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Password
                  vergessen
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Adressen
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Wunschliste
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" />{' '}
                  Auftragsverlauf
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Bonuspunkte
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" />{' '}
                  Transaktionen
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Newsletter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]"
                >
                  <IconArrowRight2 className="w-[20px] h-[20px]" /> Abonnements
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
