import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useActionData, useLoaderData} from '@remix-run/react';
import {useState} from 'react';

import {getInputStyleClasses} from '~/lib/utils';
import {
  IconArrowRight2,
  IconEnvelope,
  IconLock,
  IconUser,
  IconUsersCog,
  Link,
} from '~/components';

export const handle = {
  isPublic: true,
};

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.locale ? `${params.locale}/account` : '/account');
  }

  // TODO: Query for this?
  return json({shopName: 'Hydrogen'});
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
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

  const {session, storefront} = context;

  try {
    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.locale ? `/${params.locale}/account` : '/account', {
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
        'Sorry. We did not recognize either your email or password. Please try to sign in again or create a new account.',
    });
  }
};

export const meta = () => {
  return [{title: 'Login'}];
};

export default function Login() {
  const {shopName} = useLoaderData();
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);

  return (
    <>
      <div className="account-login mt-[48px]">
        <div className="container">
          <div className="section-title flex items-center gap-[20px] mb-[35px]">
            <h1 className='text-[30px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
              Anmeldung
            </h1>
            <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
          </div>
          <div className="flex gap-[30px] items-start flex-col min-[992px]:flex-row">
            <div className="flex gap-[30px] w-full min-[992px]:w-[75%] flex-col md:flex-row">
              <div className="left-col w-full md:w-[50%]">
                <div className="bg-white p-[16px] h-full flex flex-col shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)]">
                  <h2 className='text-[#2380B1] text-[25px] font-["Open_Sans"] font-semibold mb-[10px]'>
                    Ich habe noch kein Konto
                  </h2>
                  <div className="desc text-[13px] text-[#2380B1] font-['Open_Sans'] mb-[20px]">
                    <p>Neues Konto anlegen</p>
                    <p>
                      Mit dem Anlegen eines Kontos kann der Auftragsstatus
                      nachverfolgt, bisherige Bestellungen angesehen, sowie
                      persönliche Daten bearbeitet werden.
                    </p>
                  </div>
                  <div className="btn-wrap justify-end flex mt-auto">
                    <a
                      href="/account/register"
                      className="hover:bg-[#9a2ea3] hover:text-white text-[#9a2ea3] border-[2px] border-[#9a2ea3] transition-all duration-500 py-[8px] px-[10px] rounded-[4px] flex items-center gap-[5px] text-[14px] leading-none"
                    >
                      <IconUser className={'w-[20px] h-[20px]'} /> Weiter
                    </a>
                  </div>
                </div>
              </div>
              <div className="right-col w-full md:w-[50%]">
                <div className="bg-white p-[16px] h-full flex flex-col shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)]">
                  <h2 className='text-[#2380B1] text-[25px] font-["Open_Sans"] font-semibold mb-[10px]'>
                    Ich bin bereits Kunde
                  </h2>
                  <div className="desc text-[13px] text-[#2380B1] font-['Open_Sans']">
                    <p>Bitte anmelden </p>
                  </div>
                  <Form method="post" noValidate className="mt-[20px]">
                    {actionData?.formError && (
                      <div className="flex items-center justify-center mb-6 bg-zinc-500">
                        <p className="m-4 text-s text-contrast">
                          {actionData.formError}
                        </p>
                      </div>
                    )}
                    <div className="mb-[20px]">
                      <label
                        className="text-[16px] font-bold leading-none text-[#2380B1] mb-[5px] block"
                        htmlFor="email"
                      >
                        Emailadresse
                      </label>
                      <div className="input-group flex">
                        <div className="icon w-[46px] flex items-center justify-center border-[1px] border-[#ced4da] text-[#495057] bg-[#e9ecef] border-r-0">
                          <IconEnvelope className="w-[15px] h-[15px]" />
                        </div>
                        <input
                          className={`mb-1 ${getInputStyleClasses(
                            nativeEmailError,
                          )}`}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          placeholder="Emailadresse"
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
                      </div>
                      {nativeEmailError && (
                        <p className="text-red-500 text-xs">
                          {nativeEmailError} &nbsp;
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        className="text-[16px] font-bold leading-none text-[#2380B1] mb-[5px] block"
                        htmlFor="password"
                      >
                        Passwort
                      </label>
                      <div className="input-group flex">
                        <div className="icon w-[46px] flex items-center justify-center border-[1px] border-[#ced4da] text-[#495057] bg-[#e9ecef] border-r-0">
                          <IconLock className="w-[20px] h-[20px]" />
                        </div>
                        <input
                          className={`mb-1 ${getInputStyleClasses(
                            nativePasswordError,
                          )}`}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Passwort"
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
                      </div>
                      {nativePasswordError && (
                        <p className="text-red-500 text-xs">
                          {nativePasswordError} &nbsp;
                        </p>
                      )}
                    </div>
                    <Link
                      className="inline-block text-[16px] my-[10px] text-[#2380b1]"
                      to="/account/recover"
                    >
                      Passwort vergessen
                    </Link>
                    <div className="flex justify-end">
                      <button
                        className="hover:bg-[#9a2ea3] hover:text-white text-[#9a2ea3] border-[2px] border-[#9a2ea3] transition-all duration-500 py-[8px] px-[10px] rounded-[4px] flex items-center gap-[5px] text-[14px] leading-none"
                        type="submit"
                        disabled={!!(nativePasswordError || nativeEmailError)}
                      >
                        <IconLock className={'w-[20px] h-[20px]'} /> Anmelden
                      </button>
                    </div>
                    {/* <div className="flex justify-between items-center mt-8 border-t border-gray-300">
                      <p className="align-baseline text-sm mt-6">
                        New to {shopName}? &nbsp;
                        <Link
                          className="inline underline"
                          to="/account/register"
                        >
                          Create an account
                        </Link>
                      </p>
                      
                    </div> */}
                  </Form>
                </div>
              </div>
            </div>
            <div className="siderbar-col w-full min-[992px]:w-[25%]">
              <div className="title flex items-center text-[14px] text-[#2380B1] border-b-[1px] px-[20px] py-[12px] border-[#00000020] gap-[5px]">
                <div className="icon">
                  <IconUsersCog className="w-[20px] h-[20px]" />
                </div>
                <p>KONTO</p>
              </div>
              <ul className='px-[20px] py-[12px]'>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Anmelden</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Registrieren</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Password vergessen</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Adressen</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Wunschliste</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Auftragsverlauf</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Bonuspunkte</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Transaktionen</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Newsletter</a></li>
                <li><a href="#" className='flex items-center gap-[5px] text-[16px] text-[#2380b1] py-[8px] px-[16px] pl-0 hover:text-[#2A6496]'><IconArrowRight2 className="w-[20px] h-[20px]"/> Abonnements</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center my-24 px-4"> */}
      {/* <div className="max-w-md w-full"> */}
      {/* <h1 className="text-4xl">Sign in.</h1> */}
      {/* TODO: Add onSubmit to validate _before_ submission with native? */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

const LOGIN_MUTATION = `#graphql
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export async function doLogin({storefront}, {email, password}) {
  const data = await storefront.mutate(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    return data.customerAccessTokenCreate.customerAccessToken.accessToken;
  }

  /**
   * Something is wrong with the user's input.
   */
  throw new Error(
    data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
  );
}
