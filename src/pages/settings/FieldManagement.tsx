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

const CopyIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5 5V2.5C5 2.22 5.22 2 5.5 2H13.5C13.78 2 14 2.22 14 2.5V10.5C14 10.78 13.78 11 13.5 11H11M2.5 5H10.5C10.78 5 11 5.22 11 5.5V13.5C11 13.78 10.78 14 10.5 14H2.5C2.22 14 2 13.78 2 13.5V5.5C2 5.22 2.22 5 2.5 5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.33 2L14 4.67L5.33 13.33H2.67V10.67L11.33 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const DeleteIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.67 4.67H13.33M6 4.67V2.67H10V4.67M12 4.67V13.33H4V4.67H12ZM6.67 7.33V10.67M9.33 7.33V10.67" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// Field Configurations data
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
      { name: 'Request for', type: 'Curl' }, { name: 'Requester', type: 'String' },
      { name: 'Employee Name', type: 'String' }, { name: 'Employee Designation', type: 'String' },
      { name: 'Employee Code', type: 'String' }, { name: 'Mobile No.', type: 'String' },
      { name: 'Request for', type: 'Curl' }, { name: 'Requester', type: 'String' },
      { name: 'Employee Name', type: 'String' }, { name: 'Employee Designation', type: 'String' },
      { name: 'Employee Code', type: 'String' }, { name: 'Mobile No.', type: 'String' },
      { name: 'Employee Name', type: 'String' }, { name: 'Employee Designation', type: 'String' },
      { name: 'Employee Code', type: 'String' }, { name: 'Mobile No.', type: 'String' },
    ],
  },
  {
    name: 'A&I Scheduled Downtime',
    fieldCount: 21,
    fields: [
      { name: 'Request for', type: 'Curl' }, { name: 'Requester', type: 'String' },
      { name: 'Employee Name', type: 'String' }, { name: 'Employee Designation', type: 'String' },
      { name: 'Employee Code', type: 'String' }, { name: 'Mobile No.', type: 'String' },
      { name: 'Request for', type: 'Curl' }, { name: 'Requester', type: 'String' },
      { name: 'Employee Name', type: 'String' }, { name: 'Employee Designation', type: 'String' },
      { name: 'Employee Code', type: 'String' }, { name: 'Mobile No.', type: 'String' },
      { name: 'Employee Name', type: 'String' }, { name: 'Employee Designation', type: 'String' },
      { name: 'Employee Code', type: 'String' }, { name: 'Mobile No.', type: 'String' },
      { name: 'Employee Designation', type: 'String' }, { name: 'Employee Code', type: 'String' },
      { name: 'Mobile No.', type: 'String' }, { name: 'Employee Name', type: 'String' },
      { name: 'Employee Code', type: 'String' },
    ],
  },
];

// Field Lists data
interface FieldItem {
  name: string;
  type: string;
  editable?: boolean;
  createdBy: string;
  createdOn: string;
  createdTime: string;
}

