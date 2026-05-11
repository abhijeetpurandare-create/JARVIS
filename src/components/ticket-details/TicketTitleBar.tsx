import { useNavigate } from 'react-router-dom';
import { TicketDetail } from '../../data/ticketDetailsData';

// All ticket IDs in listing order (215 tickets)
const ALL_TICKET_IDS = Array.from({ length: 215 }, (_, i) => `J${17769268800000 + i + 1}`);

interface TicketTitleBarProps {
  ticket: TicketDetail;
}

const Dot = () => <span className="w-[3px] h-[3px] rounded-full bg-tds-text-caption-secondary inline-block" />;

const TicketTitleBar = ({ ticket }: TicketTitleBarProps) => {
  const navigate = useNavigate();

  const currentIndex = ALL_TICKET_IDS.indexOf(ticket.ticketId);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < ALL_TICKET_IDS.length - 1;

  const goToPrev = () => {
    if (hasPrev) navigate(`/ticket/${ALL_TICKET_IDS[currentIndex - 1]}`);
  };

  const goToNext = () => {
    if (hasNext) navigate(`/ticket/${ALL_TICKET_IDS[currentIndex + 1]}`);
  };

  return (
    <div className="px-tds-16 py-tds-12 flex items-center gap-tds-4">
      {/* Left — Title + metadata */}
      <div className="flex-1 flex flex-col gap-tds-4 min-w-0">
        {/* Subject */}
        <h2 className="text-[14px] font-semibold text-tds-text-heading-primary leading-[24px] truncate">
          {ticket.subject}
        </h2>

        {/* Metadata row */}
        <div className="flex items-center gap-tds-8 text-[12px] flex-wrap">
          <div className="flex items-center gap-tds-4">
            <span className="text-tds-text-caption-secondary">Created on:</span>
            <span className="font-medium text-tds-text-body-primary">{ticket.createdOn}</span>
          </div>
          <Dot />
          <div className="flex items-center gap-tds-4">
            <span className="text-tds-text-caption-secondary">Raised by:</span>
            <span className="font-medium text-tds-text-body-primary">{ticket.raisedBy}</span>
          </div>
          <Dot />
          <div className="flex items-center gap-tds-4">
            <span className="text-tds-text-caption-secondary">Client:</span>
            <span className="font-medium text-tds-text-body-primary">{ticket.client}</span>
          </div>
          <Dot />
          <div className="flex items-center gap-tds-4">
            <span className="text-tds-text-caption-secondary">Source:</span>
            <span className="font-medium text-tds-text-body-primary">{ticket.source}</span>
          </div>
          <Dot />
          <div className="flex items-center gap-tds-4">
            <span className="text-tds-text-caption-secondary">MAWB:</span>
            <span className="font-medium text-tds-text-heading-primary underline cursor-pointer">{ticket.awb}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 6.5V9.5C9 10.05 8.55 10.5 8 10.5H2.5C1.95 10.5 1.5 10.05 1.5 9.5V4C1.5 3.45 1.95 3 2.5 3H5.5M7.5 1.5H10.5V4.5M5 7L10.5 1.5" stroke="#121212" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <Dot />
          <div className="flex items-center gap-tds-4">
            <span className="text-tds-text-caption-secondary">LRN:</span>
            <span className="font-medium text-tds-text-heading-primary">{ticket.lrn}</span>
          </div>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-tds-16 shrink-0">
        {/* Ask AI badge */}
        <div className="flex items-center gap-tds-6 px-tds-8 py-tds-4 border border-[#9499e6] rounded-tds-default cursor-pointer hover:bg-[#f5f3ff]">
          <span className="text-[12px] font-medium text-[#6366F1]">Ask AI</span>
        </div>

        {/* Print button */}
        <button className="flex items-center justify-center p-tds-4 border border-tds-border-neutral-primary rounded-tds-default cursor-pointer hover:bg-tds-surface-bg-coal-weakest">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6V2H12V6M4 12H3C2.45 12 2 11.55 2 11V8C2 7.45 2.45 7 3 7H13C13.55 7 14 7.45 14 8V11C14 11.55 13.55 12 13 12H12M4 10H12V14H4V10Z" stroke="#2b2b2b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        {/* Prev/Next navigation */}
        <div className="flex items-center">
          <button
            onClick={goToPrev}
            disabled={!hasPrev}
            className="flex items-center justify-center p-tds-4 border border-tds-border-neutral-primary rounded-l-tds-default cursor-pointer hover:bg-tds-surface-bg-coal-weakest disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="#2b2b2b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={goToNext}
            disabled={!hasNext}
            className="flex items-center justify-center p-tds-4 border border-tds-border-neutral-primary border-l-0 rounded-r-tds-default cursor-pointer hover:bg-tds-surface-bg-coal-weakest disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="#2b2b2b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketTitleBar;
