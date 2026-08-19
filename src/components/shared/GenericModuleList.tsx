import React, { useState } from "react";
import { ListLayout } from "./ListLayout";

interface Props {
  moduleName: string;
}

export function GenericModuleList({ moduleName }: Props) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Capitalize title
  const title = moduleName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const dummyData = Array.from({ length: 10 }).map((_, i) => ({
    id: `ITEM-${i + 1}`,
    name: `Sample ${title} ${i + 1}`,
    status: i % 3 === 0 ? "Active" : i % 2 === 0 ? "Pending" : "Draft",
    date: `2026-08-${(i + 1).toString().padStart(2, "0")}`
  }));

  return (
    <ListLayout 
      title={title} 
      subtitle={`Manage your ${title.toLowerCase()}`}
      primaryAction={{ label: `New ${title}`, onClick: () => setIsPanelOpen(true) }}
      totalItems={45}
      currentPage={currentPage}
      itemsPerPage={10}
      onPageChange={setCurrentPage}
      isPanelOpen={isPanelOpen}
      onClosePanel={() => setIsPanelOpen(false)}
      panelTitle={`Add New ${title}`}
      panelChildren={
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{title} Name</label>
            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white" placeholder={`Enter ${title.toLowerCase()} name...`} />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Status</label>
            <select className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white appearance-none">
              <option>Draft</option>
              <option>Pending</option>
              <option>Active</option>
            </select>
          </div>
          <div className="pt-4 mt-auto">
            <button 
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-bold text-sm transition-colors"
              onClick={() => setIsPanelOpen(false)}
            >
              Save {title}
            </button>
          </div>
        </div>
      }
    >
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {dummyData.map(item => (
              <tr 
                key={item.id} 
                className="hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4 font-mono text-xs text-slate-400">{item.id}</td>
                <td className="px-6 py-4 font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{item.name}</td>
                <td className="px-6 py-4 text-slate-400">{item.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    item.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    item.status === "Pending" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                    "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ListLayout>
  );
}
