import clsx from 'clsx';

function Icon({children, className, fill = 'currentColor', stroke, ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      {...props}
      fill={fill}
      stroke={stroke}
      className={clsx('w-5 h-5', className)}
    >
      {children}
    </svg>
  );
}
export function IconChevronRight(props) {
  return (
    <svg {...props}  width={14} height={27} viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M1.47949 1.47974L12.4795 13.4797L1.47949 25.4797" stroke="currentColor" strokeWidth={2} strokeLinecap="round" /> </svg>
  );
}
export function IconStar(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" > <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="m12 2l3.104 6.728l7.358.873l-5.44 5.03l1.444 7.268L12 18.28L5.534 21.9l1.444-7.268L1.538 9.6l7.359-.873L12 2Z" /> </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...props} width={22} height={12} viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M21.7479 5.39169C21.7477 5.39143 21.7475 5.39113 21.7472 5.39087L17.2568 0.922122C16.9204 0.587353 16.3762 0.588598 16.0414 0.925044C15.7066 1.26145 15.7079 1.80556 16.0443 2.14037L19.0591 5.14062H0.859375C0.384742 5.14062 0 5.52536 0 6C0 6.47463 0.384742 6.85937 0.859375 6.85937H19.0591L16.0443 9.85962C15.7079 10.1944 15.7066 10.7385 16.0414 11.075C16.3763 11.4114 16.9205 11.4126 17.2568 11.0779L21.7472 6.60912C21.7475 6.60886 21.7477 6.60856 21.748 6.60831C22.0846 6.27238 22.0835 5.7265 21.7479 5.39169Z" fill="currentColor" /> </svg>

  );
}

export function IconMenu(props) {
  return (
    <Icon {...props} stroke={props.stroke || 'currentColor'}>
      <title>Menu</title>
      <line x1="3" y1="6.375" x2="17" y2="6.375" strokeWidth="1.25" />
      <line x1="3" y1="10.375" x2="17" y2="10.375" strokeWidth="1.25" />
      <line x1="3" y1="14.375" x2="17" y2="14.375" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconClose(props) {
  return (
    <Icon {...props} stroke={props.stroke || 'currentColor'}>
      <title>Close</title>
      <line
        x1="4.44194"
        y1="4.30806"
        x2="15.7556"
        y2="15.6218"
        strokeWidth="1.25"
      />
      <line
        y1="-0.625"
        x2="16"
        y2="-0.625"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)"
        strokeWidth="1.25"
      />
    </Icon>
  );
}

export function IconArrow({direction = 'right'}) {
  let rotate;

  switch (direction) {
    case 'right':
      rotate = 'rotate-0';
      break;
    case 'left':
      rotate = 'rotate-180';
      break;
    case 'up':
      rotate = '-rotate-90';
      break;
    case 'down':
      rotate = 'rotate-90';
      break;
    default:
      rotate = 'rotate-0';
  }

  return (
    <Icon className={`w-5 h-5 ${rotate}`}>
      <title>Arrow</title>
      <path d="M7 3L14 10L7 17" strokeWidth="1.25" />
    </Icon>
  );
}
export function IconStar2(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" > <path fill="currentColor" d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z" /> </svg>
  );
}

