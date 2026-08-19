import React, { useState } from "react";
import { Search, Filter, Plus, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ListLayoutProps {
  title: string;
  subtitle?: string;
  primaryAction?: { label: string; onClick: () => void };
  children: React.ReactNode;
  
  // Pagination
  totalItems?: number;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;

  // Side Panel
  isPanelOpen?: boolean;
  onClosePanel?: () => void;
  panelTitle?: string;
  panelChildren?: React.ReactNode;
}

export function ListLayout({ 
  title, subtitle, primaryAction, children,
  totalItems = 0, currentPage = 1, itemsPerPage = 10, onPageChange,
  isPanelOpen = false, onClosePanel, panelTitle, panelChildren
}: ListLayoutProps) {
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex relative h-full w-full overflow-hidden">
      
      {/* Main Content Area */}
      <div className={`flex flex-col h-full bg-[#030712] text-white transition-all duration-300 w-full ${isPanelOpen ? 'pr-[400px]' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
          <div>
            <h1 className="text-2xl font-black tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all w-64"
              />
            </div>
            <button className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors">
              <Filter size={16} />
            </button>
            {primaryAction && (
              <button 
                onClick={primaryAction.onClick}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Plus size={16} />
                {primaryAction.label}
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
        
        {/* Pagination Footer */}
        {totalItems > 0 && (
          <div className="flex items-center justify-between px-8 py-4 border-t border-white/5 bg-[#0A0F1C] shrink-0">
            <div className="text-sm text-slate-400">
              Showing <span className="font-medium text-white">{startItem}</span> to <span className="font-medium text-white">{endItem}</span> of <span className="font-medium text-white">{totalItems}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => onPageChange && onPageChange(currentPage - 1)}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="text-sm font-medium px-2">
                Page {currentPage} of {totalPages || 1}
              </div>
              <button 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => onPageChange && onPageChange(currentPage + 1)}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Slide-over Panel */}
      <div 
        className={`fixed top-16 bottom-0 right-0 w-[400px] bg-[#0A0F1C] border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out z-20 flex flex-col ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h2 className="text-lg font-bold text-white">{panelTitle}</h2>
          <button onClick={onClosePanel} className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-6">
          {panelChildren}
        </div>
      </div>
      
      {/* Backdrop for mobile (optional, but good practice) */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-black/50 z-10 xl:hidden" onClick={onClosePanel} />
      )}
      
    </div>
  );
}
