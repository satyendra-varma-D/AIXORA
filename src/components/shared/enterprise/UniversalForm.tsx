import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

export interface FormSection {
  id: string;
  title: string;
  fields: React.ReactNode;
}

export interface UniversalFormProps {
  title: string;
  isDrawer?: boolean;
  sections: FormSection[];
  onSave: () => Promise<void>;
  onCancel: () => void;
}

export function UniversalForm({
  title,
  isDrawer = true,
  sections,
  onSave,
  onCancel
}: UniversalFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    setLoading(true);
    try {
      await onSave();
    } catch (err: any) {
      setError(err.message || "Failed to save record.");
    } finally {
      setLoading(false);
    }
  };

  const Content = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300">
      {/* Header */}
      <div className="shrink-0 px-8 py-6 flex items-center justify-between border-b border-white/10 bg-slate-950/80 sticky top-0 z-10">
        <h2 className="text-xl font-black text-white tracking-tight">{title}</h2>
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-8 py-4 bg-red-500/10 border-b border-red-500/20 flex items-start gap-3">
          <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-red-400">{error}</p>
        </div>
      )}

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
          {sections.map((section) => (
            <div key={section.id} className="relative">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6 pb-2 border-b border-white/5">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {section.fields}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="shrink-0 px-8 py-4 border-t border-white/10 bg-slate-950/95 backdrop-blur flex items-center justify-end gap-3 sticky bottom-0 z-10">
        <button 
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-indigo-900/20 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save size={16} />
          )}
          {loading ? "Saving..." : "Save Record"}
        </button>
      </div>
    </div>
  );

  if (isDrawer) {
    return (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onCancel} />
        {/* Drawer */}
        <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-slate-950 shadow-2xl z-50 border-l border-white/10 transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col">
          <Content />
        </div>
      </>
    );
  }

  // Full page mode
  return <div className="absolute inset-0 z-40"><Content /></div>;
}
