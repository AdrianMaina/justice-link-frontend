// File: src/components/ui/Checkbox.jsx
import React from 'react';
export const Checkbox = ({ id, checked, onCheckedChange }) => ( <input id={id} type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500" /> );
