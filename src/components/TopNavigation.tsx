import { Button } from '@delhivery/tarmac';

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

const TopNavigation = () => {
  return (
    <header className="flex items-center gap-tds-16 px-tds-24 py-tds-8 bg-tds-surface-bg-primary-default w-full h-[60px] relative z-10" style={{ boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.12), 0px 1px 2px 0px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center justify-between flex-1">
        {/* Left — Logo */}
        <div className="flex items-center">
          <img src="./jarvis-logo.svg" alt="JARVIS" className="h-[20px]" />
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
          <Button variant="black" buttonStyle="secondary" size="md" leadingIcon={<AddCircleIcon />} text="Create Ticket" className="!h-[36px] !py-0" />
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
