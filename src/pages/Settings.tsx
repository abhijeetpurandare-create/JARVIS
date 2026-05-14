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
      {/* Left Sidebar */}
      <div className="w-[240px] shrink-0 border-r border-tds-border-neutral-primary bg-tds-surface-bg-primary-default p-tds-16 overflow-y-auto">
        <p className="text-[10px] font-bold text-tds-text-caption-secondary uppercase tracking-wider mb-tds-12">
          Organization Configurations
        </p>
        <nav className="flex flex-col gap-tds-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-tds-12 py-tds-8 text-[14px] rounded-r-[4px] border-l-2 transition-colors ${
                  isActive
                    ? 'border-l-[#2563eb] text-[#2563eb] font-medium bg-[#eff6ff]'
                    : 'border-l-transparent text-tds-text-body-primary hover:bg-[#f5f5f5]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-tds-24 bg-tds-surface-bg-secondary-default">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
