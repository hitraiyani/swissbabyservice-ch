import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';
import {useState} from 'react';

import {Link, IconArrowRight2, IconUsersCog,} from '~/components';
import {getInputStyleClasses} from '~/lib/utils';

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.locale ? `${params.locale}/account` : '/account');
  }

  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context}) => {
  const formData = await request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return badRequest({
      formError: 'Please provide an email.',
    });
  }

  try {
    await context.storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
      variables: {email},
    });

    return json({resetRequested: true});
  } catch (error) {
    return badRequest({
      formError: 'Something went wrong. Please try again later.',
    });
  }
};

export const meta = () => {
  return [{title: 'Recover Password'}];
};

export default function Recover() {
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const isSubmitted = actionData?.resetRequested;

  return (
    <div className="account-login mt-[48px]">
      <div className="container">
        <div className="flex gap-[30px] items-start flex-col min-[992px]:flex-row">
          <div className="w-full min-[992px]:w-[75%] flex-col md:flex-row">
            {isSubmitted ? (
              <>
                <h1 className="text-4xl">Request Sent.</h1>
                <p className="mt-4">
                  If that email address is in our system, you will receive an
                  email with instructions about how to reset your password in a
                  few minutes.
                </p>
              </>
            ) : (
              <>
                <div className="section-title flex items-center gap-[20px] mb-[35px]">
                  <h1 className='text-[30px] font-["Open_Sans"] leading-[1.3] font-semibold text-[#2380B1]'>
                    Forgot Password.
                  </h1>
                  <span className="flex-1 border-b-[1px] border-[#3890bf] relative before:bg-no-repeat before:content-[''] before:inline-block before:w-5 before:h-5 before:bg-[url('https://cdn.shopify.com/s/files/1/0787/1352/0419/files/heart.png?v=1688561823')] before:absolute before:z-[2] before:-mt-1.5 before:right-[5px] md:before:right-[15px] before:top-full"></span>
                </div>
                <div className="desc text-[13px] text-[#2380B1] font-['Open_Sans'] mb-[20px]">
                  <p>
                    Bitte die dem Konto zugeordnete Emailadresse eintragen und
                    mit Klick auf "Weiter" bestätigen. Es wird dann umgehend ein
                    neues Passwort an diese Emailadresse gesendet.
                  </p>
                </div>
                {/* TODO: Add onSubmit to validate _before_ submission with native? */}
                <h2 className='text-[#2380B1] text-[25px] font-["Open_Sans"] font-semibold mb-[10px]'>
                  Meine Emailadresse
                </h2>
                <Form
                  method="post"
                  noValidate
                  className="pt-6 pb-8 mt-4 mb-4 space-y-3"
                >
                  {actionData?.formError && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                      <p className="">
                        {actionData.formError}
                      </p>
                    </div>
                  )}
                  <div>
                    <label
                      className="text-[16px] font-bold leading-none text-[#2380B1] mb-[5px] block"
                      htmlFor="email"
                    >
                      Emailadresse
                    </label>
                    <input
                      className={`mb-1 ${getInputStyleClasses(
                        nativeEmailError,
                      )}`}
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
                  <div className="flex justify-start">
                    <button
                      className="hover:bg-[#9a2ea3] hover:text-white text-[#9a2ea3] border-[2px] border-[#9a2ea3] transition-all duration-500 py-[8px] px-[10px] rounded-[4px] flex items-center gap-[5px] text-[14px] leading-none"
                      type="submit"
                    >
                      Request Reset Link
                    </button>
                  </div>
                  <div className="btn-wrap flex">
                    <Link
                      className="hover:bg-[#9a2ea3] hover:text-white text-[#9a2ea3] border-[2px] border-[#9a2ea3] transition-all duration-500 py-[8px] px-[10px] rounded-[4px] flex items-center gap-[5px] text-[14px] leading-none w-fit"
                      to="/account/login"
                    >
                      Login
                    </Link>
                  </div>
                </Form>
              </>
            )}
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

const CUSTOMER_RECOVER_MUTATION = `#graphql
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
