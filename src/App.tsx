import { Routes, Route } from 'react-router-dom';
import { SnackbarManager } from '@delhivery/tarmac';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TicketDetails from './pages/TicketDetails';
import AgentAvailability from './pages/AgentAvailability';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<TicketList />} />
          <Route path="ticket/:ticketId" element={<TicketDetails />} />
          <Route path="availability" element={<AgentAvailability />} />
        </Route>
      </Routes>
      <SnackbarManager />
    </>
  );
}

export default App;