const mockFields: FieldItem[] = [
  { name: 'ticketingVersion', type: 'String', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'updateActivityMetadata', type: 'Object', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'department', type: 'Dropdown', editable: true, createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'acktemplate', type: 'String', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'Media Context', type: 'Object', createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'Ewaybillstatus', type: 'Dropdown', editable: true, createdBy: 'Adarsh Maurya', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
];

const tabs = ['Field Configurations', 'Field Lists'];

const FieldManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [configSearch, setConfigSearch] = useState('');

  const filteredFields = mockFields.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredConfigs = mockConfigs.filter((c) =>
    c.name.toLowerCase().includes(configSearch.toLowerCase())
  );

  return (
    <div>
      {/* Horizontal Tabs — regular style with underline */}
      <div className="flex items-center border-b border-[#e6e6e6] mb-tds-16">
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

      {/* ===== Field Configurations Tab ===== */}
      {activeTab === 0 && (
        <>
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <span className="text-[14px] font-bold text-[#111111]">Configurations</span>
              <span className="text-[12px] text-[#666666]">({filteredConfigs.reduce((a, c) => a + c.fieldCount, 0)})</span>
            </div>
            <div className="flex items-center gap-tds-16">
              <div className="w-[240px]">
                <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search field configurations" value={configSearch} onChange={(e) => setConfigSearch(e.target.value)} leadingIcon={<SearchIcon />} />
              </div>
              <Button variant="black" buttonStyle="secondary" size="md" text="Create New Configuration" />
            </div>
          </div>

          {/* Config sections */}
          <div className="flex flex-col gap-tds-24">
            {filteredConfigs.map((config) => (
              <div key={config.name} className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
                {/* Section header */}
                <div className="flex items-center justify-between mb-tds-12">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111111]">{config.name}</h3>
                    <p className="text-[12px] text-[#666666]">{config.fieldCount} Fields Configured</p>
                  </div>
                  <div className="flex items-center gap-tds-12">
                    <Button variant="black" buttonStyle="tertiary" size="sm" text="+ Add New Field" />
                    <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><CopyIcon /></button>
                    <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><EditIcon /></button>
                    <button className="p-tds-4 text-[#737373] hover:text-[#dc2626] cursor-pointer"><DeleteIcon /></button>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e6e6e6] mb-tds-12" />

                {/* Field chips grid */}
                <div className="flex flex-wrap gap-tds-8">
                  {config.fields.map((field, idx) => (
                    <div key={`${field.name}-${idx}`} className="px-tds-12 py-tds-8 border border-[#e6e6e6] rounded-[4px] bg-white">
                      <div className="text-[12px] font-medium text-[#2b2b2b]">{field.name}</div>
                      <div className="text-[12px] text-[#666666]">{field.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== Field Lists Tab ===== */}
      {activeTab === 1 && (
        <>
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <span className="text-[14px] font-bold text-[#111111]">List</span>
              <span className="text-[12px] text-[#666666]">({filteredFields.length})</span>
            </div>
            <div className="flex items-center gap-tds-16">
              <div className="w-[240px]">
                <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search fields" value={search} onChange={(e) => setSearch(e.target.value)} leadingIcon={<SearchIcon />} />
              </div>
              <Button variant="black" buttonStyle="secondary" size="md" text="+ Create New Field" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#e6e6e6] rounded-[8px] overflow-hidden">
            <div className="flex bg-[#f7f7f7] border-b border-[#e6e6e6]">
              <div className="w-[35%] px-tds-16 py-tds-12 text-[12px] font-normal text-[#444444]">Field Name</div>
              <div className="w-[20%] px-tds-12 py-tds-12 text-[12px] font-normal text-[#444444]">Field Type</div>
              <div className="w-[25%] px-tds-12 py-tds-12 flex items-center gap-tds-4 text-[12px] font-normal text-[#444444]">Created By <SortIcon /></div>
              <div className="w-[20%] px-tds-12 py-tds-12 flex items-center gap-tds-4 text-[12px] font-normal text-[#444444]">Created On <SortIcon /></div>
            </div>

            {filteredFields.map((field) => (
              <div key={field.name} className="flex items-center border-b border-[#e6e6e6] last:border-b-0">
                <div className="w-[35%] px-tds-16 py-tds-12 text-[12px] font-semibold text-[#2b2b2b]">{field.name}</div>
                <div className="w-[20%] px-tds-12 py-tds-12 flex items-center gap-tds-4">
                  <span className="text-[12px] font-medium text-[#2b2b2b]">{field.type}</span>
                  {field.editable && <EditIcon />}
                </div>
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
              <div className="flex items-center gap-tds-4 text-[14px] text-[#666666]">
                Showing per page
                <select className="border border-[#e6e6e6] rounded-[4px] px-tds-8 py-tds-4 text-[14px] text-[#2b2b2b] outline-none">
                  <option>30</option>
                </select>
              </div>
              <div className="flex items-center gap-tds-4">
                <div className="w-[34px] h-[34px] flex items-center justify-center bg-[#000] text-white rounded-[4px] text-[14px] font-medium">1</div>
                <div className="w-[34px] h-[34px] flex items-center justify-center text-[#cccbcb] rounded-[4px] text-[14px] font-medium">2</div>
              </div>
              <div className="flex items-center gap-tds-8 text-[14px] text-[#666666] opacity-30">
                <span>← Previous</span>
                <span>|</span>
                <span>Next →</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FieldManagement;
