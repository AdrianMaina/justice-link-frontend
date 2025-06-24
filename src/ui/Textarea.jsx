// File: src/components/ui/Textarea.jsx
// =================================================================================
import React from 'react';
const cnTextarea = (...classes) => classes.filter(Boolean).join(' ');
export const Textarea = ({ className, ...props }) => <textarea className={cnTextarea("flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2", className)} {...props} />;
