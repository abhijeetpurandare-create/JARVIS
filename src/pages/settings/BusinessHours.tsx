import { useState } from 'react';

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.33 2L14 4.67L5.33 13.33H2.67V10.67L11.33 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2.67 4.67H13.33M6 4.67V2.67H10V4.67M12 4.67V13.33H4V4.67H12ZM6.67 7.33V10.67M9.33 7.33V10.67" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 4.67V8L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface BusinessHourConfig {
  name: string;
  description: string;
  type: '24/7' | 'custom';
  workingDays: string[]; // e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
}

const allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const mockConfigs: BusinessHourConfig[] = [
  {
    name: 'Default 24/7 Support',
    description: 'Round the clock support for all teams',
    type: '24/7',
    workingDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    name: 'Consignee Second Business Hours',
    description: 'Mon - Sat (9:00 AM - 6:00 PM)',
    type: 'custom',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    name: 'Demo Business Hours',
    description: 'Mon - Fri (9:00 AM - 5:00 PM)',
    type: 'custom',
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  },
];

type FilterType = 'all' | '24/7' | 'custom';

const BusinessHours = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filtered = mockConfigs.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '24/7') return c.type === '24/7';
    return c.type === 'custom';
  });

  const count247 = mockConfigs.filter((c) => c.type === '24/7').length;
  const countCustom = mockConfigs.filter((c) => c.type === 'custom').length;

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: mockConfigs.length },
    { key: '24/7', label: '24/7 Support', count: count247 },
    { key: 'custom', label: 'Custom Support', count: countCustom },
  ];

  return (
    <div className="px-tds-24 pt-tds-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <span className="text-[14px] font-bold text-[#111111]">Business Hours</span>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-tds-8 mb-tds-16">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-tds-12 py-tds-6 rounded-[16px] text-[12px] font-medium transition-colors cursor-pointer ${
              activeFilter === filter.key
                ? 'bg-[#191919] text-white'
                : 'bg-white border border-[#e6e6e6] text-[#2b2b2b] hover:bg-[#f7f7f7]'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Configs list */}
      <div className="flex flex-col gap-tds-16">
        {filtered.map((config) => (
          <div key={config.name} className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
            {/* Config header */}
            <div className="flex items-center justify-between mb-tds-12">
              <div className="flex items-center gap-tds-8">
                <span className="text-[#666666]"><ClockIcon /></span>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#2b2b2b]">{config.name}</h3>
                  <p className="text-[12px] text-[#666666]">{config.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-tds-8">
                <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><EditIcon /></button>
                <button className="p-tds-4 text-[#737373] hover:text-[#dc2626] cursor-pointer"><DeleteIcon /></button>
              </div>
            </div>

            {/* Divider end-to-end */}
            <div className="h-px bg-[#e6e6e6] -mx-tds-16 mb-tds-12" />

            {/* Working Days — right aligned */}
            <div className="flex items-center justify-end gap-tds-8">
              <span className="text-[12px] text-[#666666] mr-tds-4">Working Days</span>
              {allDays.map((day) => (
                <span
                  key={day}
                  className={`w-[32px] h-[32px] flex items-center justify-center rounded-full text-[11px] font-medium ${
                    config.workingDays.includes(day)
                      ? 'bg-[#191919] text-white'
                      : 'border border-[#e6e6e6] text-[#666666]'
                  }`}
                >
                  {day.slice(0, 2)}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessHours;
