import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { label: 'Field Management', path: '/settings/field-management' },
  { label: 'SLA Management', path: '/settings/sla-management' },
  { label: 'Category Management', path: '/settings/category-management' },
  { label: 'Status Management', path: '/settings/status-management' },
  { label: 'Manage Teams', path: '/settings/manage-teams' },
  { label: 'Business Hours', path: '/settings/business-hours' },
  { label: 'Canned Responses', path: '/settings/canned-responses' },
  { label: 'Forms', path: '/settings/forms' },
];

const Settings = () => {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left — Vertical button-style tabs */}
      <div className="w-[220px] shrink-0 border-r border-tds-border-neutral-primary py-tds-16 overflow-y-auto">
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-tds-16 py-tds-12 text-[14px] font-medium transition-colors ${
                  isActive
                    ? 'text-[#2563eb] bg-[#eff6ff] border-l-[3px] border-l-[#2563eb]'
                    : 'text-tds-text-body-primary hover:bg-[#f5f5f5] border-l-[3px] border-l-transparent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-tds-24">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
