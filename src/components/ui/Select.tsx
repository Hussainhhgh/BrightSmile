import React from 'react';
import clsx from 'clsx';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export default function Select({ label, className, children, ...rest }: Props) {
  return (
    <div>
      {label && <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>}
      <select
        {...rest}
        className={clsx('w-full px-4 py-2.5 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 bg-white cursor-pointer input-focus', className)}
      >
        {children}
      </select>
    </div>
  );
}
