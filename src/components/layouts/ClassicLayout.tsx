import { Outlet } from 'react-router-dom';
import ClassicSideNav from './ClassicSideNav';
import ClassicTopNav from './ClassicTopNav';

const ClassicLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-tds-surface-bg-coal-weakest">
      {/* Top Navigation — white with shadow */}
      <ClassicTopNav />

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Floating side nav */}
        <div className="absolute left-tds-12 top-tds-12 bottom-tds-12 z-20">
          <ClassicSideNav />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto ml-[76px] px-tds-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClassicLayout;
