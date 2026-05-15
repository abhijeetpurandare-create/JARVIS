import { useState } from 'react';
import { Button, Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.33 2L14 4.67L5.33 13.33H2.67V10.67L11.33 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const LinkIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.67 8.67C7.2 9.33 8 9.67 8.87 9.67C9.73 9.67 10.53 9.33 11.07 8.67L13.07 6.67C14.13 5.6 14.13 3.87 13.07 2.8C12 1.73 10.27 1.73 9.2 2.8L8.27 3.73M9.33 7.33C8.8 6.67 8 6.33 7.13 6.33C6.27 6.33 5.47 6.67 4.93 7.33L2.93 9.33C1.87 10.4 1.87 12.13 2.93 13.2C4 14.27 5.73 14.27 6.8 13.2L7.73 12.27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const DeleteIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.67 4.67H13.33M6 4.67V2.67H10V4.67M12 4.67V13.33H4V4.67H12ZM6.67 7.33V10.67M9.33 7.33V10.67" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

interface FormItem {
  name: string;
  category: string;
  description: string;
}

const mockForms: FormItem[] = [
  {
    name: 'Scheduled Downtime',
    category: 'A&I - Breakdown & Downtime',
    description: 'Scheduled Downtime Escalations',
  },
  {
    name: 'Breakdown Log Form',
    category: 'A&I - Breakdown & Downtime',
    description: 'Unplanned Machine Breakdowns or weight/dimension issues across sorter, profiler, DWS, and conveyor systems',
  },
  {
    name: 'Modification Request Form',
    category: 'A&I - Modification',
    description: 'Modification requests for existing machines',
  },
];

const Forms = () => {
  const [search, setSearch] = useState('');

  const filtered = mockForms.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-tds-24 pt-tds-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <div className="flex items-center gap-tds-8">
          <span className="text-[14px] font-bold text-[#111111]">Forms</span>
          <span className="text-[12px] text-[#666666]">({filtered.length})</span>
        </div>
        <div className="flex items-center gap-tds-16">
          <div className="w-[240px]">
            <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search forms" value={search} onChange={(e) => setSearch(e.target.value)} leadingIcon={<SearchIcon />} />
          </div>
          <Button variant="black" buttonStyle="secondary" size="md" text="+ Create New Form" />
        </div>
      </div>

      {/* Forms list */}
      <div className="flex flex-col gap-tds-12">
        {filtered.map((form, idx) => (
          <div key={`${form.name}-${idx}`} className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
            {/* Form header */}
            <div className="flex items-center justify-between mb-tds-8">
              <div>
                <h3 className="text-[14px] font-semibold text-[#2b2b2b]">{form.name}</h3>
                <p className="text-[12px] text-[#666666]">{form.category}</p>
              </div>
              <div className="flex items-center gap-tds-8">
                <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><EditIcon /></button>
                <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><LinkIcon /></button>
                <button className="p-tds-4 text-[#737373] hover:text-[#dc2626] cursor-pointer"><DeleteIcon /></button>
              </div>
            </div>

            {/* Description */}
            <p className="text-[12px] text-[#666666]">{form.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;
