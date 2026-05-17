import React, { InputHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-surface-200 mb-1.5">
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex h-10 w-full rounded-md border bg-surface-800 px-3 py-2 text-sm text-white',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-surface-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent',
            'disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
            error ? 'border-red-500 focus-visible:ring-red-500' : 'border-surface-600 hover:border-surface-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400 animate-fade-in">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
