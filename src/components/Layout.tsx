import { Outlet } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';

const Layout = () => {
  return (
    <div className="flex h-screen bg-tds-surface-bg-coal-weakest">
      {/* Side Navigation — 60px icon-only nav */}
      <SideNavigation />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
