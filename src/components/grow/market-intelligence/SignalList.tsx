import React from 'react';
import { UniversalListPage } from '../../shared/enterprise/UniversalListPage';
import { StatusBadge } from '../../shared/enterprise/StatusBadge';
import { Signal, SignalStrength, SignalStatus } from '../../../services/db';
import { signalService } from '../../../services/signalService';

export const SignalList: React.FC = () => {
  const signals = signalService.getAllSignals();

  const getStatusColor = (status: SignalStatus) => {
    switch (status) {
      case 'NEW': return 'blue';
      case 'VALIDATED': return 'emerald';
      case 'REVIEWING': return 'amber';
      case 'DISMISSED':
      case 'EXPIRED': return 'slate';
      default: return 'slate';
    }
  };

  const getStrengthColor = (strength: SignalStrength) => {
    switch (strength) {
      case 'CRITICAL': return 'rose';
      case 'HIGH': return 'amber';
      case 'MEDIUM': return 'blue';
      case 'LOW': return 'slate';
      default: return 'slate';
    }
  };

  const columns = [
    {
      id: 'title',
      header: 'Signal',
      accessorKey: 'title',
      cell: (value: any, row: Signal) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-100">{value}</span>
          <span className="text-xs text-slate-400">{row.type}</span>
        </div>
      )
    },
    {
      id: 'targetAccountId',
      header: 'Account ID',
      accessorKey: 'targetAccountId',
      cell: (value: any) => <span className="text-slate-300">{value}</span>
    },
    {
      id: 'strength',
      header: 'Strength',
      accessorKey: 'strength',
      cell: (value: any) => <StatusBadge status={value} color={getStrengthColor(value)} />
    },
    {
      id: 'confidence',
      header: 'Confidence',
      accessorKey: 'confidence',
      cell: (value: any) => (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-300">{value}%</span>
        </div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value: any) => <StatusBadge status={value} color={getStatusColor(value)} />
    },
    {
      id: 'detectedDate',
      header: 'Detected',
      accessorKey: 'detectedDate',
      cell: (value: any) => (
        <span className="text-slate-400 text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  return (
    <UniversalListPage
      title="New Signals"
      description="Recent buying intent and organizational changes detected across monitored accounts."
      data={signals}
      columns={columns}
      searchPlaceholder="Search signals..."
      emptyState={{
        title: "No Signals Detected",
        description: "No recent signals found. Add accounts to your Watchlist to monitor them for changes.",
        actionLabel: "View Watchlist",
        onAction: () => { /* Handle action */ }
      }}
      onRowClick={(row) => {
        console.log('Signal clicked:', row.id);
      }}
    />
  );
};
