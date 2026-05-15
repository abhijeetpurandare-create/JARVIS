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

const EditIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.33 2L14 4.67L5.33 13.33H2.67V10.67L11.33 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const DeleteIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.67 4.67H13.33M6 4.67V2.67H10V4.67M12 4.67V13.33H4V4.67H12ZM6.67 7.33V10.67M9.33 7.33V10.67" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const TeamIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M10.67 12.67V11.33C10.67 10 9.67 9 8.33 9H4.33C3 9 2 10 2 11.33V12.67M14 12.67V11.33C14 10.33 13.33 9.47 12.33 9.2M10 3.53C11 3.8 11.67 4.67 11.67 5.67C11.67 6.67 11 7.53 10 7.8M6.33 7.33C7.8 7.33 8.67 6.47 8.67 5C8.67 3.53 7.8 2.67 6.33 2.67C4.87 2.67 4 3.53 4 5C4 6.47 4.87 7.33 6.33 7.33Z" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Status Flow data
interface StatusFlow {
  name: string;
  statusCount: number;
  teamCount: number;
}

const mockFlows: StatusFlow[] = [
  { name: 'Demo Status Flow', statusCount: 3, teamCount: 5 },
  { name: 'Ops Support', statusCount: 11, teamCount: 2 },
  { name: 'SME Claims Flow', statusCount: 9, teamCount: 2 },
  { name: 'CMS Status Flow', statusCount: 8, teamCount: 4 },
  { name: 'Automation and Infrastructure Support Team', statusCount: 13, teamCount: 2 },
  { name: 'Security Investigation Support Team', statusCount: 4, teamCount: 3 },
];

// Status Lists data
interface StatusItem {
  name: string;
  description: string;
  createdBy: string;
  createdOn: string;
  createdTime: string;
}

