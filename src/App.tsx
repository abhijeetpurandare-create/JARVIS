import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TicketList from './pages/TicketList';
import TicketDetails from './pages/TicketDetails';
import Toast from './components/Toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<TicketList />} />
          <Route path="ticket/:ticketId" element={<TicketDetails />} />
        </Route>
      </Routes>
      <Toast />
    </>
  );
}

export default App;
