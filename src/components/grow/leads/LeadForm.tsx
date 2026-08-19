import React, { useState } from 'react';
import { UniversalForm, FormSection } from '../../shared/enterprise/UniversalForm';
import { Lead } from '../../../services/db';
import { leadService } from '../../../services/leadService';

export interface LeadFormProps {
  initialData?: Partial<Lead>;
  onSuccess: (lead: Lead) => void;
  onCancel: () => void;
}

export function LeadForm({ initialData, onSuccess, onCancel }: LeadFormProps) {
  const [formData, setFormData] = useState<Partial<Lead>>(initialData || {});

  const handleChange = (field: keyof Lead, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name) throw new Error("Lead Name is required");
    if (!formData.email) throw new Error("Email is required");

    let savedLead;
    if (formData.id) {
      savedLead = await leadService.update(formData.id, formData, "U-1");
    } else {
      savedLead = await leadService.create(formData, "U-1");
    }
    onSuccess(savedLead);
  };

  const sections: FormSection[] = [
    {
      id: "basic",
      title: "Basic Information",
      fields: (
        <>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Lead / Opportunity Name *</label>
            <input 
              type="text" 
              value={formData.name || ""} 
              onChange={e => handleChange("name", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
              placeholder="e.g. Acme Corp Cloud Migration" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company Name</label>
            <input 
              type="text" 
              value={formData.companyName || ""} 
              onChange={e => handleChange("companyName", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Source</label>
            <select 
              value={formData.source || "Website"} 
              onChange={e => handleChange("source", e.target.value)}
              className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white appearance-none"
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Event">Event</option>
              <option value="Cold Call">Cold Call</option>
            </select>
          </div>
        </>
      )
    },
    {
      id: "contact",
      title: "Primary Contact",
      fields: (
        <>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">First Name</label>
            <input 
              type="text" 
              value={formData.firstName || ""} 
              onChange={e => handleChange("firstName", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Last Name</label>
            <input 
              type="text" 
              value={formData.lastName || ""} 
              onChange={e => handleChange("lastName", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email *</label>
            <input 
              type="email" 
              value={formData.email || ""} 
              onChange={e => handleChange("email", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
            <input 
              type="text" 
              value={formData.phone || ""} 
              onChange={e => handleChange("phone", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
            />
          </div>
        </>
      )
    },
    {
      id: "qualification",
      title: "Qualification Details",
      fields: (
        <>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Industry</label>
            <input 
              type="text" 
              value={formData.industry || ""} 
              onChange={e => handleChange("industry", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Budget</label>
            <input 
              type="text" 
              value={formData.budget || ""} 
              onChange={e => handleChange("budget", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" 
              placeholder="$"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Need</label>
            <textarea 
              value={formData.businessNeed || ""} 
              onChange={e => handleChange("businessNeed", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white min-h-[100px]" 
            />
          </div>
        </>
      )
    }
  ];

  return (
    <UniversalForm 
      title={initialData?.id ? `Edit Lead: ${initialData.name}` : "Create New Lead"}
      sections={sections}
      onSave={handleSave}
      onCancel={onCancel}
    />
  );
}
