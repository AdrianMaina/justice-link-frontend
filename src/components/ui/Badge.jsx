// File: src/components/ui/Badge.jsx
// =================================================================================
import React from 'react';
const cnBadge = (...classes) => classes.filter(Boolean).join(' ');

export function Badge({ variant = 'default', className, children }) {
    const variantClasses = {
        destructive: 'bg-red-500 text-white',
        outline: 'border border-slate-300 text-slate-600',
        default: 'bg-slate-800 text-white'
    };
    return <div className={cnBadge('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', variantClasses[variant], className)}>{children}</div>;
}