const mockStatuses: StatusItem[] = [
  { name: 'Shipped', description: 'In case of dispatch order, need to show status shipped', createdBy: 'Utkarsh Agarwal', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'TestField', description: 'Description of the status', createdBy: 'Utkarsh Agarwal', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'Assessment Under Review', description: 'Description of the status', createdBy: 'Utkarsh Agarwal', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'Insurance Assessment Received', description: 'Description of the status', createdBy: 'Utkarsh Agarwal', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'TestField', description: 'TestField', createdBy: 'Utkarsh Agarwal', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
  { name: 'Shipped', description: 'Shipped', createdBy: 'Utkarsh Agarwal', createdOn: '14 Apr 2026', createdTime: '12:36PM' },
];

const tabs = ['Status Flow', 'Status Lists'];

const StatusManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [flowSearch, setFlowSearch] = useState('');
  const [statusSearch, setStatusSearch] = useState('');

  const filteredFlows = mockFlows.filter((f) =>
    f.name.toLowerCase().includes(flowSearch.toLowerCase())
  );

  const filteredStatuses = mockStatuses.filter((s) =>
    s.name.toLowerCase().includes(statusSearch.toLowerCase())
  );

  return (
    <div>
      {/* Horizontal Tabs */}
      <div className="flex items-center border-b border-[#e6e6e6] mb-tds-16">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-tds-16 py-tds-12 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === i
                ? 'border-b-[#191919] text-[#2b2b2b]'
                : 'border-b-transparent text-[#737373] hover:text-[#2b2b2b]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===== Status Flow Tab ===== */}
      {activeTab === 0 && (
        <div className="px-tds-24 pt-tds-16">
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <span className="text-[14px] font-bold text-[#111111]">Flows</span>
              <span className="text-[12px] text-[#666666]">({filteredFlows.length})</span>
            </div>
            <div className="flex items-center gap-tds-16">
              <div className="w-[240px]">
                <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search status flows" value={flowSearch} onChange={(e) => setFlowSearch(e.target.value)} leadingIcon={<SearchIcon />} />
              </div>
              <Button variant="black" buttonStyle="secondary" size="md" text="+ Create Status Flow" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#e6e6e6] rounded-[8px] overflow-hidden">
            <div className="flex bg-[#f7f7f7] border-b border-[#e6e6e6]">
              <div className="w-[40%] px-tds-16 py-tds-12 text-[12px] font-normal text-[#444444]">Status Flow Name</div>
              <div className="w-[20%] px-tds-12 py-tds-12 text-[12px] font-normal text-[#444444]">No. of Statuses</div>
              <div className="w-[25%] px-tds-12 py-tds-12 text-[12px] font-normal text-[#444444]">Team Assigned</div>
              <div className="w-[15%] px-tds-12 py-tds-12 text-[12px] font-normal text-[#444444]">Actions</div>
            </div>

            {filteredFlows.map((flow, idx) => (
              <div key={`${flow.name}-${idx}`} className="flex items-center border-b border-[#e6e6e6] last:border-b-0">
                <div className="w-[40%] px-tds-16 py-tds-12 text-[12px] font-semibold text-[#2b2b2b]">{flow.name}</div>
                <div className="w-[20%] px-tds-12 py-tds-12 text-[12px] text-[#2b2b2b]">{flow.statusCount}</div>
                <div className="w-[25%] px-tds-12 py-tds-12">
                  <div className="flex items-center gap-tds-4">
                    <TeamIcon />
                    <span className="text-[12px] text-[#2b2b2b]">{flow.teamCount}</span>
                  </div>
                </div>
                <div className="w-[15%] px-tds-12 py-tds-12 flex items-center gap-tds-8">
                  <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><EditIcon /></button>
                  <button className="p-tds-4 text-[#737373] hover:text-[#dc2626] cursor-pointer"><DeleteIcon /></button>
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
        </div>
      )}

      {/* ===== Status Lists Tab ===== */}
      {activeTab === 1 && (
        <div className="px-tds-24 pt-tds-16">
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <span className="text-[14px] font-bold text-[#111111]">List</span>
              <span className="text-[12px] text-[#666666]">({filteredStatuses.length})</span>
            </div>
            <div className="flex items-center gap-tds-16">
              <div className="w-[240px]">
                <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search statuses" value={statusSearch} onChange={(e) => setStatusSearch(e.target.value)} leadingIcon={<SearchIcon />} />
              </div>
              <Button variant="black" buttonStyle="secondary" size="md" text="+ Create New Status" />
            </div>
          </div>

          {/* Table */}
          <div className="border border-[#e6e6e6] rounded-[8px] overflow-hidden">
            <div className="flex bg-[#f7f7f7] border-b border-[#e6e6e6]">
              <div className="w-[25%] px-tds-16 py-tds-12 text-[12px] font-normal text-[#444444]">Status Name</div>
              <div className="w-[35%] px-tds-12 py-tds-12 text-[12px] font-normal text-[#444444]">Status Description</div>
              <div className="w-[20%] px-tds-12 py-tds-12 flex items-center gap-tds-4 text-[12px] font-normal text-[#444444]">Created By <SortIcon /></div>
              <div className="w-[20%] px-tds-12 py-tds-12 flex items-center gap-tds-4 text-[12px] font-normal text-[#444444]">Created On <SortIcon /></div>
            </div>

            {filteredStatuses.map((status, idx) => (
              <div key={`${status.name}-${idx}`} className="flex items-center border-b border-[#e6e6e6] last:border-b-0">
                <div className="w-[25%] px-tds-16 py-tds-12 text-[12px] font-semibold text-[#2b2b2b]">{status.name}</div>
                <div className="w-[35%] px-tds-12 py-tds-12 text-[12px] text-[#666666]">{status.description}</div>
                <div className="w-[20%] px-tds-12 py-tds-12">
                  <Pill text={status.createdBy} pillVariant="coal" pillType="subtle" size="md" />
                </div>
                <div className="w-[20%] px-tds-12 py-tds-12">
                  <div className="text-[12px] font-medium text-[#2b2b2b]">{status.createdOn}</div>
                  <div className="text-[12px] text-[#666666]">{status.createdTime}</div>
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
        </div>
      )}
    </div>
  );
};

export default StatusManagement;
