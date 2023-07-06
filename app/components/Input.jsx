import clsx from 'clsx';

export function Input({className = '', type, variant, ...props}) {
  const variants = {
    search:
      'bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#2380B1] block w-full px-[12px] py-[6px] form-control',
    minisearch:
      'bg-white border border-[#92bcdd] text-gray-900 text-[14.4px] rounded-[4px] placeholder:text-[#2380B1] block w-full px-[12px] py-[6px] form-control',
  };

  const styles = clsx(variants[variant], className);

  return <input type={type} {...props} className={styles} />;
}
