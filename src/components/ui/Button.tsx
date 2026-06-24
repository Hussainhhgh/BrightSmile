import React from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-transform focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants: Record<Variant, string> = {
    primary: 'btn-primary text-white',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      {...rest}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
