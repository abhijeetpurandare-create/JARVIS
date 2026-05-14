import { useState } from 'react';
import { Button, Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${expanded ? 'rotate-90' : ''}`}>
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tabs = ['All', 'Active', 'Inactive'];

interface CategoryGroup {
  name: string;
  categoryCount: number;
  categories: string[];
}

const mockGroups: CategoryGroup[] = [
  {
    name: 'SCS File Upload',
    categoryCount: 1,
    categories: ['File Upload Request'],
  },
  {
    name: 'PSI Delhivery one Tech Support',
    categoryCount: 1,
    categories: ['Tech Support'],
  },
  {
    name: 'A&I - Breakdown',
    categoryCount: 7,
    categories: [
      'Conveyor Belt Breakdown',
      'Scanner Malfunction',
      'Weighing Machine Issue',
      'Printer Breakdown',
      'Network Connectivity',
      'Power Supply Issue',
      'CCTV Camera Fault',
    ],
  },
  {
    name: 'B2C Claims',
    categoryCount: 5,
    categories: [
      'Shipment Lost',
      'Shipment Damaged',
      'Partial Delivery',
      'Wrong Delivery',
      'RTO Claim',
    ],
  },
  {
    name: 'Ops Support',
    categoryCount: 4,
    categories: [
      'Route Optimization',
      'Vehicle Breakdown',
      'Manpower Shortage',
      'Delivery Delay',
    ],
  },
];

const CategoryManagement = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (name: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const filtered = mockGroups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <h1 className="text-[20px] font-semibold text-tds-text-body-primary" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          Category Management
        </h1>
        <Button variant="black" buttonStyle="secondary" size="md" text="Create Category Group" />
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
          placeholder="Search category groups..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leadingIcon={<SearchIcon />}
        />
      </div>

      {/* Category Groups */}
      <div className="space-y-[8px]">
        {filtered.map((group) => (
          <div
            key={group.name}
            className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg overflow-hidden"
          >
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.name)}
              className="w-full flex items-center gap-tds-12 px-tds-16 py-tds-12 hover:bg-[#f9f9f9] transition-colors cursor-pointer"
            >
              <ChevronIcon expanded={expandedGroups.has(group.name)} />
              <span className="text-[14px] font-medium text-tds-text-body-primary flex-1 text-left">
                {group.name}
              </span>
              <span className="text-[12px] text-tds-text-caption-secondary">
                {group.categoryCount} {group.categoryCount === 1 ? 'category' : 'categories'}
              </span>
            </button>

            {/* Expanded Categories */}
            {expandedGroups.has(group.name) && (
              <div className="border-t border-tds-border-neutral-primary px-tds-16 py-tds-12">
                <div className="flex flex-wrap gap-tds-8">
                  {group.categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center px-tds-12 py-tds-6 bg-[#f5f5f5] border border-tds-border-neutral-primary rounded-[4px] text-[12px] text-tds-text-body-primary"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement;
