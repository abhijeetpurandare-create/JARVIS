import { useState } from 'react';
import { Button, Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FormIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 2.67H12C12.37 2.67 12.67 2.97 12.67 3.33V12.67C12.67 13.03 12.37 13.33 12 13.33H4C3.63 13.33 3.33 13.03 3.33 12.67V3.33C3.33 2.97 3.63 2.67 4 2.67Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.33 5.33H10.67M5.33 8H10.67M5.33 10.67H8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface FormItem {
  name: string;
  category: string;
  fieldCount: number;
  createdAt: string;
  status: 'Active' | 'Draft';
}

const mockForms: FormItem[] = [
  {
    name: 'Scheduled Downtime',
    category: 'A&I - Breakdown & Downtime',
    fieldCount: 12,
    createdAt: '2024-01-20',
    status: 'Active',
  },
  {
    name: 'Breakdown',
    category: 'A&I - Breakdown & Downtime',
    fieldCount: 15,
    createdAt: '2023-11-15',
    status: 'Active',
  },
  {
    name: 'Modification',
    category: 'A&I - Modification',
    fieldCount: 8,
    createdAt: '2024-02-10',
    status: 'Active',
  },
  {
    name: 'Weighing Machine breakdown.',
    category: 'A&I - Weighing Machine Support',
    fieldCount: 10,
    createdAt: '2023-12-05',
    status: 'Active',
  },
  {
    name: 'B2C Claim Submission',
    category: 'Claims - B2C',
    fieldCount: 14,
    createdAt: '2024-03-01',
    status: 'Draft',
  },
  {
    name: 'Franchise Onboarding',
    category: 'Franchise Support',
    fieldCount: 20,
    createdAt: '2024-02-28',
    status: 'Active',
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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <h1 className="text-[20px] font-semibold text-tds-text-body-primary" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          Forms
        </h1>
        <Button variant="black" buttonStyle="primary" size="md" text="Create Form" />
      </div>

      {/* Search */}
      <div className="mb-tds-16 max-w-[320px]">
        <Input
          size="sm"
          placeholder="Search forms..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leadingIcon={<SearchIcon />}
        />
      </div>

      {/* Forms List */}
      <div className="space-y-[8px]">
        {filtered.map((form) => (
          <div
            key={form.name}
            className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg p-tds-16 flex items-center gap-tds-16 hover:shadow-sm transition-shadow cursor-pointer"
          >
            {/* Icon */}
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#f0f7ff] flex items-center justify-center shrink-0">
              <span className="text-[#2563eb]">
                <FormIcon />
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[14px] font-medium text-tds-text-body-primary">{form.name}</h3>
              <p className="text-[12px] text-tds-text-caption-secondary mt-tds-4">{form.category}</p>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-tds-16 shrink-0">
              <span className="text-[12px] text-tds-text-caption-secondary">{form.fieldCount} fields</span>
              <span className="text-[12px] text-tds-text-caption-secondary">{form.createdAt}</span>
              <span
                className={`inline-flex items-center px-tds-8 py-[2px] rounded-[4px] text-[12px] font-medium ${
                  form.status === 'Active'
                    ? 'bg-[#ecfdf5] text-[#059669]'
                    : 'bg-[#f5f5f5] text-tds-text-caption-secondary'
                }`}
              >
                {form.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forms;