export function IconArrowRight2(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m10 17l5-5l-5-5" /></svg>
  );
}
export function IconMail(props) {
  return (
    <svg {...props} width={16} height={12} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.8148 4.4707C14.932 4.38281 15.1078 4.4707 15.1078 4.61719V10.5938C15.1078 11.3848 14.4633 12 13.7016 12H1.51406C0.723047 12 0.107813 11.3848 0.107813 10.5938V4.61719C0.107813 4.4707 0.254297 4.38281 0.371485 4.4707C1.04531 4.99805 1.89492 5.64258 4.8832 7.81055C5.49844 8.25 6.55313 9.2168 7.60781 9.2168C8.6332 9.2168 9.71719 8.25 10.3031 7.81055C13.2914 5.64258 14.141 4.99805 14.8148 4.4707ZM7.60781 8.25C6.90469 8.2793 5.93789 7.40039 5.43984 7.04883C1.54336 4.23633 1.25039 3.97266 0.371485 3.26953C0.195704 3.15234 0.107813 2.94727 0.107813 2.71289V2.15625C0.107813 1.39453 0.723047 0.75 1.51406 0.75H13.7016C14.4633 0.75 15.1078 1.39453 15.1078 2.15625V2.71289C15.1078 2.94727 14.9906 3.15234 14.8148 3.26953C13.9359 3.97266 13.643 4.23633 9.74648 7.04883C9.24844 7.40039 8.28164 8.2793 7.60781 8.25Z" fill="currentColor" />
  </svg>
  );
}
export function IconPhone(props) {
  return (
    <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6684 11.4805C14.9027 11.5977 15.0785 11.8613 15.0785 12.1543C15.0785 12.1836 15.0785 12.2422 15.0785 12.3008L14.3754 15.3477C14.2875 15.6699 14.0238 15.875 13.7016 15.875C6.17227 15.875 0.107813 9.81055 0.107813 2.28125C0.107813 1.95898 0.312891 1.69531 0.635157 1.60742L3.68203 0.904297C3.74063 0.904297 3.79922 0.875 3.82852 0.875C4.12148 0.875 4.38516 1.05078 4.50234 1.31445L5.90859 4.5957C5.93789 4.68359 5.96719 4.77148 5.96719 4.85938C5.96719 5.09375 5.85 5.29883 5.70352 5.41602L3.91641 6.88086C5.00039 9.16602 6.8168 10.9824 9.10195 12.0664L10.5668 10.2793C10.684 10.1328 10.8891 10.0156 11.0941 10.0156C11.2113 10.0156 11.2992 10.0449 11.3871 10.0742L14.6684 11.4805Z" fill="currentColor"/>
    </svg>
    
  );
}

export function IconCaret({
  direction = 'down',
  stroke = 'currentColor',
  ...props
}) {
  let rotate;

  switch (direction) {
    case 'down':
      rotate = 'rotate-0';
      break;
    case 'up':
      rotate = 'rotate-180';
      break;
    case 'left':
      rotate = '-rotate-90';
      break;
    case 'right':
      rotate = 'rotate-90';
      break;
    default:
      rotate = 'rotate-0';
  }

  return (
    <Icon
      {...props}
      className={`w-5 h-5 transition ${rotate}`}
      fill="transparent"
      stroke={stroke}
    >
      <title>Caret</title>
      <path d="M14 8L10 12L6 8" strokeWidth="1.25" />
    </Icon>
  );
}
export function IconMinus(props) {
  return (
    <svg  {...props} width={13} height={4} viewBox="0 0 13 4" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M11.75 0.4375C12.2148 0.4375 12.625 0.847656 12.625 1.3125V2.1875C12.625 2.67969 12.2148 3.0625 11.75 3.0625H1.25C0.757812 3.0625 0.375 2.67969 0.375 2.1875V1.3125C0.375 0.847656 0.757812 0.4375 1.25 0.4375H11.75Z" fill="currentColor" /> </svg>
  );
}
export function IconPlus(props) {
  return (
    <svg {...props} width={13} height={13} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M11.75 5.4375C12.2148 5.4375 12.625 5.84766 12.625 6.3125V7.1875C12.625 7.67969 12.2148 8.0625 11.75 8.0625H7.8125V12C7.8125 12.4922 7.40234 12.875 6.9375 12.875H6.0625C5.57031 12.875 5.1875 12.4922 5.1875 12V8.0625H1.25C0.757812 8.0625 0.375 7.67969 0.375 7.1875V6.3125C0.375 5.84766 0.757812 5.4375 1.25 5.4375H5.1875V1.5C5.1875 1.03516 5.57031 0.625 6.0625 0.625H6.9375C7.40234 0.625 7.8125 1.03516 7.8125 1.5V5.4375H11.75Z" fill="currentColor" /> </svg>  
  );
}

