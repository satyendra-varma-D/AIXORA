import React from "react";
import { GenericModuleList } from "../../components/shared/GenericModuleList";

export default function DeliverWorkspace({ subModule }: { subModule: string }) {
  if (subModule === "dashboard") {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-black text-white mb-2">DELIVER Dashboard</h1>
        <p className="text-slate-400">Overview of your delivery and project portfolio.</p>
      </div>
    );
  }

  return <GenericModuleList moduleName={subModule} />;
}
