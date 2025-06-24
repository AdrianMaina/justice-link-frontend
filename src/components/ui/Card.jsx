// File: src/components/ui/Card.jsx
// =================================================================================
import React from 'react';
const cnCard = (...classes) => classes.filter(Boolean).join(' ');

export const Card = ({ children, className }) => <div className={cnCard("bg-white rounded-lg border border-slate-200 shadow-sm", className)}>{children}</div>;
export const CardHeader = ({ children, className }) => <div className={cnCard("p-6", className)}>{children}</div>;
export const CardTitle = ({ children, className }) => <h3 className={cnCard("text-2xl font-semibold leading-none tracking-tight", className)}>{children}</h3>;
export const CardDescription = ({ children, className }) => <p className={cnCard("text-sm text-slate-500", className)}>{children}</p>;
export const CardContent = ({ children, className }) => <div className={cnCard("p-6 pt-0", className)}>{children}</div>;
