// File: src/components/ui/Button.jsx
// =================================================================================
import React from 'react';
const cn = (...classes) => classes.filter(Boolean).join(' ');

export function Button({ variant = 'primary', size = 'md', className, children, ...props }) {
    const sizeClasses = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 py-2', lg: 'h-11 rounded-md px-8' };
    const variantClasses = {
        primary: 'bg-slate-800 text-white hover:bg-slate-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-slate-300 bg-transparent hover:bg-slate-100',
        ghost: 'hover:bg-slate-100'
    };
    return <button className={cn('inline-flex items-center justify-center rounded-md font-medium transition-colors', sizeClasses[size], variantClasses[variant], className)} {...props}>{children}</button>;
}