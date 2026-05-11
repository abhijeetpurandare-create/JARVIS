import { TicketDetail } from '../../data/ticketDetailsData';

interface ContextSectionProps {
  title: string;
  content: string;
}

const ContextSection = ({ title, content }: ContextSectionProps) => (
  <div className="border border-tds-border-neutral-primary rounded-tds-md p-tds-16">
    <h4 className="text-[12px] font-semibold text-tds-text-heading-primary mb-tds-8">{title}</h4>
    <p className="text-[11px] text-tds-text-body-secondary leading-[16px] whitespace-pre-line">{content}</p>
  </div>
);

const ContextPanel = ({ ticket }: { ticket: TicketDetail }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-tds-8 px-tds-16 py-tds-16 border-b border-tds-border-neutral-primary">
        <span className="text-[14px] font-semibold text-[#6366F1]">Ask AI</span>
      </div>

      {/* Context sections — scrollable */}
      <div className="flex-1 overflow-auto p-tds-16 flex flex-col gap-tds-12">
        <ContextSection
          title="Consignee"
          content={`Address: ${ticket.customerAddress}\nHistory: The customer has ${ticket.customerHistory}\nStatus: Address valid\nRisk: LOW RTO risk (69.0%)`}
        />

        <ContextSection
          title="Product"
          content={`Product: ${ticket.product}\nClient: ${ticket.productClient}\nType: ${ticket.productType}`}
        />

        <ContextSection
          title="Ticket"
          content={`Subject: ${ticket.subject}\nStatus: ${ticket.status}\nAgent: ${ticket.agent}\nPriority: ${ticket.priority}`}
        />

        <ContextSection
          title="Shipment"
          content={`Status: ${ticket.shipmentStatus}`}
        />

        <ContextSection
          title="Center"
          content={`Location: ${ticket.centerLocation}\nMetrics: ${ticket.centerMetrics}`}
        />
      </div>

      {/* Bottom — Ask AI input */}
      <div className="border-t border-tds-border-neutral-primary px-tds-16 h-[52px] flex items-center shrink-0">
        <div className="flex items-center gap-tds-8 w-full">
          <input
            type="text"
            placeholder="Ask AI about this ticket..."
            className="flex-1 px-tds-12 py-tds-6 border border-tds-border-neutral-primary rounded-[6px] text-[12px] text-tds-text-body-primary placeholder:text-tds-text-body-disabled outline-none bg-tds-surface-bg-primary-default"
          />
          <button className="flex items-center justify-center w-[32px] h-[32px] bg-tds-surface-bg-primary-inverse-default rounded-tds-default cursor-pointer shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextPanel;
