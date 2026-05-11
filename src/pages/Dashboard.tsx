import { Button, Pill, Badge } from '@delhivery/tarmac';

// Workload card data
const workloadCards = [
  {
    title: 'At Risk',
    titleColor: 'text-[#c47e09]',
    badge: 'Breaching in 1 Hour',
    badgeBorder: 'border-[#c47e09]',
    badgeText: 'text-[#c47e09]',
    count: 20,
    breakdown: [
      { value: '05', label: 'SLA' },
      { value: '15', label: 'Closure' },
    ],
  },
  {
    title: 'Past Breach',
    titleColor: 'text-[#ed4136]',
    badge: 'Last 24 Hour',
    badgeBorder: 'border-[#ed4136]',
    badgeText: 'text-[#ed4136]',
    count: 20,
    breakdown: [
      { value: '05', label: 'SLA' },
      { value: '15', label: 'Closure' },
    ],
  },
  {
    title: 'Open',
    titleColor: 'text-tds-text-heading-primary',
    badge: null,
    badgeBorder: '',
    badgeText: '',
    count: 50,
    breakdown: [
      { value: '05', label: 'FRP' },
      { value: '15', label: 'NRP' },
    ],
  },
  {
    title: 'Awaiting Your Response',
    titleColor: 'text-tds-text-heading-primary',
    badge: null,
    badgeBorder: '',
    badgeText: '',
    count: 15,
    breakdown: [
      { value: '5', label: 'Customer' },
      { value: '10', label: 'Internal' },
    ],
  },
];

// Performance cards
const performanceCards = [
  { title: 'Closure Rate', value: '90%', change: '8%', positive: true },
  { title: 'SLA Adherence', value: '87%', change: '7%', positive: false },
  { title: 'Ageing', value: '3.3%', change: '0.3%', positive: true },
  { title: 'Avg. Response Time', value: '60 Mins', change: '8 Mins', positive: false },
  { title: 'Avg. Resolution Time', value: '6 Days', change: '2 Days', positive: true },
];

// Team ageing data
const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'];
const ageingBuckets = ['1-2', '2-3', '4-7', '7-14', '14-21', '21-30', '>30'];
const teamTotals = [41, 63, 46, 72, 41];
const ageingData: Record<string, number[]> = {
  'Team 1': [0, 2, 0, 14, 12, 19, 38],
  'Team 2': [0, 3, 0, 0, 0, 0, 0],
  'Team 3': [5, 7, 8, 0, 0, 6, 5],
  'Team 4': [10, 5, 0, 0, 0, 12, 12],
  'Team 5': [0, 1, 0, 0, 0, 0, 9],
};

// Color coding for heatmap
const getHeatColor = (val: number): string => {
  if (val === 0) return 'bg-tds-surface-bg-primary-default border-tds-border-neutral-primary';
  if (val <= 3) return 'bg-[#efefef] border-[#efefef]';
  if (val <= 7) return 'bg-[#fff6ea] border-[#fff6ea]';
  if (val <= 12) return 'bg-[#fceacc] border-[#fceacc]';
  if (val <= 19) return 'bg-[#fbd9d7] border-[#fbd9d7]';
  return 'bg-[#ed4136] border-[#ed4136]';
};
const getHeatTextColor = (val: number): string => {
  if (val === 0) return 'text-tds-text-body-primary';
  if (val <= 7) return 'text-[#92400e]';
  if (val <= 19) return 'text-[#8e2720]';
  return 'text-tds-text-heading-inverse-only-white';
};

// Quick links
const quickLinks = [
  { label: 'FAAS', href: '#' },
  { label: 'Escalation Matrix', href: '#' },
  { label: 'Agent Dashboard', href: '#' },
];

