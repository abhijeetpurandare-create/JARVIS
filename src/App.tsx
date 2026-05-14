import { Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarManager } from '@delhivery/tarmac';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import Layout from './components/Layout';
import ClassicLayout from './components/layouts/ClassicLayout';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TicketDetails from './pages/TicketDetails';
import AgentAvailability from './pages/AgentAvailability';
import BulkUpload from './pages/BulkUpload';
import Settings from './pages/Settings';
import FieldManagement from './pages/settings/FieldManagement';
import SLAManagement from './pages/settings/SLAManagement';
import CategoryManagement from './pages/settings/CategoryManagement';
import StatusManagement from './pages/settings/StatusManagement';
import ManageTeams from './pages/settings/ManageTeams';
import BusinessHours from './pages/settings/BusinessHours';
import CannedResponses from './pages/settings/CannedResponses';
import Forms from './pages/settings/Forms';

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
        <Route path="settings" element={<Settings />}>
          <Route index element={<Navigate to="/settings/field-management" replace />} />
          <Route path="field-management" element={<FieldManagement />} />
          <Route path="sla-management" element={<SLAManagement />} />
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="status-management" element={<StatusManagement />} />
          <Route path="manage-teams" element={<ManageTeams />} />
          <Route path="business-hours" element={<BusinessHours />} />
          <Route path="canned-responses" element={<CannedResponses />} />
          <Route path="forms" element={<Forms />} />
        </Route>
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
