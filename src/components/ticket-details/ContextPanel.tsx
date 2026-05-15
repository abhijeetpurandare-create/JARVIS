import { useState, useRef } from 'react';
import { TicketDetail } from '../../data/ticketDetailsData';

interface ContextSectionProps {
  title: string;
  content: string;
  borderColor?: string;
}

const ContextSection = ({ title, content, borderColor = '#e6e6e6' }: ContextSectionProps) => (
  <div className="border border-[#e6e6e6] rounded-[8px] p-tds-12 border-l-[3px]" style={{ borderLeftColor: borderColor }}>
    <h4 className="text-[12px] font-semibold text-[#2b2b2b] mb-tds-6">{title}</h4>
    <p className="text-[12px] text-tds-text-body-secondary leading-[16px] whitespace-pre-line">{content}</p>
  </div>
);

const ContextPanel = ({ ticket }: { ticket: TicketDetail }) => {
  const [aiInput, setAiInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAiInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 108); // 6 lines × 18px
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-tds-8 px-tds-16 py-tds-12 border-b border-tds-border-neutral-primary">
        <span className="text-[12px] font-semibold text-[#6366F1]">Ask AI</span>
      </div>

      {/* Context sections — scrollable */}
      <div className="flex-1 overflow-auto p-tds-16 flex flex-col gap-tds-12">
        <div className="text-[14px] font-medium text-[#2b2b2b] mb-tds-4">Hello AI</div>
        <ContextSection
          title="Consignee"
          content={`Address: ${ticket.customerAddress}\nHistory: The customer has ${ticket.customerHistory}\nStatus: Address valid\nRisk: LOW RTO risk (69.0%)`}
          borderColor="#16a34a"
        />

        <ContextSection
          title="Product"
          content={`Product: ${ticket.product}\nClient: ${ticket.productClient}\nType: ${ticket.productType}`}
          borderColor="#ea580c"
        />

        <ContextSection
          title="Ticket"
          content={`Subject: ${ticket.subject}\nStatus: ${ticket.status}\nAgent: ${ticket.agent}\nPriority: ${ticket.priority}`}
          borderColor="#7c3aed"
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
      <div className="border-t border-tds-border-neutral-primary px-tds-12 py-tds-8 flex items-end gap-tds-8 shrink-0">
        <textarea
          ref={textareaRef}
          value={aiInput}
          onChange={handleInputChange}
          placeholder="Ask AI about this ticket..."
          rows={1}
          className="flex-1 px-tds-12 py-tds-8 border border-tds-border-neutral-primary rounded-[6px] text-[12px] text-tds-text-body-primary placeholder:text-tds-text-body-disabled outline-none bg-tds-surface-bg-primary-default resize-none leading-[18px]"
          style={{ maxHeight: '108px', overflowY: (textareaRef.current && textareaRef.current.scrollHeight > 108) ? 'auto' : 'hidden' }}
        />
        <button
          disabled={!aiInput.trim()}
          className="flex items-center justify-center w-[32px] h-[32px] bg-tds-surface-bg-primary-inverse-default rounded-tds-default shrink-0 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ContextPanel;
