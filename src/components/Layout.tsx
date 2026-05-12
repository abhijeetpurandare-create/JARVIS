import { Outlet } from 'react-router-dom';
import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#f7f7f7]">
      {/* Top Navigation — grey background */}
      <TopNavigation />

      {/* Content area below top nav */}
      <div className="flex flex-1 overflow-hidden">
        {/* Side Navigation — grey background, collapsed */}
        <SideNavigation />

        {/* Page content — white background with top-left radius */}
        <main className="flex-1 overflow-auto bg-white rounded-tl-[12px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
