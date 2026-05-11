import { Pill } from '@delhivery/tarmac';

interface TicketTitleBarProps {
  ticketId: string;
}

const TicketTitleBar = ({ ticketId }: TicketTitleBarProps) => {
  return (
    <div className="px-tds-24 py-tds-12 border-b border-tds-border-neutral-primary">
      {/* Subject */}
      <h2 className="text-[14px] font-semibold text-tds-text-heading-primary leading-[24px] mb-tds-4">
        Reattempt or delay in delivery / consignee requests a new delivery attempt due to missed or delayed attempt
      </h2>

      {/* Metadata row */}
      <div className="flex items-center gap-tds-8 text-[12px] text-tds-text-caption-secondary flex-wrap">
        <span className="font-medium text-tds-text-caption-primary">Ticket ID:</span>
        <span>{ticketId}</span>
        <span className="text-tds-border-neutral-primary">•</span>

        <span className="font-medium text-tds-text-caption-primary">Customer:</span>
        <span>Ramesh Kumar</span>
        <span className="text-tds-border-neutral-primary">•</span>

        <span className="font-medium text-tds-text-caption-primary">Agent:</span>
        <span>Melika Govekar</span>
        <span className="text-tds-border-neutral-primary">•</span>

        <span className="font-medium text-tds-text-caption-primary">Status:</span>
        <Pill text="Open" pillVariant="blue" pillType="subtle" size="sm" />
        <span className="text-tds-border-neutral-primary">•</span>

        <span className="font-medium text-tds-text-caption-primary">AWB:</span>
        <span className="text-tds-text-info-blue-primary cursor-pointer">73006012351322</span>
        <span className="text-tds-border-neutral-primary">•</span>

        <span className="font-medium text-tds-text-caption-primary">SLA:</span>
        <span>Closure due in 3 days</span>
      </div>
    </div>
  );
};

export default TicketTitleBar;
