import React from "react";
import { GenericModuleList } from "../../components/shared/GenericModuleList";

export default function ServeWorkspace({ subModule }: { subModule: string }) {
  if (subModule === "dashboard") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-black text-white mb-2">SERVE Dashboard</h1>
        <p className="text-slate-400">Overview of your customer service operations and SLAs.</p>
      </div>
    );
  }

  return <GenericModuleList moduleName={subModule} />;
}
