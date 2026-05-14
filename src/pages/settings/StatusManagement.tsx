import { useState } from 'react';
import { Button, Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tabs = ['All', 'Active', 'Inactive'];

interface StatusFlow {
  name: string;
  statusCount: number;
  team: string;
  createdAt: string;
  updatedAt: string;
}

const mockFlows: StatusFlow[] = [
  {
    name: 'Demo status flow',
    statusCount: 3,
    team: 'Demo Jarvis Team1',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    name: 'SME Claims Flow',
    statusCount: 11,
    team: 'Claims B2C',
    createdAt: '2023-11-08',
    updatedAt: '2024-04-12',
  },
  {
    name: 'Ops Support',
    statusCount: 9,
    team: 'Ops Support Narad',
    createdAt: '2023-09-22',
    updatedAt: '2024-02-28',
  },
  {
    name: 'B2C Delivery Flow',
    statusCount: 7,
    team: 'B2C Narad',
    createdAt: '2023-12-01',
    updatedAt: '2024-04-05',
  },
  {
    name: 'Franchise Escalation',
    statusCount: 5,
    team: 'Franchise Support',
    createdAt: '2024-02-10',
    updatedAt: '2024-04-18',
  },
];

const StatusManagement = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockFlows.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <h1 className="text-[20px] font-semibold text-tds-text-body-primary" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          Status Management
        </h1>
        <Button variant="black" buttonStyle="secondary" size="md" text="Create Status Flow" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-tds-4 mb-tds-16 border-b border-tds-border-neutral-primary">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-tds-12 py-tds-8 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === tab
                ? 'border-b-[#2563eb] text-[#2563eb]'
                : 'border-b-transparent text-tds-text-caption-secondary hover:text-tds-text-body-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-tds-16 max-w-[320px]">
        <Input
          size="sm"
          placeholder="Search status flows..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leadingIcon={<SearchIcon />}
        />
      </div>

      {/* Table */}
      <div className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-tds-border-neutral-primary bg-[#f9f9f9]">
              <th className="text-left px-tds-16 py-tds-12 text-[12px] font-semibold text-tds-text-caption-secondary uppercase">
                Flow Name
              </th>
              <th className="text-left px-tds-16 py-tds-12 text-[12px] font-semibold text-tds-text-caption-secondary uppercase">
                Statuses
              </th>
              <th className="text-left px-tds-16 py-tds-12 text-[12px] font-semibold text-tds-text-caption-secondary uppercase">
                Team
              </th>
              <th className="text-left px-tds-16 py-tds-12 text-[12px] font-semibold text-tds-text-caption-secondary uppercase">
                Created
              </th>
              <th className="text-left px-tds-16 py-tds-12 text-[12px] font-semibold text-tds-text-caption-secondary uppercase">
                Last Updated
              </th>
              <th className="text-left px-tds-16 py-tds-12 text-[12px] font-semibold text-tds-text-caption-secondary uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((flow) => (
              <tr key={flow.name} className="border-b border-tds-border-neutral-primary last:border-b-0 hover:bg-[#f9f9f9]">
                <td className="px-tds-16 py-tds-12 text-[14px] font-medium text-tds-text-body-primary">
                  {flow.name}
                </td>
                <td className="px-tds-16 py-tds-12">
                  <span className="inline-flex items-center px-tds-8 py-[2px] bg-[#e8f0fe] rounded-[4px] text-[12px] text-[#2563eb] font-medium">
                    {flow.statusCount}
                  </span>
                </td>
                <td className="px-tds-16 py-tds-12 text-[14px] text-tds-text-caption-secondary">
                  {flow.team}
                </td>
                <td className="px-tds-16 py-tds-12 text-[14px] text-tds-text-caption-secondary">
                  {flow.createdAt}
                </td>
                <td className="px-tds-16 py-tds-12 text-[14px] text-tds-text-caption-secondary">
                  {flow.updatedAt}
                </td>
                <td className="px-tds-16 py-tds-12">
                  <Button variant="black" buttonStyle="ghost" size="sm" text="Edit" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusManagement;
