import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TicketList from './pages/TicketList';
import TicketDetails from './pages/TicketDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TicketList />} />
        <Route path="ticket/:ticketId" element={<TicketDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
