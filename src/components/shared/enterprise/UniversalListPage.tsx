import React, { useState } from 'react';
import { Search, Filter, Plus, Columns, Download, LayoutGrid } from 'lucide-react';

export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  render?: (record: T) => React.ReactNode;
  visible?: boolean;
}

export interface UniversalListPageProps<T> {
  title: string;
  subtitle: string;
  primaryAction?: { label: string; onClick: () => void };
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (record: T) => void;
  // Search & Filter
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  // Pagination
  currentPage: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  // Optional empty state
  emptyStateTitle?: string;
  emptyStateMessage?: string;
}

export function UniversalListPage<T extends { id: string }>({
  title,
  subtitle,
  primaryAction,
  data,
  columns,
  onRowClick,
  searchTerm,
  onSearchChange,
  currentPage,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  emptyStateTitle = "No records found",
  emptyStateMessage = "Get started by creating a new record."
}: UniversalListPageProps<T>) {
  const [activeColumns, setActiveColumns] = useState<ColumnDef<T>[]>(
    columns.filter(c => c.visible !== false)
  );
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 shrink-0 flex items-start justify-between border-b border-white/10 bg-slate-950/50">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">{title}</h1>
          <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {primaryAction && (
            <button 
              onClick={primaryAction.onClick}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-900/20"
            >
              <Plus size={16} />
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-8 py-4 shrink-0 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm || ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 text-white placeholder:text-slate-600"
            />
          </div>

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg text-xs font-bold text-slate-400 transition-colors">
            <Filter size={14} />
            Filters
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg text-xs font-bold text-slate-400 transition-colors">
            <LayoutGrid size={14} />
            Saved Views
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors tooltip-trigger" title="Column Settings">
            <Columns size={16} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors tooltip-trigger" title="Export">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Main Content Area - Table */}
      <div className="flex-1 overflow-auto bg-slate-950 p-8 relative">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{emptyStateTitle}</h3>
            <p className="text-sm text-slate-400 max-w-md mb-8">{emptyStateMessage}</p>
            {primaryAction && (
              <button 
                onClick={primaryAction.onClick}
                className="px-6 py-2.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 text-xs font-bold rounded-lg transition-colors"
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium w-12">
                    <input type="checkbox" className="rounded bg-slate-900 border-slate-700" />
                  </th>
                  {activeColumns.map(col => (
                    <th key={String(col.key)} className="px-6 py-4 font-medium">{col.label}</th>
                  ))}
                  <th className="px-6 py-4 font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.map(record => (
                  <tr 
                    key={record.id} 
                    onClick={() => onRowClick?.(record)}
                    className="hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" className="rounded bg-slate-900 border-slate-700" />
                    </td>
                    {activeColumns.map(col => (
                      <td key={String(col.key)} className="px-6 py-4 text-slate-300">
                        {col.render ? col.render(record) : String(record[col.key as keyof T] || "-")}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <button 
                        className="text-xs font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="shrink-0 px-8 py-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-white font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-white font-bold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span className="text-white font-bold">{totalItems}</span> results
          </div>
          <div className="flex items-center gap-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 text-xs font-bold text-slate-300 transition-colors"
            >
              Previous
            </button>
            <div className="px-4 text-xs font-bold text-slate-500">
              Page {currentPage} of {totalPages}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-50 text-xs font-bold text-slate-300 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
