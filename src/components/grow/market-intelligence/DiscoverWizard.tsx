import React, { useState } from 'react';
import { UniversalForm } from '../../shared/enterprise/UniversalForm';
import { accountIntelligenceService } from '../../../services/accountIntelligenceService';
import { Sparkles } from 'lucide-react';

export const DiscoverWizard: React.FC<{
  onComplete: () => void;
  onCancel: () => void;
}> = ({ onComplete, onCancel }) => {
  const [naturalLanguage, setNaturalLanguage] = useState("");
  const [structuredCriteria, setStructuredCriteria] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessNLP = () => {
    setIsProcessing(true);
    // Simulate AI parsing
    setTimeout(() => {
      setStructuredCriteria({
        name: "Custom Research Target",
        objective: "Identify target accounts based on NLP input",
        type: "Market Discovery",
        targetGeography: "Indonesia",
        targetIndustry: "Manufacturing",
        targetSize: "500-5000",
        targetTechnologies: "ERP, SAP",
        targetSignals: "Expansion, Cloud Migration",
        targetRoles: "CIO, IT Director"
      });
      setIsProcessing(false);
    }, 1500);
  };



  if (!structuredCriteria) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-slate-900 border border-slate-800 rounded-lg mt-8">
        <h2 className="text-xl font-medium text-slate-100 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 text-emerald-400 mr-2" />
          Discover Accounts
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Describe the market or accounts you are looking for in natural language. Our AI will automatically configure the research parameters.
        </p>
        
        <div className="space-y-4">
          <textarea
            value={naturalLanguage}
            onChange={(e) => setNaturalLanguage(e.target.value)}
            placeholder="e.g. Find manufacturing companies in Indonesia with 500-5000 employees that are expanding, modernizing ERP or investing in digital transformation."
            className="w-full h-32 px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-200 placeholder-slate-600 resize-none"
          />
          <div className="flex justify-end gap-3">
            <button 
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleProcessNLP}
              disabled={!naturalLanguage.trim() || isProcessing}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50"
            >
              {isProcessing ? 'Analyzing...' : 'Generate Criteria'}
              {!isProcessing && <Sparkles className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-slate-100">Confirm Research Criteria</h2>
        <p className="text-slate-400 text-sm mt-1">
          Review and adjust the extracted parameters before starting the discovery run.
        </p>
      </div>

      <UniversalForm
        title="Start Discovery"
        isDrawer={false}
        sections={[
          {
            id: "details",
            title: "Research Details",
            fields: (
              <>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Research Name</label>
                  <input type="text" defaultValue={structuredCriteria.name} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Objective</label>
                  <textarea defaultValue={structuredCriteria.objective} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white h-24 resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Research Type</label>
                  <select defaultValue={structuredCriteria.type} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white">
                    <option value="Market Discovery">Market Discovery</option>
                    <option value="Account Discovery">Account Discovery</option>
                    <option value="Competitor Research">Competitor Research</option>
                  </select>
                </div>
              </>
            )
          },
          {
            id: "criteria",
            title: "Targeting Criteria",
            fields: (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Geography</label>
                  <input type="text" defaultValue={structuredCriteria.targetGeography} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Industry</label>
                  <input type="text" defaultValue={structuredCriteria.targetIndustry} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company Size</label>
                  <input type="text" defaultValue={structuredCriteria.targetSize} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technologies</label>
                  <input type="text" defaultValue={structuredCriteria.targetTechnologies} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Signals</label>
                  <input type="text" defaultValue={structuredCriteria.targetSignals} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Roles</label>
                  <input type="text" defaultValue={structuredCriteria.targetRoles} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
              </>
            )
          }
        ]}
        onSave={async () => {
          console.log("Starting research run");
          // Simulate generating a new discovered account
          accountIntelligenceService.createAccount({
            name: "PT Indofood Sukses Makmur Tbk",
            domain: "indofood.com",
            industry: structuredCriteria.targetIndustry || "Manufacturing",
            region: structuredCriteria.targetGeography || "Indonesia",
            employees: structuredCriteria.targetSize || "50,000+",
            revenue: "$6.5B",
            status: "DISCOVERED",
            priority: "HIGH",
            icpFit: { score: 92, positiveFactors: ["Revenue above $1B", "Enterprise scale"], negativeFactors: [], missingData: [] },
            intent: { score: 85, positiveFactors: ["Hiring for SAP roles", "Cloud migration signals"], negativeFactors: [], missingData: [] },
            triggerStrength: { score: 78, positiveFactors: ["Recent funding", "Leadership change"], negativeFactors: [], missingData: [] },
            opportunityPotential: { score: 90, positiveFactors: ["High cloud spend"], negativeFactors: [], missingData: [] },
            technologies: [{ name: "SAP ERP", confidence: 95, source: "Job Posting", verifiedAt: new Date().toISOString() }],
          });
          onComplete();
        }}
        onCancel={onCancel}
      />
    </div>
  );
};
