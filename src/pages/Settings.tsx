import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { TabGroup, TabCell } from '@delhivery/tarmac';

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
  const location = useLocation();
  const navigate = useNavigate();
  const activeIndex = navItems.findIndex((item) => location.pathname === item.path);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left — TDS TabGroup vertical */}
      <div className="shrink-0 border-r border-tds-border-neutral-primary pt-[20px] pb-tds-12 pl-tds-4 pr-tds-16 overflow-hidden max-w-[220px]">
        <TabGroup orientation="vertical" size="lg" tabType="button" showDivider={false}>
          {navItems.map((item, i) => (
            <TabCell
              key={item.path}
              tabType="button"
              orientation="vertical"
              tabStyle="black"
              size="lg"
              title={item.label}
              isSelected={activeIndex === i}
              onClick={() => navigate(item.path)}
            />
          ))}
        </TabGroup>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-tds-24">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
