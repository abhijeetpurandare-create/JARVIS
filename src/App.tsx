import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TicketList from './pages/TicketList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TicketList />} />
      </Route>
    </Routes>
  );
}

export default App;
