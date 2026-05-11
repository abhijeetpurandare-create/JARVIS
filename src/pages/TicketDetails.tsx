import { useParams, Link } from 'react-router-dom';
import TicketTitleBar from '../components/ticket-details/TicketTitleBar';
import ConversationPanel from '../components/ticket-details/ConversationPanel';
import PropertiesPanel from '../components/ticket-details/PropertiesPanel';
import ContextPanel from '../components/ticket-details/ContextPanel';

const TicketDetails = () => {
  const { ticketId } = useParams<{ ticketId: string }>();

  return (
    <div className="flex flex-col h-full bg-tds-surface-bg-primary-default">
      {/* Ticket Title Bar */}
      <TicketTitleBar ticketId={ticketId || 'J17769268800001'} />

      {/* Main content — 3 panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — Conversation thread */}
        <div className="flex-1 overflow-auto border-r border-tds-border-neutral-primary">
          <ConversationPanel />
        </div>

        {/* Middle — Properties/Filters */}
        <div className="w-[250px] overflow-auto border-r border-tds-border-neutral-primary">
          <PropertiesPanel />
        </div>

        {/* Right — AI Context */}
        <div className="w-[250px] overflow-auto">
          <ContextPanel />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