const ArrowUpIcon = () => <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ArrowDownIcon = () => <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M6 10L2.5 6.5M6 10L9.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ExternalLinkIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 6.5V9.5C9 10.05 8.55 10.5 8 10.5H2.5C1.95 10.5 1.5 10.05 1.5 9.5V4C1.5 3.45 1.95 3 2.5 3H5.5M7 1.5H10.5V5M5.5 6.5L10.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const UsersIcon = () => <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13.33 15.83V14.17C13.33 12.5 12.08 11.25 10.42 11.25H5.42C3.75 11.25 2.5 12.5 2.5 14.17V15.83M17.5 15.83V14.17C17.5 12.92 16.67 11.83 15.42 11.5M12.5 4.58C13.75 4.92 14.58 6 14.58 7.25C14.58 8.5 13.75 9.58 12.5 9.92M7.92 9.17C9.58 9.17 10.83 7.92 10.83 6.25C10.83 4.58 9.58 3.33 7.92 3.33C6.25 3.33 5 4.58 5 6.25C5 7.92 6.25 9.17 7.92 9.17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between py-tds-16">
        <div className="flex items-center gap-tds-8">
          <h1 className="text-[16px] font-semibold text-tds-text-heading-primary leading-[24px]">Dashboard</h1>
        </div>
        <div className="flex items-center gap-tds-12">
          <span className="text-[14px] text-tds-text-caption-secondary">Last Updated: 11 May, 3:34 PM</span>
          <Button variant="black" buttonStyle="primary" size="sm" leadingIcon={<UsersIcon />} text="View Team Performance" isRounded />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-tds-16 pb-tds-16">
        {/* Today's Workload Overview */}
        <div className="bg-tds-surface-bg-primary-default rounded-[12px] p-tds-16 border border-tds-border-neutral-primary">
          <h2 className="text-[16px] font-semibold text-tds-text-heading-primary mb-tds-16">Today's Workload Overview</h2>
          <div className="grid grid-cols-4 gap-tds-16">
            {workloadCards.map((card) => (
              <div key={card.title} className="border border-tds-border-neutral-primary rounded-tds-md p-tds-16 flex flex-col gap-tds-8" style={{ boxShadow: '0 8px 24px rgba(60,71,107,0.06)' }}>
                <div className="flex items-center gap-tds-8">
                  <span className={`text-[14px] font-medium ${card.titleColor}`}>{card.title}</span>
                  {card.badge && (
                    <span className={`text-[12px] font-semibold px-tds-8 py-[2px] rounded-full border ${card.badgeBorder} ${card.badgeText}`}>
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-[20px] font-bold text-tds-text-heading-primary">{card.count}</span>
                  <div className="flex items-center gap-tds-8">
                    {card.breakdown.map((b, i) => (
                      <div key={i} className="flex items-center gap-tds-4">
                        <span className="text-[14px] font-semibold text-tds-text-heading-primary">{b.value}</span>
                        <span className="text-[14px] text-tds-text-caption-secondary">{b.label}</span>
                        {i < card.breakdown.length - 1 && <span className="text-[12px] text-tds-text-caption-secondary mx-tds-4">|</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two column layout: Performance + Quick Links */}
        <div className="flex gap-tds-16">
          {/* Performance Overview */}
          <div className="flex-1 bg-tds-surface-bg-primary-default rounded-[12px] p-tds-16 border border-tds-border-neutral-primary">
            <div className="flex items-center gap-tds-8 mb-tds-16">
              <h2 className="text-[16px] font-semibold text-tds-text-heading-primary">Performance Overview</h2>
              <Pill text="17 Nov - 21 Nov" pillVariant="coal" pillType="subtle" size="sm" />
            </div>
            <div className="grid grid-cols-5 gap-tds-12">
              {performanceCards.map((card) => (
                <div key={card.title} className="border border-tds-border-neutral-primary rounded-tds-md p-tds-12 flex flex-col gap-tds-8">
                  <span className="text-[14px] font-medium text-tds-text-body-primary">{card.title}</span>
                  <div className="flex items-center gap-tds-8">
                    <span className="text-[20px] font-bold text-tds-text-heading-primary">{card.value}</span>
                    <Badge
                      variant={card.positive ? 'success' : 'error'}
                      size="sm"
                      text={card.change}
                      leadingIcon={card.positive ? <ArrowDownIcon /> : <ArrowUpIcon />}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-[280px] bg-tds-surface-bg-primary-default rounded-[12px] p-tds-16 border border-tds-border-neutral-primary">
            <h2 className="text-[16px] font-semibold text-tds-text-heading-primary mb-tds-16">Quick Links</h2>
            <div className="flex flex-col gap-tds-12">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="flex items-center justify-between px-tds-12 py-tds-8 border border-tds-border-neutral-primary rounded-tds-md hover:bg-tds-surface-bg-coal-weakest transition-colors cursor-pointer">
                  <span className="text-[14px] font-medium text-[#5b80f7]">{link.label}</span>
                  <span className="text-[#5b80f7]"><ExternalLinkIcon /></span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Team-wise Ticket Ageing */}
        <div className="bg-tds-surface-bg-primary-default rounded-[12px] p-tds-16 border border-tds-border-neutral-primary">
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <h2 className="text-[16px] font-semibold text-tds-text-heading-primary">Team-wise Ticket Ageing</h2>
            </div>
            <div className="flex items-center gap-tds-8">
              {/* Legend */}
              <div className="flex items-center gap-tds-4">
                <div className="w-[16px] h-[16px] rounded-[2px] bg-tds-surface-bg-primary-default border border-[#f5f6f8]" />
                <div className="w-[16px] h-[16px] rounded-[2px] bg-[#efefef]" />
                <div className="w-[16px] h-[16px] rounded-[2px] bg-[#fff6ea]" />
                <div className="w-[16px] h-[16px] rounded-[2px] bg-[#fceacc]" />
                <div className="w-[16px] h-[16px] rounded-[2px] bg-[#fbd9d7]" />
                <div className="w-[16px] h-[16px] rounded-[2px] bg-[#ed4136]" />
              </div>
              <span className="text-[10px] text-tds-text-caption-secondary">0 Tickets</span>
              <span className="text-[10px] text-tds-text-heading-primary font-medium">40</span>
            </div>
          </div>

          {/* Table */}
          <div className="border border-tds-border-neutral-primary rounded-tds-md overflow-hidden">
            {/* Header */}
            <div className="flex">
              <div className="w-[100px] shrink-0 px-tds-16 py-tds-12 bg-[#efefef] border-r border-tds-border-neutral-primary">
                <span className="text-[12px] font-semibold text-tds-text-body-secondary">Dependency</span>
              </div>
              <div className="w-[100px] shrink-0 px-tds-16 py-tds-12 bg-[#efefef] border-r border-tds-border-neutral-primary text-center">
                <span className="text-[12px] font-semibold text-tds-text-body-secondary">Total Tickets</span>
              </div>
              <div className="flex-1 bg-[#f5f6f8] border-r border-tds-border-neutral-primary">
                <div className="px-tds-16 py-tds-8 text-center border-b border-tds-border-neutral-primary">
                  <span className="text-[12px] font-semibold text-tds-text-body-secondary">Ageing (Days)</span>
                </div>
                <div className="flex">
                  {ageingBuckets.map((bucket) => (
                    <div key={bucket} className="flex-1 px-tds-4 py-tds-8 text-center border-r border-tds-border-neutral-primary last:border-r-0">
                      <span className="text-[12px] font-semibold text-tds-text-body-secondary">{bucket}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rows */}
            {teams.map((team, idx) => (
              <div key={team} className="flex border-t border-tds-border-neutral-primary">
                <div className="w-[100px] shrink-0 px-tds-16 py-tds-12 border-r border-tds-border-neutral-primary flex items-center">
                  <span className="text-[14px] font-medium text-tds-text-body-primary">{team}</span>
                </div>
                <div className="w-[100px] shrink-0 px-tds-16 py-tds-12 border-r border-tds-border-neutral-primary flex items-center justify-center">
                  <span className="text-[14px] font-semibold text-tds-text-heading-primary">{teamTotals[idx]}</span>
                </div>
                <div className="flex-1 flex">
                  {ageingData[team].map((val, i) => (
                    <div key={i} className="flex-1 px-tds-4 py-tds-8 flex items-center justify-center border-r border-tds-border-neutral-primary last:border-r-0">
                      <div className={`w-full h-[36px] rounded-[4px] flex items-center justify-center border ${getHeatColor(val)}`}>
                        <span className={`text-[14px] font-semibold ${getHeatTextColor(val)}`}>{val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
