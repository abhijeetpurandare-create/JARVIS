import { Routes, Route } from 'react-router-dom';
import { SnackbarManager } from '@delhivery/tarmac';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import Layout from './components/Layout';
import ClassicLayout from './components/layouts/ClassicLayout';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TicketDetails from './pages/TicketDetails';
import AgentAvailability from './pages/AgentAvailability';
import BulkUpload from './pages/BulkUpload';

function AppRoutes() {
  const { layout } = useLayout();
  const LayoutComponent = layout === 'modern' ? Layout : ClassicLayout;

  return (
    <Routes>
      <Route path="/" element={<LayoutComponent />}>
        <Route index element={<Dashboard />} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="ticket/:ticketId" element={<TicketDetails />} />
        <Route path="availability" element={<AgentAvailability />} />
        <Route path="bulk-upload" element={<BulkUpload />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <LayoutProvider>
      <AppRoutes />
      <SnackbarManager />
    </LayoutProvider>
  );
}

export default App;
