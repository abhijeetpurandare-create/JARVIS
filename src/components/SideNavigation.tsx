import { useState, useRef, useEffect } from 'react';
import { Avatar } from '@delhivery/tarmac';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';

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


interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active, expanded, onClick }: NavItemProps) => (
  <div
    onClick={onClick}
    className={`flex items-center h-[36px] rounded-[8px] cursor-pointer transition-all px-tds-8 gap-tds-12 ${
      active ? 'bg-[#ededed]' : 'hover:bg-[#ededed]'
    }`}
  >
    <span className={`shrink-0 w-[20px] flex items-center justify-center ${active ? 'text-[#2b2b2b]' : 'text-[#737373]'}`}>{icon}</span>
    {expanded && (
      <span className={`text-[12px] font-bold uppercase whitespace-nowrap ${active ? 'text-[#2b2b2b]' : 'text-[#737373]'}`}>{label}</span>
    )}
  </div>
);

const profileMenuItems = [
  { label: 'My Requests', path: '' },
  { label: 'Agent Availability', path: '/availability' },
  { label: 'Bulk Ticket Update', path: '/bulk-upload' },
  { label: 'Settings', path: '' },
  { label: 'Switch to Classic Layout', path: '__toggle_layout__' },
  { label: 'Logout', path: '' },
];

const SideNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleLayout } = useLayout();
  const isHome = location.pathname === '/';
  const isTickets = location.pathname === '/tickets' || location.pathname.startsWith('/ticket/');

  const [expanded, setExpanded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  return (
    <div
      className={`flex flex-col bg-[#f7f7f7] p-tds-8 pb-tds-12 shrink-0 transition-all duration-200 ${expanded ? 'w-[180px]' : 'w-[52px]'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => { setExpanded(false); }}
    >
      {/* Nav items */}
      <div className="flex flex-col gap-tds-4 mt-tds-4">
        <NavItem icon={<HomeIcon />} label="Home" active={isHome} expanded={expanded} onClick={() => navigate('/')} />
        <NavItem icon={<TicketIcon />} label="Tickets" active={isTickets} expanded={expanded} onClick={() => navigate('/tickets')} />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Avatar + Profile Dropdown */}
      <div ref={profileRef} className="relative">
        <div
          className="flex items-center gap-tds-12 cursor-pointer rounded-[8px] hover:bg-[#ededed] px-[6px] py-tds-6"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <span className="shrink-0 w-[20px] flex items-center justify-center">
            <Avatar
              size="sm"
              avatarType="image"
              src="https://i.pravatar.cc/40"
              alt="Profile"
              shape="round"
              showStatus={true}
              statusType="active"
            />
          </span>
          {expanded && (
            <div className="flex flex-col min-w-0">
              <span className="text-[12px] font-medium text-[#2b2b2b] truncate">Abhijeet P.</span>
              <span className="text-[10px] text-[#737373] truncate">Online</span>
            </div>
          )}
        </div>

        {/* Dropdown */}
        {profileOpen && (
          <div className="absolute bottom-[44px] left-0 w-[240px] bg-white rounded-tds-lg border border-[#e6e6e6] shadow-lg z-50 overflow-hidden">
            <div className="flex items-center gap-tds-12 px-tds-16 py-tds-12 border-b border-[#e6e6e6]">
              <Avatar size="sm" avatarType="image" src="https://i.pravatar.cc/40" alt="Profile" shape="round" />
              <span className="text-[14px] font-semibold text-[#2b2b2b]">Abhijeet Pramod Purandare</span>
            </div>
            <div className="py-tds-4">
              {profileMenuItems.map((item) => (
                <button
                  key={item.label}
                  className="w-full text-left px-tds-16 py-tds-12 text-[14px] text-[#2b2b2b] hover:bg-[#f7f7f7] cursor-pointer transition-colors"
                  onClick={() => { setProfileOpen(false); if (item.path === '__toggle_layout__') toggleLayout(); else if (item.path) navigate(item.path); }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavigation;
