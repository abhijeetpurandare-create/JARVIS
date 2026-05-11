import { useParams } from 'react-router-dom';
import TicketTitleBar from '../components/ticket-details/TicketTitleBar';
import ConversationPanel from '../components/ticket-details/ConversationPanel';
import PropertiesPanel from '../components/ticket-details/PropertiesPanel';
import ContextPanel from '../components/ticket-details/ContextPanel';
import { getTicketDetails } from '../data/ticketDetailsData';

const TicketDetails = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const ticket = getTicketDetails(ticketId || 'J17769268800001');

  return (
    <div className="flex flex-col h-full bg-tds-surface-bg-coal-weakest">
      {/* Ticket Title Bar — in a container */}
      <div className="pr-tds-16 pt-tds-16">
        <div className="bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary">
          <TicketTitleBar ticket={ticket} />
        </div>
      </div>

      {/* Main content — 3 panels */}
      <div className="flex flex-1 overflow-hidden pr-tds-16 py-tds-16 pt-tds-12 gap-tds-16">
        {/* Left — Conversation thread */}
        <div className="flex-1 overflow-hidden bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary">
          <ConversationPanel conversations={ticket.conversations} />
        </div>

        {/* Middle — Properties */}
        <div className="w-[250px] overflow-hidden bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary">
          <PropertiesPanel ticket={ticket} />
        </div>

        {/* Right — AI Context */}
        <div className="w-[250px] overflow-hidden bg-tds-surface-bg-primary-default rounded-tds-lg border border-tds-border-neutral-primary">
          <ContextPanel ticket={ticket} />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
