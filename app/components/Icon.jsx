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
