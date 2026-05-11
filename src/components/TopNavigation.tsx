import { Button, Breadcrumbs } from '@delhivery/tarmac';
import { triggerToast } from './Toast';

const jarvisLogo = './jarvis-logo.png';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8.75 15C12.2018 15 15 12.2018 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.25 13.25L17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 6.67V13.33M6.67 10H13.33M10 17.5C14.14 17.5 17.5 14.14 17.5 10C17.5 5.86 14.14 2.5 10 2.5C5.86 2.5 2.5 5.86 2.5 10C2.5 14.14 5.86 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 5V2.5C5 2.22 5.22 2 5.5 2H13.5C13.78 2 14 2.22 14 2.5V10.5C14 10.78 13.78 11 13.5 11H11M2.5 5H10.5C10.78 5 11 5.22 11 5.5V13.5C11 13.78 10.78 14 10.5 14H2.5C2.22 14 2 13.78 2 13.5V5.5C2 5.22 2.22 5 2.5 5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const TopNavigation = () => {
  // Get current ticket ID from hash
  const hash = window.location.hash;
  const ticketMatch = hash.match(/ticket\/(J\d+)/);
  const ticketId = ticketMatch ? ticketMatch[1] : null;
  const isTicketDetails = !!ticketId;

  const breadcrumbItems = isTicketDetails
    ? [
        { label: 'Ticket Listing', link: '#/' },
        { label: `Ticket Details (#${ticketId})` },
      ]
    : [
        { label: 'Ticket Listing', isCurrent: true },
      ];

  return (
    <header className="flex items-center gap-tds-16 px-tds-24 py-tds-8 bg-tds-surface-bg-primary-default w-full h-[60px] relative z-10" style={{ boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.12), 0px 1px 2px 0px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between flex-1">
        {/* Left — Logo + Divider + TDS Breadcrumbs */}
        <div className="flex items-center gap-tds-16">
          <img src={jarvisLogo} alt="JARVIS" className="h-[20px] w-auto object-contain" />
          <div className="w-px h-[24px] bg-tds-border-neutral-primary" />
          <div className="flex items-center gap-tds-6">
            <Breadcrumbs
              dividerStyle="chevron"
              size="sm"
              showDivider
              items={breadcrumbItems}
            />
            {isTicketDetails && (
              <button
                onClick={() => { navigator.clipboard.writeText(ticketId!); triggerToast('Ticket ID copied to clipboard'); }}
                className="text-tds-text-caption-secondary hover:text-tds-text-body-primary cursor-pointer p-[2px]"
                title="Copy ticket ID"
              >
                <CopyIcon />
              </button>
            )}
          </div>
        </div>

        {/* Right — Search + Create Ticket */}
        <div className="flex items-center gap-tds-16">
          {/* Search Split */}
          <div className="flex items-center h-[36px]">
            <button className="flex items-center gap-tds-4 px-tds-12 h-full border border-tds-border-neutral-primary rounded-l-tds-default bg-tds-surface-bg-primary-default cursor-pointer">
              <span className="text-[12px] font-medium text-tds-text-body-primary whitespace-nowrap">
                Ticket ID
              </span>
              <ChevronDownIcon />
            </button>
            <div className="flex items-center gap-tds-4 px-tds-12 h-full border border-tds-border-neutral-primary border-l-0 rounded-r-tds-default bg-tds-surface-bg-primary-default w-[280px]">
              <span className="text-tds-icon-body-primary">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by ticket id"
                className="flex-1 text-[12px] font-medium text-tds-text-body-primary placeholder:text-tds-text-body-disabled outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Create Ticket — TDS Button */}
          <Button variant="black" buttonStyle="primary" size="md" leadingIcon={<AddCircleIcon />} text="Create Ticket" className="!h-[36px] !py-0" />
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
