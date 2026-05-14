import { Button } from '@delhivery/tarmac';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M11.33 2L14 4.67L5.33 13.33H2.67V10.67L11.33 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2.67 4.67H13.33M6 4.67V2.67H10V4.67M12 4.67V13.33H4V4.67H12ZM6.67 7.33V10.67M9.33 7.33V10.67" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
  timezone: string;
  schedule: string;
  createdAt: string;
}

const mockConfigs: BusinessHourConfig[] = [
  {
    name: 'Consignee Second Business hours',
    timezone: 'Asia/Kolkata (IST)',
    schedule: 'Mon - Sat (9:00 AM - 6:00 PM)',
    createdAt: '2023-08-15',
  },
  {
    name: 'Demo',
    timezone: 'Asia/Kolkata (IST)',
    schedule: 'Mon - Fri (9:00 AM - 5:00 PM)',
    createdAt: '2024-01-10',
  },
  {
    name: 'Mon - Sat (9:30 AM - 6:30 PM)',
    timezone: 'Asia/Kolkata (IST)',
    schedule: 'Mon - Sat (9:30 AM - 6:30 PM)',
    createdAt: '2023-06-20',
  },
  {
    name: 'testing12345',
    timezone: 'Asia/Kolkata (IST)',
    schedule: 'Mon - Fri (10:00 AM - 7:00 PM)',
    createdAt: '2024-03-05',
  },
  {
    name: 'Team for sme b2c narad',
    timezone: 'Asia/Kolkata (IST)',
    schedule: 'Mon - Sat (9:00 AM - 9:00 PM)',
    createdAt: '2023-10-12',
  },
  {
    name: 'C2C Business Hours',
    timezone: 'Asia/Kolkata (IST)',
    schedule: 'Mon - Sun (8:00 AM - 10:00 PM)',
    createdAt: '2023-07-01',
  },
];

const BusinessHours = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        
        <Button variant="black" buttonStyle="secondary" size="md" text="Create Business Hours" />
      </div>

      {/* List */}
      <div className="space-y-[8px]">
        {mockConfigs.map((config) => (
          <div
            key={config.name}
            className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg p-tds-16 flex items-center gap-tds-16"
          >
            {/* Icon */}
            <div className="w-[36px] h-[36px] rounded-[8px] bg-[#f0f7ff] flex items-center justify-center shrink-0">
              <span className="text-[#2563eb]">
                <ClockIcon />
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[14px] font-medium text-tds-text-body-primary truncate">
                {config.name}
              </h3>
              <div className="flex items-center gap-tds-12 mt-tds-4">
                <span className="text-[12px] text-tds-text-caption-secondary">{config.schedule}</span>
                <span className="text-[12px] text-tds-text-caption-secondary">•</span>
                <span className="text-[12px] text-tds-text-caption-secondary">{config.timezone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-tds-8 shrink-0">
              <button className="p-tds-8 rounded-[6px] hover:bg-[#f5f5f5] text-tds-text-caption-secondary hover:text-tds-text-body-primary transition-colors cursor-pointer">
                <EditIcon />
              </button>
              <button className="p-tds-8 rounded-[6px] hover:bg-[#fef2f2] text-tds-text-caption-secondary hover:text-[#dc2626] transition-colors cursor-pointer">
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessHours;
