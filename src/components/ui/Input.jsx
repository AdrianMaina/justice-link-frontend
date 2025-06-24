// File: src/components/ui/Input.jsx
// =================================================================================
import React from 'react';
const cnInput = (...classes) => classes.filter(Boolean).join(' ');
export const Input = ({ className, ...props }) => <input className={cnInput("flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2", className)} {...props} />;
