import { useState } from 'react';
import { Button, Input, Pill } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SortIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5 6L8 3L11 6M5 10L8 13L11 10" stroke="#b3b1b1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface FieldItem {
  name: string;
  type: string;
  createdBy: string;
  createdOn: string;
  createdTime: string;
}

const mockFields: FieldItem[] = [
  { name: 'ticketingVersion', type: 'String', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'updateActivityMetadata', type: 'Object', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'department', type: 'Dropdown', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'acktemplate', type: 'String', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'Media Context', type: 'Object', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'Ewaybillstatus', type: 'Dropdown', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
];

const tabs = ['Field Configurations', 'Field Lists'];

const FieldManagement = () => {
  const [activeTab, setActiveTab] = useState(1); // Field Lists active per Figma
  const [search, setSearch] = useState('');

  const filtered = mockFields.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <h2 className="text-[16px] font-semibold text-tds-text-heading-primary">Field Management</h2>
      </div>

      {/* Horizontal Tabs — regular style */}
      <div className="flex items-center border-b border-tds-border-neutral-primary mb-tds-16">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-tds-12 py-tds-8 text-[12px] font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === i
                ? 'border-b-[#191919] text-[#2b2b2b]'
                : 'border-b-transparent text-[#737373] hover:text-[#2b2b2b]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Field Lists Tab Content */}
      {activeTab === 1 && (
        <>
          {/* Search + Create */}
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <span className="text-[14px] font-bold text-[#111111]">List</span>
              <span className="text-[12px] font-medium text-[#666666]">({filtered.length})</span>
            </div>
            <div className="flex items-center gap-tds-16">
              <div className="w-[240px]">
                <Input
                  inputStyle="tarmac-01"
                  inputSize="sm"
                  styleVariant="standard"
                  placeholder="Search fields"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  leadingIcon={<SearchIcon />}
                />
              </div>
              <Button variant="black" buttonStyle="secondary" size="md" text="Create New Field" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#e6e6e6] rounded-[8px] overflow-hidden">
            {/* Header */}
            <div className="flex bg-[#f7f7f7]">
              <div className="w-[35%] px-tds-16 py-tds-12 text-[12px] font-normal text-[#444444]">Field Name</div>
              <div className="w-[20%] px-tds-12 py-tds-12 text-[12px] font-normal text-[#444444]">Field Type</div>
              <div className="w-[25%] px-tds-12 py-tds-12 flex items-center gap-tds-4 text-[12px] font-normal text-[#444444]">
                Created By <SortIcon />
              </div>
              <div className="w-[20%] px-tds-12 py-tds-12 flex items-center gap-tds-4 text-[12px] font-normal text-[#444444]">
                Created On <SortIcon />
              </div>
            </div>

            {/* Rows */}
            {filtered.map((field, idx) => (
              <div key={field.name} className={`flex items-center border-t border-[#e6e6e6] ${idx % 2 === 0 ? 'bg-white' : 'bg-white'}`}>
                <div className="w-[35%] px-tds-16 py-tds-12 text-[12px] font-semibold text-[#2b2b2b]">{field.name}</div>
                <div className="w-[20%] px-tds-12 py-tds-12 text-[12px] font-medium text-[#2b2b2b]">{field.type}</div>
                <div className="w-[25%] px-tds-12 py-tds-12">
                  <Pill text={field.createdBy} pillVariant="coal" pillType="subtle" size="md" />
                </div>
                <div className="w-[20%] px-tds-12 py-tds-12">
                  <div className="text-[12px] font-medium text-[#2b2b2b]">{field.createdOn}</div>
                  <div className="text-[12px] text-[#666666]">{field.createdTime}</div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between px-tds-16 py-tds-12 border-t border-[#e6e6e6]">
              <span className="text-[14px] text-[#666666]">Showing per page</span>
              <div className="flex items-center gap-tds-4">
                <div className="w-[34px] h-[34px] flex items-center justify-center bg-[#000] text-white rounded-[4px] text-[14px] font-medium">1</div>
                <div className="w-[34px] h-[34px] flex items-center justify-center text-[#cccbcb] rounded-[4px] text-[14px] font-medium">2</div>
              </div>
              <div className="flex items-center gap-tds-8 text-[14px] text-[#666666] opacity-30">
                <span>Previous</span>
                <span>|</span>
                <span>Next</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Field Configurations Tab Content */}
      {activeTab === 0 && (
        <div className="text-[14px] text-[#666666]">Field Configurations content — configure field groups and mappings here.</div>
      )}
    </div>
  );
};

export default FieldManagement;
