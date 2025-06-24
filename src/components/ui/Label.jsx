// =================================================================================
// File: src/components/ui/Label.jsx
// =================================================================================
import React from 'react';
const cnLabel = (...classes) => classes.filter(Boolean).join(' ');
export const Label = ({ className, ...props }) => <label className={cnLabel("text-sm font-medium leading-none", className)} {...props} />;