export function IconSelect(props) {
  return (
    <Icon {...props}>
      <title>Select</title>
      <path d="M7 8.5L10 6.5L13 8.5" strokeWidth="1.25" />
      <path d="M13 11.5L10 13.5L7 11.5" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconBag(props) {
  return (
    <Icon {...props}>
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </Icon>
  );
}

export function IconLogin(props) {
  return (
    <Icon {...props}>
      <title>Login</title>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M8,10.6928545 C10.362615,10.6928545 12.4860225,11.7170237 13.9504747,13.3456144 C12.4860225,14.9758308 10.362615,16 8,16 C5.63738499,16 3.51397752,14.9758308 2.04952533,13.3472401 C3.51397752,11.7170237 5.63738499,10.6928545 8,10.6928545 Z"
          fill="currentColor"
        ></path>
        <path
          d="M8,3.5 C6.433,3.5 5.25,4.894 5.25,6.5 C5.25,8.106 6.433,9.5 8,9.5 C9.567,9.5 10.75,8.106 10.75,6.5 C10.75,4.894 9.567,3.5 8,3.5 Z"
          fill="currentColor"
          fillRule="nonzero"
        ></path>
      </g>
    </Icon>
  );
}

export function IconAccount(props) {
  return (
    <Icon {...props}>
      <title>Account</title>
      <path
        fillRule="evenodd"
        d="M9.9998 12.625c-1.9141 0-3.6628.698-5.0435 1.8611C3.895 13.2935 3.25 11.7221 3.25 10c0-3.728 3.022-6.75 6.75-6.75 3.7279 0 6.75 3.022 6.75 6.75 0 1.7222-.645 3.2937-1.7065 4.4863-1.3807-1.1632-3.1295-1.8613-5.0437-1.8613ZM10 18c-2.3556 0-4.4734-1.0181-5.9374-2.6382C2.7806 13.9431 2 12.0627 2 10c0-4.4183 3.5817-8 8-8s8 3.5817 8 8-3.5817 8-8 8Zm0-12.5c-1.567 0-2.75 1.394-2.75 3s1.183 3 2.75 3 2.75-1.394 2.75-3-1.183-3-2.75-3Z"
      />
    </Icon>
  );
}

export function IconHelp(props) {
  return (
    <Icon {...props}>
      <title>Help</title>
      <path d="M3.375 10a6.625 6.625 0 1 1 13.25 0 6.625 6.625 0 0 1-13.25 0ZM10 2.125a7.875 7.875 0 1 0 0 15.75 7.875 7.875 0 0 0 0-15.75Zm.699 10.507H9.236V14h1.463v-1.368ZM7.675 7.576A3.256 3.256 0 0 0 7.5 8.67h1.245c0-.496.105-.89.316-1.182.218-.299.553-.448 1.005-.448a1 1 0 0 1 .327.065c.124.044.24.113.35.208.108.095.2.223.272.383.08.154.12.34.12.558a1.3 1.3 0 0 1-.076.471c-.044.131-.11.252-.197.361-.08.102-.174.197-.283.285-.102.087-.212.182-.328.284a3.157 3.157 0 0 0-.382.383c-.102.124-.19.27-.262.438a2.476 2.476 0 0 0-.164.591 6.333 6.333 0 0 0-.043.81h1.179c0-.263.021-.485.065-.668a1.65 1.65 0 0 1 .207-.47c.088-.139.19-.263.306-.372.117-.11.244-.223.382-.34l.35-.306c.116-.11.218-.23.305-.361.095-.139.168-.3.219-.482.058-.19.087-.412.087-.667 0-.35-.062-.664-.186-.942a1.881 1.881 0 0 0-.513-.689 2.07 2.07 0 0 0-.753-.427A2.721 2.721 0 0 0 10.12 6c-.4 0-.764.066-1.092.197a2.36 2.36 0 0 0-.83.536c-.225.234-.4.515-.523.843Z" />
    </Icon>
  );
}

export function IconSearch(props) {
  return (
    <Icon {...props}>
      <title>Search</title>
      <path
        fillRule="evenodd"
        d="M13.3 8.52a4.77 4.77 0 1 1-9.55 0 4.77 4.77 0 0 1 9.55 0Zm-.98 4.68a6.02 6.02 0 1 1 .88-.88l4.3 4.3-.89.88-4.3-4.3Z"
      />
    </Icon>
  );
}

export function IconCheck({stroke = 'currentColor', ...props}) {
  return (
    <Icon {...props} fill="transparent" stroke={stroke}>
      <title>Check</title>
      <circle cx="10" cy="10" r="7.25" strokeWidth="1.25" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7.04 10.37 2.42 2.41 3.5-5.56"
      />
    </Icon>
  );
}

export function IconXMark({stroke = 'currentColor', ...props}) {
  return (
    <Icon {...props} fill="transparent" stroke={stroke}>
      <title>Delete</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </Icon>
  );
}

export function IconRemove(props) {
  return (
    <Icon {...props} fill="transparent" stroke={props.stroke || 'currentColor'}>
      <title>Remove</title>
      <path
        d="M4 6H16"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 6L6 17H14L14.5 6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L8 5C8 4 8.75 3 10 3C11.25 3 12 4 12 5V6"
        strokeWidth="1.25"
      />
    </Icon>
  );
}

export function IconFilters(props) {
  return (
    <Icon {...props} fill="transparent" stroke={props.stroke || 'currentColor'}>
      <title>Filters</title>
      <circle cx="4.5" cy="6.5" r="2" />
      <line x1="6" y1="6.5" x2="14" y2="6.5" />
      <line x1="4.37114e-08" y1="6.5" x2="3" y2="6.5" />
      <line x1="4.37114e-08" y1="13.5" x2="8" y2="13.5" />
      <line x1="11" y1="13.5" x2="14" y2="13.5" />
      <circle cx="9.5" cy="13.5" r="2" />
    </Icon>
  );
}
export function IconHome(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={512} height={512} viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69" /></svg>
  );
}

export function IconCart(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={512} height={512} viewBox="0 0 512 512" > <circle cx={176} cy={416} r={32} fill="currentColor" /> <circle cx={400} cy={416} r={32} fill="currentColor" /> <path fill="currentColor" d="M456.8 120.78a23.92 23.92 0 0 0-18.56-8.78H133.89l-6.13-34.78A16 16 0 0 0 112 64H48a16 16 0 0 0 0 32h50.58l45.66 258.78A16 16 0 0 0 160 368h256a16 16 0 0 0 0-32H173.42l-5.64-32h241.66A24.07 24.07 0 0 0 433 284.71l28.8-144a24 24 0 0 0-5-19.93Z" /> </svg>
  );
}
export function Iconclose2(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" > <path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4l-1.6 1.6z" /> </svg>
  );
}
export function IconShare(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={512} height={512} viewBox="0 0 512 512" > <path fill="currentColor" d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132c13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z" /> </svg>
  );
}
export function IconUser(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" > <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z" /> </svg>
  );
}
export function IconEnvelope(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={1792} height={1408} viewBox="0 0 1792 1408" > <path fill="currentColor" d="M1792 454v794q0 66-47 113t-113 47H160q-66 0-113-47T0 1248V454q44 49 101 87q362 246 497 345q57 42 92.5 65.5t94.5 48t110 24.5h2q51 0 110-24.5t94.5-48T1194 886q170-123 498-345q57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325q-10 7-42.5 30.5t-54 38t-52 32.5t-57.5 27t-50 9h-2q-23 0-50-9t-57.5-27t-52-32.5t-54-38T639 759q-91-64-262-182.5T172 434q-62-42-117-115.5T0 182q0-78 41.5-130T160 0h1472q65 0 112.5 47t47.5 113z" /></svg>
  );
}
export function IconLock(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" > <path fill="currentColor" d="M18 10H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3h2c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-7.939 5.499A2.002 2.002 0 0 1 14 16a1.99 1.99 0 0 1-1 1.723V20h-2v-2.277a1.992 1.992 0 0 1-.939-2.224z" /> </svg>
  );
}
export function IconUsersCog(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={640} height={512} viewBox="0 0 640 512" > <path fill="currentColor" d="M610.5 341.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5c-6.7-21.6-18.2-41.2-33.2-57.4c-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1c-22.3-5-45-4.8-66.2 0c-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4c-15 16.2-26.5 35.8-33.2 57.4c-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5c6.7 21.6 18.2 41.1 33.2 57.4c2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1c22.3 5 45 4.8 66.2 0c3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4c15-16.2 26.5-35.8 33.2-57.4c1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 368.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5s48.5 21.8 48.5 48.5s-21.7 48.5-48.5 48.5zM96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64zm224 32c1.9 0 3.7-.5 5.6-.6c8.3-21.7 20.5-42.1 36.3-59.2c7.4-8 17.9-12.6 28.9-12.6c6.9 0 13.7 1.8 19.6 5.3l7.9 4.6c.8-.5 1.6-.9 2.4-1.4c7-14.6 11.2-30.8 11.2-48c0-61.9-50.1-112-112-112S208 82.1 208 144c0 61.9 50.1 112 112 112zm105.2 194.5c-2.3-1.2-4.6-2.6-6.8-3.9c-8.2 4.8-15.3 9.8-27.5 9.8c-10.9 0-21.4-4.6-28.9-12.6c-18.3-19.8-32.3-43.9-40.2-69.6c-10.7-34.5 24.9-49.7 25.8-50.3c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-3.8-2.2-7-5-9.8-8.1c-3.3.2-6.5.6-9.8.6c-24.6 0-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h255.4c-3.7-6-6.2-12.8-6.2-20.3v-9.2zM173.1 274.6C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" /> </svg>
  );
}
export function IconSearch2(props) {
  return (
    <svg {...props} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M9.33925 18.6781C11.617 18.6781 13.6878 17.8704 15.3028 16.5037L22.5505 23.7514C22.7161 23.9172 22.9232 24 23.151 24C23.3788 24 23.5858 23.9172 23.7514 23.7514C24.0829 23.4202 24.0829 22.8817 23.7514 22.5505L16.5038 15.3027C17.8497 13.6876 18.6782 11.596 18.6782 9.33913C18.6782 4.18284 14.4952 0 9.33908 0C4.20358 0 0 4.2036 0 9.33913C0 14.4954 4.20358 18.6783 9.33908 18.6783L9.33925 18.6781ZM9.33925 1.69754C13.5636 1.69754 16.9802 5.13505 16.9802 9.33896C16.9802 13.5634 13.5635 16.9799 9.33925 16.9799C5.11486 16.9799 1.69787 13.5424 1.69787 9.33896C1.69787 5.13518 5.13537 1.69754 9.33925 1.69754Z" fill="currentColor" /> </svg>
  );
}
export function IconCart2(props) {
  return (
    <svg {...props} width={25} height={23} viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M22.2323 13.8844C22.4142 13.8882 22.5918 13.8295 22.7343 13.7185C22.8767 13.6075 22.9751 13.4513 23.0124 13.2767L24.9626 4.10385C24.986 3.9925 24.9839 3.87743 24.9562 3.76701C24.9285 3.65659 24.8761 3.55361 24.8027 3.46557C24.728 3.37536 24.6334 3.303 24.5259 3.254C24.4184 3.20499 24.301 3.18062 24.1825 3.18274H6.24064L5.8506 1.1265C5.81574 0.949828 5.7184 0.790874 5.57571 0.677616C5.43302 0.564357 5.25412 0.504057 5.07052 0.507329H0.780081C0.57319 0.507329 0.374774 0.587864 0.22848 0.731217C0.0821868 0.874571 0 1.069 0 1.27173C0 1.47447 0.0821868 1.66889 0.22848 1.81225C0.374774 1.9556 0.57319 2.03614 0.780081 2.03614H4.42696L7.41077 17.0873V17.1331C7.41077 17.1331 7.41077 17.1637 7.41077 17.179C6.88405 17.4194 6.44935 17.8182 6.16989 18.3175C5.89043 18.8167 5.78079 19.3902 5.85692 19.9547C5.93305 20.5192 6.19098 21.0451 6.59318 21.4561C6.99539 21.867 7.5209 22.1415 8.09327 22.2396C8.66564 22.3377 9.25503 22.2543 9.7757 22.0015C10.2964 21.7488 10.7212 21.3398 10.9883 20.8342C11.2554 20.3285 11.351 19.7526 11.261 19.19C11.1711 18.6275 10.9003 18.1078 10.4882 17.7064H18.7648C18.3583 18.0954 18.0857 18.5989 17.9851 19.1469C17.8845 19.6949 17.9608 20.2599 18.2035 20.7634C18.4462 21.2668 18.8431 21.6835 19.3389 21.9554C19.8347 22.2273 20.4048 22.3408 20.9696 22.2802C21.5344 22.2196 22.0658 21.9878 22.4898 21.6171C22.9138 21.2465 23.2092 20.7555 23.3349 20.2125C23.4606 19.6695 23.4102 19.1017 23.1909 18.588C22.9716 18.0744 22.5942 17.6406 22.1114 17.3472C22.1851 17.2316 22.2259 17.0989 22.2297 16.9627C22.2334 16.8265 22.2 16.6917 22.1327 16.5725C22.0655 16.4532 21.967 16.3537 21.8473 16.2843C21.7277 16.2148 21.5913 16.178 21.4522 16.1776H8.83441L8.37807 13.8844H22.2323ZM23.223 4.71155L21.5965 12.3556H8.07383L6.54878 4.71155H23.223ZM8.58089 20.764C8.34946 20.764 8.12323 20.6968 7.9308 20.5708C7.73838 20.4448 7.5884 20.2657 7.49984 20.0562C7.41127 19.8467 7.3881 19.6162 7.43325 19.3937C7.4784 19.1713 7.58984 18.967 7.75349 18.8067C7.91713 18.6463 8.12563 18.5371 8.35261 18.4929C8.57959 18.4486 8.81486 18.4713 9.02867 18.5581C9.24248 18.6449 9.42523 18.7919 9.55381 18.9804C9.68238 19.169 9.75101 19.3907 9.75101 19.6174C9.75101 19.9215 9.62773 20.2132 9.40829 20.4282C9.18885 20.6432 8.89122 20.764 8.58089 20.764ZM20.6721 20.764C20.4407 20.764 20.2145 20.6968 20.0221 20.5708C19.8296 20.4448 19.6796 20.2657 19.5911 20.0562C19.5025 19.8467 19.4793 19.6162 19.5245 19.3937C19.5696 19.1713 19.6811 18.967 19.8447 18.8067C20.0084 18.6463 20.2169 18.5371 20.4439 18.4929C20.6708 18.4486 20.9061 18.4713 21.1199 18.5581C21.3337 18.6449 21.5165 18.7919 21.6451 18.9804C21.7736 19.169 21.8423 19.3907 21.8423 19.6174C21.8423 19.9215 21.719 20.2132 21.4995 20.4282C21.2801 20.6432 20.9825 20.764 20.6721 20.764Z" fill="currentColor" /> </svg>
  );
}
export function IconUser2(props) {
  return (
    <svg {...props} width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M20.377 16.2254L20.377 16.2254C19.2319 14.5486 17.6369 13.2329 15.7789 12.4267C14.5071 13.2472 13.023 13.686 11.5035 13.686C9.98385 13.686 8.49973 13.2471 7.22775 12.4266C5.36868 13.2316 3.77215 14.5472 2.62567 16.2241C1.41153 18.0002 0.758396 20.0993 0.750074 22.2502H22.2499C22.2423 20.1001 21.59 18.0013 20.377 16.2254Z" stroke="currentColor" strokeWidth="1.5" /> <path d="M6.5 5.75C6.5 8.51143 8.73857 10.75 11.5 10.75C14.2614 10.75 16.5 8.51143 16.5 5.75C16.5 2.98857 14.2614 0.75 11.5 0.75C8.73857 0.75 6.5 2.98857 6.5 5.75Z" stroke="currentColor" strokeWidth="1.5" /> </svg>
  );
}
export function IconCart3(props) {
  return (
    <svg {...props} width={33} height={29} viewBox="0 0 33 29" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M29.3906 17.6841C29.6312 17.6891 29.8659 17.6115 30.0542 17.4648C30.2426 17.3181 30.3726 17.1115 30.4219 16.8807L33 4.75439C33.031 4.60719 33.0281 4.45506 32.9916 4.30909C32.955 4.16312 32.8857 4.02699 32.7886 3.9106C32.6899 3.79134 32.5648 3.69568 32.4227 3.6309C32.2807 3.56611 32.1254 3.5339 31.9688 3.5367H8.25L7.73438 0.818388C7.68829 0.584837 7.5596 0.374703 7.37097 0.224978C7.18233 0.0752529 6.94584 -0.0044635 6.70312 -0.000137963H1.03125C0.757746 -0.000137963 0.495443 0.106328 0.302046 0.295838C0.108649 0.485349 0 0.74238 0 1.01039C0 1.2784 0.108649 1.53543 0.302046 1.72494C0.495443 1.91445 0.757746 2.02091 1.03125 2.02091H5.85234L9.79688 21.9182V21.9788C9.79688 21.9788 9.79688 22.0192 9.79688 22.0394C9.10057 22.3573 8.5259 22.8845 8.15646 23.5445C7.78702 24.2044 7.64209 24.9626 7.74273 25.7089C7.84337 26.4551 8.18434 27.1504 8.71605 27.6937C9.24776 28.2369 9.94247 28.5998 10.6991 28.7294C11.4558 28.8591 12.235 28.7489 12.9233 28.4147C13.6116 28.0806 14.1732 27.54 14.5263 26.8715C14.8795 26.2031 15.0058 25.4416 14.8869 24.698C14.768 23.9544 14.41 23.2673 13.8652 22.7367H24.8067C24.2693 23.2509 23.9089 23.9166 23.7759 24.641C23.6429 25.3654 23.7438 26.1124 24.0646 26.7779C24.3854 27.4435 24.9101 27.9943 25.5656 28.3538C26.2211 28.7132 26.9747 28.8633 27.7213 28.7832C28.468 28.703 29.1705 28.3966 29.731 27.9066C30.2915 27.4166 30.6821 26.7675 30.8482 26.0497C31.0144 25.3319 30.9478 24.5812 30.6579 23.9022C30.368 23.2232 29.8691 22.6497 29.2308 22.2618C29.3282 22.109 29.3822 21.9335 29.3872 21.7535C29.3921 21.5734 29.3479 21.3953 29.259 21.2376C29.1701 21.08 29.0399 20.9484 28.8817 20.8566C28.7235 20.7649 28.5432 20.7162 28.3594 20.7157H11.6789L11.0756 17.6841H29.3906ZM30.7003 5.55776L28.5502 15.663H10.6734L8.65734 5.55776H30.7003ZM11.3438 26.7788C11.0378 26.7788 10.7387 26.6899 10.4844 26.5234C10.23 26.3568 10.0317 26.1201 9.91462 25.8431C9.79754 25.5661 9.76691 25.2613 9.8266 24.9673C9.88628 24.6733 10.0336 24.4032 10.2499 24.1912C10.4663 23.9792 10.7419 23.8348 11.042 23.7764C11.342 23.7179 11.6531 23.7479 11.9357 23.8626C12.2184 23.9773 12.46 24.1716 12.6299 24.4209C12.7999 24.6702 12.8906 24.9632 12.8906 25.263C12.8906 25.665 12.7277 26.0506 12.4376 26.3348C12.1475 26.6191 11.754 26.7788 11.3438 26.7788ZM27.3281 26.7788C27.0222 26.7788 26.7231 26.6899 26.4687 26.5234C26.2143 26.3568 26.0161 26.1201 25.899 25.8431C25.7819 25.5661 25.7513 25.2613 25.811 24.9673C25.8707 24.6733 26.018 24.4032 26.2343 24.1912C26.4507 23.9792 26.7263 23.8348 27.0263 23.7764C27.3264 23.7179 27.6374 23.7479 27.9201 23.8626C28.2027 23.9773 28.4443 24.1716 28.6143 24.4209C28.7843 24.6702 28.875 24.9632 28.875 25.263C28.875 25.665 28.712 26.0506 28.4219 26.3348C28.1318 26.6191 27.7384 26.7788 27.3281 26.7788Z" fill="currentColor" /> <path d="M16.7578 11.6211H18.8203V13.6422C18.8203 13.9102 18.929 14.1672 19.1224 14.3567C19.3158 14.5462 19.5781 14.6527 19.8516 14.6527C20.1251 14.6527 20.3874 14.5462 20.5808 14.3567C20.7742 14.1672 20.8828 13.9102 20.8828 13.6422V11.6211H22.9453C23.2188 11.6211 23.4811 11.5146 23.6745 11.3251C23.8679 11.1356 23.9766 10.8786 23.9766 10.6106C23.9766 10.3426 23.8679 10.0855 23.6745 9.89604C23.4811 9.70653 23.2188 9.60006 22.9453 9.60006H20.8828V7.57901C20.8828 7.311 20.7742 7.05397 20.5808 6.86446C20.3874 6.67495 20.1251 6.56848 19.8516 6.56848C19.5781 6.56848 19.3158 6.67495 19.1224 6.86446C18.929 7.05397 18.8203 7.311 18.8203 7.57901V9.60006H16.7578C16.4843 9.60006 16.222 9.70653 16.0286 9.89604C15.8352 10.0855 15.7266 10.3426 15.7266 10.6106C15.7266 10.8786 15.8352 11.1356 16.0286 11.3251C16.222 11.5146 16.4843 11.6211 16.7578 11.6211Z" fill="currentColor" /> </svg>
  );
}
