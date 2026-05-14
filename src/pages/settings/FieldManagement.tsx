import { useState } from 'react';
import { Button, Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const tabs = ['All', 'Active', 'Inactive'];

interface FieldConfig {
  name: string;
  fieldCount: number;
  fields: { name: string; type: string }[];
}

const mockConfigs: FieldConfig[] = [
  {
    name: 'Scrap',
    fieldCount: 16,
    fields: [
      { name: 'Request For', type: 'Curl' },
      { name: 'Requester', type: 'String' },
      { name: 'Employee Name', type: 'String' },
      { name: 'Employee ID', type: 'String' },
      { name: 'Designation', type: 'String' },
      { name: 'Department', type: 'String' },
      { name: 'Location', type: 'String' },
      { name: 'Contact Number', type: 'Number' },
      { name: 'Email ID', type: 'String' },
      { name: 'Item Description', type: 'String' },
      { name: 'Quantity', type: 'Number' },
      { name: 'Reason for Scrap', type: 'String' },
      { name: 'Approval Status', type: 'Dropdown' },
      { name: 'Approved By', type: 'String' },
      { name: 'Date of Request', type: 'Date' },
      { name: 'Remarks', type: 'String' },
    ],
  },
  {
    name: 'A&I - Scheduled Downtime',
    fieldCount: 25,
    fields: [
      { name: 'Facility Code', type: 'String' },
      { name: 'Facility Name', type: 'String' },
      { name: 'Region', type: 'Dropdown' },
      { name: 'Zone', type: 'Dropdown' },
      { name: 'Equipment Type', type: 'Dropdown' },
      { name: 'Equipment ID', type: 'String' },
      { name: 'Downtime Start', type: 'DateTime' },
      { name: 'Downtime End', type: 'DateTime' },
      { name: 'Duration (hrs)', type: 'Number' },
      { name: 'Reason', type: 'String' },
      { name: 'Impact Level', type: 'Dropdown' },
      { name: 'Planned By', type: 'String' },
      { name: 'Approved By', type: 'String' },
      { name: 'Notification Sent', type: 'Boolean' },
      { name: 'Stakeholders', type: 'MultiSelect' },
      { name: 'Backup Plan', type: 'String' },
      { name: 'Vendor Involved', type: 'Boolean' },
      { name: 'Vendor Name', type: 'String' },
      { name: 'Cost Estimate', type: 'Number' },
      { name: 'Priority', type: 'Dropdown' },
      { name: 'Status', type: 'Dropdown' },
      { name: 'Completion Notes', type: 'String' },
      { name: 'Attachments', type: 'File' },
      { name: 'Created Date', type: 'Date' },
      { name: 'Last Updated', type: 'DateTime' },
    ],
  },
  {
    name: 'B2C Claims',
    fieldCount: 12,
    fields: [
      { name: 'Claim ID', type: 'String' },
      { name: 'AWB Number', type: 'String' },
      { name: 'Client Name', type: 'String' },
      { name: 'Claim Amount', type: 'Number' },
      { name: 'Claim Type', type: 'Dropdown' },
      { name: 'Status', type: 'Dropdown' },
      { name: 'Filed Date', type: 'Date' },
      { name: 'Resolution Date', type: 'Date' },
      { name: 'Assigned To', type: 'String' },
      { name: 'Evidence', type: 'File' },
      { name: 'Remarks', type: 'String' },
      { name: 'Approved Amount', type: 'Number' },
    ],
  },
];

const FieldManagement = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockConfigs.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <h1 className="text-[20px] font-semibold text-tds-text-body-primary" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          Field Management
        </h1>
        <Button variant="black" buttonStyle="primary" size="md" text="Create Configuration" />
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
          placeholder="Search configurations..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leadingIcon={<SearchIcon />}
        />
      </div>

      {/* Field Config Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-tds-16">
        {filtered.map((config) => (
          <div
            key={config.name}
            className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg p-tds-16"
          >
            <div className="flex items-center justify-between mb-tds-12">
              <h3 className="text-[14px] font-semibold text-tds-text-body-primary">{config.name}</h3>
              <span className="text-[12px] text-tds-text-caption-secondary">{config.fieldCount} fields</span>
            </div>
            <div className="flex flex-wrap gap-tds-6">
              {config.fields.slice(0, 8).map((field) => (
                <span
                  key={field.name}
                  className="inline-flex items-center gap-tds-4 px-tds-8 py-[4px] bg-[#f5f5f5] border border-tds-border-neutral-primary rounded-[4px] text-[12px] text-tds-text-body-primary"
                >
                  {field.name}
                  <span className="text-[10px] text-tds-text-caption-secondary">({field.type})</span>
                </span>
              ))}
              {config.fields.length > 8 && (
                <span className="inline-flex items-center px-tds-8 py-[4px] bg-[#e8f0fe] rounded-[4px] text-[12px] text-[#2563eb] font-medium">
                  +{config.fields.length - 8} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldManagement;
