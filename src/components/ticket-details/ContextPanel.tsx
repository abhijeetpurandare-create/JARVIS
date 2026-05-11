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

const ContextPanel = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-tds-8 px-tds-16 py-tds-16 border-b border-tds-border-neutral-primary">
        <svg width="13" height="17" viewBox="0 0 13 17" fill="none">
          <path d="M6.5 0L0 3V8C0 12.4 2.8 16.5 6.5 17C10.2 16.5 13 12.4 13 8V3L6.5 0Z" fill="#121212" />
        </svg>
        <span className="text-[14px] font-semibold text-tds-text-heading-primary">Context</span>
      </div>

      {/* Context sections — scrollable */}
      <div className="flex-1 overflow-auto p-tds-16 flex flex-col gap-tds-12">
        <ContextSection
          title="Consignee"
          content={`Address: -- , Delhi, Haryana 110061\nHistory: The customer has 3/10 successful deliveries\nStatus: Address valid\nRisk: LOW RTO risk (69.0%)`}
        />

        <ContextSection
          title="Product"
          content={`Product: CON 3(1)\nClient: 6023ec-RAINADIHATTI-do\nType: COD B2C`}
        />

        <ContextSection
          title="Ticket"
          content={`Complaint: The consignee is reporting a complaint about delivery staff's behavior.\nRequesting Action: To report complaint about delivery staff's behavior.\nLatest Response: System on April 17, 2026 — ticket closed as shipment delivered.`}
        />

        <ContextSection
          title="Shipment"
          content={`Status: Shipment was Delivered from Gurgaon_Sector18_D (Haryana) on April 17, 2026 4:41 PM.\nVerification: Geo-verified.`}
        />

        <ContextSection
          title="Center"
          content={`Location: Gurgaon_Sector18_D (Haryana) has issues.\nMetrics: AVTD: 1786, 57.9% Service Level, 110 shipments aging >24 hours.\nIssues: Aging Shipments backlog, productivity drop in new LMAs, and AVTD load increase.\nCoordinate via: Assistant Team Lead, Vikash Kumar Mishra, at vikash.mishra2@delhivery.com or 6207801415.`}
        />
      </div>

      {/* Bottom — Ask AI input */}
      <div className="border-t border-tds-border-neutral-primary p-tds-12">
        <div className="flex items-center gap-tds-8">
          <input
            type="text"
            placeholder="Ask AI about this ticket..."
            className="flex-1 px-tds-12 py-tds-6 border border-tds-border-neutral-primary rounded-[6px] text-[12px] text-tds-text-body-primary placeholder:text-tds-text-body-disabled outline-none bg-tds-surface-bg-primary-default"
          />
          <button className="flex items-center justify-center w-[36px] h-[36px] bg-tds-surface-bg-primary-inverse-default rounded-tds-default cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextPanel;
