import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { Lead } from '../../../services/db';
import { leadService } from '../../../services/leadService';

export interface LeadConversionModalProps {
  lead: Lead;
  onCancel: () => void;
  onSuccess: () => void;
}

export function LeadConversionModal({ lead, onCancel, onSuccess }: LeadConversionModalProps) {
  const [opportunityName, setOpportunityName] = useState(lead.name);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    setError("");
    setLoading(true);
    try {
      await leadService.convert(lead.id, "U-1", {
        opportunityName,
        amount
      });
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Conversion failed.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      
      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Convert Lead to Opportunity</h2>
          <button onClick={onCancel} className="p-1 hover:bg-white/10 rounded-lg text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          <p className="text-sm text-slate-300">
            Converting <span className="font-bold text-white">{lead.name}</span> will automatically create:
          </p>
          
          <div className="space-y-3 bg-white/5 border border-white/5 rounded-xl p-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle size={16} className="text-emerald-400" />
              <span>Account: <strong>{lead.companyName}</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle size={16} className="text-emerald-400" />
              <span>Contact: <strong>{lead.firstName} {lead.lastName}</strong></span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Opportunity Name *</label>
              <input 
                type="text" 
                value={opportunityName} 
                onChange={e => setOpportunityName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Amount *</label>
              <input 
                type="number" 
                value={amount || ""} 
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-900 flex items-center justify-end gap-3">
          <button 
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleConvert}
            disabled={loading || !opportunityName || amount <= 0}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-indigo-900/20 disabled:opacity-50"
          >
            {loading ? "Converting..." : "Convert Lead"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
