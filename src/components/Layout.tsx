import { Outlet } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-tds-surface-bg-coal-weakest">
      {/* Top Navigation — full width */}
      <TopNavigation />

      {/* Content area below top nav */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Side Navigation — floating bar with margins */}
        <div className="absolute left-tds-12 top-tds-12 bottom-tds-12 z-20">
          <SideNavigation />
        </div>

        {/* Page content — offset for the floating nav */}
        <main className="flex-1 overflow-auto ml-[88px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
