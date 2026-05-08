import { Avatar } from '@delhivery/tarmac';

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2.5 5H17.5M2.5 10H17.5M2.5 15H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3.33 8.33L10 2.5L16.67 8.33V16.67H12.5V11.67H7.5V16.67H3.33V8.33Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const TicketIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.67 8.33V5.83C16.67 5 16 4.17 15 4.17H5C4 4.17 3.33 5 3.33 5.83V8.33C4.17 8.33 5 9.17 5 10C5 10.83 4.17 11.67 3.33 11.67V14.17C3.33 15 4 15.83 5 15.83H15C16 15.83 16.67 15 16.67 14.17V11.67C15.83 11.67 15 10.83 15 10C15 9.17 15.83 8.33 16.67 8.33Z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13.33 15.83V14.17C13.33 12.5 12.08 11.25 10.42 11.25H5.42C3.75 11.25 2.5 12.5 2.5 14.17V15.83M17.5 15.83V14.17C17.5 12.92 16.67 11.83 15.42 11.5M12.5 4.58C13.75 4.92 14.58 6 14.58 7.25C14.58 8.5 13.75 9.58 12.5 9.92M7.92 9.17C9.58 9.17 10.83 7.92 10.83 6.25C10.83 4.58 9.58 3.33 7.92 3.33C6.25 3.33 5 4.58 5 6.25C5 7.92 6.25 9.17 7.92 9.17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon, label, active }: NavItemProps) => (
  <button
    className={`flex items-center justify-center w-[44px] h-[36px] rounded-tds-md cursor-pointer transition-colors ${
      active ? 'bg-tds-alpha-white-200' : 'hover:bg-tds-alpha-white-100'
    }`}
    aria-label={label}
    title={label}
  >
    <span className="text-tds-text-heading-inverse-only-white">{icon}</span>
  </button>
);

const SideNavigation = () => {
  return (
    <nav className="flex flex-col items-center h-full w-[60px] bg-tds-surface-bg-primary-inverse-default pt-tds-16 pb-tds-16 px-tds-8 rounded-tds-lg relative z-10" style={{ boxShadow: '2px 0px 8px rgba(0,0,0,0.15)' }}>
      {/* Top nav items */}
      <div className="flex flex-col items-center gap-tds-8">
        <NavItem icon={<HomeIcon />} label="Home" />
        <NavItem icon={<TicketIcon />} label="Tickets" active />
        <NavItem icon={<UsersIcon />} label="Users" />
      </div>

      {/* Spacer — pushes avatar to bottom */}
      <div className="flex-1" />

      {/* Avatar at bottom — TDS Avatar with profile photo */}
      <div className="flex items-center justify-center cursor-pointer">
        <Avatar
          size="md"
          avatarType="image"
          src="https://i.pravatar.cc/40"
          alt="Profile"
          shape="round"
          showStatus={true}
          statusType="active"
        />
      </div>
    </nav>
  );
};

export default SideNavigation;
