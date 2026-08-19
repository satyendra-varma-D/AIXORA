import React from 'react';
import { UniversalListPage } from '../../shared/enterprise/UniversalListPage';
import { StatusBadge } from '../../shared/enterprise/StatusBadge';
import { TargetAccount, TargetAccountStatus } from '../../../services/db';
import { accountIntelligenceService } from '../../../services/accountIntelligenceService';

export const TargetAccountList: React.FC = () => {
  const accounts = accountIntelligenceService.getAllAccounts();

  const getStatusColor = (status: TargetAccountStatus) => {
    switch (status) {
      case 'APPROVED':
      case 'ACTIVATED':
        return 'emerald';
      case 'REJECTED':
      case 'DISQUALIFIED':
        return 'rose';
      case 'WATCHLIST':
        return 'amber';
      case 'SALES READY':
        return 'blue';
      default:
        return 'slate';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'rose';
      case 'MEDIUM': return 'amber';
      case 'LOW': return 'slate';
      default: return 'slate';
    }
  };

  const columns = [
    {
      id: 'name',
      header: 'Account',
      accessorKey: 'name',
      cell: (value: any, row: TargetAccount) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-100">{value}</span>
          <span className="text-xs text-slate-400">{row.domain || 'No domain'}</span>
        </div>
      )
    },
    {
      id: 'industry',
      header: 'Industry',
      accessorKey: 'industry',
    },
    {
      id: 'icpFit',
      header: 'ICP Fit',
      accessorKey: 'icpFit',
      cell: (value: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full ${value.score >= 85 ? 'bg-emerald-500' : value.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${value.score}%` }}
            />
          </div>
          <span className="text-xs text-slate-300">{value.score}</span>
        </div>
      )
    },
    {
      id: 'priority',
      header: 'Priority',
      accessorKey: 'priority',
      cell: (value: any) => <StatusBadge status={value} color={getPriorityColor(value)} />
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      cell: (value: any) => <StatusBadge status={value} color={getStatusColor(value as TargetAccountStatus)} />
    },
  ];

  return (
    <UniversalListPage
      title="Priority Accounts"
      description="Accounts discovered by Market Intelligence requiring review or action."
      data={accounts}
      columns={columns}
      primaryAction={{
        label: "Discover Accounts",
        onClick: () => { /* Handled by workspace routing */ },
        icon: <span className="mr-2">✨</span>
      }}
      searchPlaceholder="Search accounts, domains..."
      emptyState={{
        title: "No Target Accounts",
        description: "Start by defining your ideal customer profile and discover your first target accounts.",
        actionLabel: "Discover Accounts",
        onAction: () => { /* Handled by workspace routing */ }
      }}
      onRowClick={(row) => {
        // Will implement routing to TargetAccountDetail later
        console.log('Clicked', row.id);
      }}
    />
  );
};
