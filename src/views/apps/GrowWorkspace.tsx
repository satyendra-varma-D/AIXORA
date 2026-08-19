import React, { useState, useEffect } from "react";
import { ListLayout } from "../../components/shared/ListLayout";
import { DetailLayout } from "../../components/shared/DetailLayout";
import { GenericModuleList } from "../../components/shared/GenericModuleList";
import { db, Customer } from "../../store/mockDatabase";
import { LeadList } from "../../components/grow/leads/LeadList";
import { LeadDetail } from "../../components/grow/leads/LeadDetail";
import { MarketIntelligenceWorkspace } from "../../components/grow/market-intelligence/MarketIntelligenceWorkspace";

export default function GrowWorkspace({ subModule, recordId }: { subModule: string; recordId?: string }) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const customers = db.getCustomers();
  const opportunities = db.opportunities || [];

  // Reset detail view when navigation changes
  useEffect(() => {
    setSelectedCustomer(null);
    setIsPanelOpen(false);
  }, [subModule]);

  // If we are looking at a specific record in leads
  if (subModule === "leads" && recordId) {
    return <LeadDetail recordId={recordId} />;
  }

  // If a customer is selected, show the Detail View (we can expand this for leads/opps later)
  if (selectedCustomer) {
    return (
      <DetailLayout
        title={selectedCustomer.name}
        status={{
          label: selectedCustomer.status,
          colorClass: selectedCustomer.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
        }}
        onBack={() => setSelectedCustomer(null)}
        tabs={["Overview", "Contacts", "Opportunities", "Projects"]}
      >
        {(activeTab) => (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-lg font-bold mb-4">{activeTab}</h3>
            {activeTab === "Overview" && (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Industry</div>
                  <div className="text-sm font-medium text-slate-200">{selectedCustomer.industry}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Pipeline</div>
                  <div className="text-sm font-medium text-slate-200">$45,000</div>
                </div>
              </div>
            )}
            {activeTab !== "Overview" && <p className="text-sm text-slate-400">Data for {activeTab} goes here...</p>}
          </div>
        )}
      </DetailLayout>
    );
  }

  // Define views based on subModule
  switch (subModule) {
    case "market-intelligence":
      // Re-use the recordId to pass sub-views inside market intelligence (e.g., discover, accounts)
      return <MarketIntelligenceWorkspace subModule={recordId} />;

    case "leads":
      return <LeadList />;

    case "accounts":
      return (
        <ListLayout 
          title="Accounts" 
          subtitle="Manage your existing customers"
          primaryAction={{ label: "New Account", onClick: () => setIsPanelOpen(true) }}
          totalItems={customers.length}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          isPanelOpen={isPanelOpen}
          onClosePanel={() => setIsPanelOpen(false)}
          panelTitle="Add New Account"
          panelChildren={
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" placeholder="e.g. Acme Corp" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Industry</label>
                <select className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white appearance-none">
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Retail</option>
                </select>
              </div>
              <div className="pt-4 mt-auto">
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-bold text-sm transition-colors"
                  onClick={() => setIsPanelOpen(false)}
                >
                  Save Account
                </button>
              </div>
            </div>
          }
        >
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Account Name</th>
                  <th className="px-6 py-4 font-medium">Industry</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {customers.map(c => (
                  <tr 
                    key={c.id} 
                    onClick={() => setSelectedCustomer(c)}
                    className="hover:bg-white/5 cursor-pointer transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{c.name}</td>
                    <td className="px-6 py-4 text-slate-400">{c.industry}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        c.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        c.status === "Prospect" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                        "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ListLayout>
      );

    case "opportunities":
      return (
        <ListLayout 
          title="Opportunities" 
          subtitle="Manage active deals and pipeline"
          primaryAction={{ label: "New Opportunity", onClick: () => setIsPanelOpen(true) }}
          totalItems={opportunities.length}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          isPanelOpen={isPanelOpen}
          onClosePanel={() => setIsPanelOpen(false)}
          panelTitle="Create Opportunity"
          panelChildren={
            <div className="flex flex-col gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Deal Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" placeholder="e.g. Cloud Migration" />
              </div>
              <div className="pt-4 mt-auto">
                <button 
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-bold text-sm transition-colors"
                  onClick={() => setIsPanelOpen(false)}
                >
                  Create
                </button>
              </div>
            </div>
          }
        >
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Opportunity Name</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {opportunities.map(o => (
                  <tr key={o.id} className="hover:bg-white/5 cursor-pointer transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{o.name}</td>
                    <td className="px-6 py-4 text-slate-400">${o.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-400">{o.stage}</td>
                  </tr>
                ))}
                {opportunities.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-500">No opportunities found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ListLayout>
      );

    case "dashboard":
      return (
        <div className="p-8">
          <h1 className="text-2xl font-black text-white mb-2">GROW Dashboard</h1>
          <p className="text-slate-400">Overview of your acquisition pipeline. Navigate to Accounts or Opportunities to see the data grids.</p>
        </div>
      );
      
    default:
      return <GenericModuleList moduleName={subModule} />;
  }
}

