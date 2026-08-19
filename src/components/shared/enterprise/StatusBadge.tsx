import React from 'react';

export interface StatusBadgeProps {
  status: string;
  type?: 'success' | 'warning' | 'error' | 'neutral' | 'info';
}

export function StatusBadge({ status, type = 'neutral' }: StatusBadgeProps) {
  const getColors = () => {
    switch (type) {
      case 'success':
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case 'warning':
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case 'error':
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      case 'info':
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case 'neutral':
      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${getColors()}`}>
      {status}
    </span>
  );
}

// Utility to map Lead Status to colors
export const getLeadStatusColor = (status: string): StatusBadgeProps['type'] => {
  switch (status) {
    case 'NEW': return 'info';
    case 'CONTACTED': return 'warning';
    case 'ENGAGED': return 'warning';
    case 'QUALIFYING': return 'info';
    case 'QUALIFIED': return 'success';
    case 'UNQUALIFIED': return 'neutral';
    case 'NURTURE': return 'warning';
    case 'CONVERTED': return 'success';
    case 'LOST': return 'error';
    default: return 'neutral';
  }
};
