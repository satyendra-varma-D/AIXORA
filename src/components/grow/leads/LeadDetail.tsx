import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalRecordDetail, TabDef } from '../../shared/enterprise/UniversalRecordDetail';
import { StatusBadge, getLeadStatusColor } from '../../shared/enterprise/StatusBadge';
import { Lead } from '../../../services/db';
import { leadService } from '../../../services/leadService';
import { LeadForm } from './LeadForm';
import { LeadConversionModal } from './LeadConversionModal';

export function LeadDetail({ recordId }: { recordId: string }) {
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);

  const loadLead = async () => {
    setLoading(true);
    const data = await leadService.getById(recordId);
    setLead(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLead();
  }, [recordId]);

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  if (!lead) {
    return <div className="p-8 text-white">Lead not found</div>;
  }

  const tabs: TabDef[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Qualification Details</h3>
              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Industry</div>
                  <div className="text-sm font-medium text-slate-200">{lead.industry || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Estimated Budget</div>
                  <div className="text-sm font-medium text-slate-200">{lead.budget || "-"}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Business Need</div>
                  <div className="text-sm font-medium text-slate-200">{lead.businessNeed || "-"}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Primary Contact</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Name</div>
                  <div className="text-sm font-medium text-slate-200">{lead.firstName} {lead.lastName}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Email</div>
                  <div className="text-sm font-medium text-indigo-400">{lead.email}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Phone</div>
                  <div className="text-sm font-medium text-slate-200">{lead.phone || "-"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "activities",
      label: "Activities & Notes",
      content: <div className="text-slate-400">Activity timeline placeholder...</div>
    }
  ];

  return (
    <>
      <UniversalRecordDetail
        title={lead.name}
        subtitle={lead.companyName}
        statusBadge={<StatusBadge status={lead.status} type={getLeadStatusColor(lead.status)} />}
        onBack={() => navigate("/app/grow/leads")}
        tabs={tabs}
        primaryActions={[
          { label: "Edit", onClick: () => setIsEditOpen(true) },
          ...(lead.status === 'QUALIFIED' ? [{ label: "Convert to Opportunity", onClick: () => setIsConvertOpen(true), primary: true }] : [])
        ]}
      />

      {isEditOpen && (
        <LeadForm 
          initialData={lead}
          onCancel={() => setIsEditOpen(false)}
          onSuccess={() => {
            setIsEditOpen(false);
            loadLead();
          }}
        />
      )}

      {isConvertOpen && (
        <LeadConversionModal 
          lead={lead}
          onCancel={() => setIsConvertOpen(false)}
          onSuccess={() => {
            setIsConvertOpen(false);
            loadLead(); // Reload will show CONVERTED status, or we can redirect to the new opportunity
            navigate("/app/grow/leads");
          }}
        />
      )}
    </>
  );
}
