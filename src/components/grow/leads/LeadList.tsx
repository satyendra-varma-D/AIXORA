import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UniversalListPage, ColumnDef } from '../../shared/enterprise/UniversalListPage';
import { StatusBadge, getLeadStatusColor } from '../../shared/enterprise/StatusBadge';
import { Lead } from '../../../services/db';
import { leadService } from '../../../services/leadService';
import { LeadForm } from './LeadForm';

export function LeadList() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const loadLeads = async () => {
    setLoading(true);
    const data = await leadService.getAll();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const columns: ColumnDef<Lead>[] = [
    {
      key: "name",
      label: "Lead Name",
      render: (lead) => (
        <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">
          {lead.name}
        </span>
      )
    },
    { key: "companyName", label: "Company" },
    { 
      key: "contact", 
      label: "Contact Person",
      render: (lead) => (
        <div>
          <div>{lead.firstName} {lead.lastName}</div>
          <div className="text-[10px] text-slate-500">{lead.email}</div>
        </div>
      )
    },
    { key: "source", label: "Source" },
    { 
      key: "status", 
      label: "Status",
      render: (lead) => <StatusBadge status={lead.status} type={getLeadStatusColor(lead.status)} />
    },
    { 
      key: "score", 
      label: "Score",
      render: (lead) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${lead.score && lead.score > 70 ? 'bg-emerald-500' : lead.score && lead.score > 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
              style={{ width: `${lead.score || 0}%` }} 
            />
          </div>
          <span className="text-xs font-bold">{lead.score || 0}</span>
        </div>
      )
    }
  ];

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <UniversalListPage
        title="Leads"
        subtitle="Manage and qualify incoming business opportunities"
        primaryAction={{ label: "New Lead", onClick: () => setIsFormOpen(true) }}
        data={filteredLeads}
        columns={columns}
        onRowClick={(lead) => navigate(`/app/grow/leads/${lead.id}`)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentPage={currentPage}
        totalItems={filteredLeads.length}
        onPageChange={setCurrentPage}
        emptyStateTitle="No leads found"
        emptyStateMessage="Start building your pipeline by creating your first lead."
      />

      {isFormOpen && (
        <LeadForm 
          onCancel={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            loadLeads();
          }}
        />
      )}
    </>
  );
}
