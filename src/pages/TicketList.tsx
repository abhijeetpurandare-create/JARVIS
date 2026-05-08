import { Pill, Button, TarmacTable } from '@delhivery/tarmac';

const { HeaderCell, TextCell } = TarmacTable;

interface TicketRow {
  id: string;
  subject: string;
  ticketNumber: string;
  awb: string;
  customer: string;
  agent: string;
  createdOn: string;
  createdTime: string;
  toBeClosedBy: string;
  toBeClosedTime: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'error' | 'blue' | 'coal';
}

const mockTickets: TicketRow[] = [
  { id: '1', subject: 'Delay in Delivery/Pickup - Delivery Delayed', ticketNumber: '#12345', awb: 'AWB# 228288992902032', customer: 'Customer Name', agent: 'Agent Name', createdOn: '14 Apr 2026', createdTime: '12:30PM', toBeClosedBy: '21 Apr 2026', toBeClosedTime: '12:00PM', status: 'Agent Handling', statusVariant: 'warning' },
  { id: '2', subject: 'Delay in Delivery/Pickup - Delivery Delayed', ticketNumber: '#12345', awb: 'AWB# 228288992902032', customer: 'Customer Name', agent: 'Agent Name', createdOn: '14 Apr 2026', createdTime: '12:30PM', toBeClosedBy: '21 Apr 2026', toBeClosedTime: '12:00PM', status: 'Open', statusVariant: 'blue' },
  { id: '3', subject: 'Delay in Delivery/Pickup - Delivery Delayed', ticketNumber: '#12345', awb: 'AWB# 228288992902032', customer: 'Customer Name', agent: 'Agent Name', createdOn: '14 Apr 2026', createdTime: '12:30PM', toBeClosedBy: '21 Apr 2026', toBeClosedTime: '12:00PM', status: 'Open', statusVariant: 'blue' },
  { id: '4', subject: 'Delay in Delivery/Pickup - Delivery Delayed', ticketNumber: '#12345', awb: 'AWB# 228288992902032', customer: 'Customer Name', agent: 'Agent Name', createdOn: '14 Apr 2026', createdTime: '12:30PM', toBeClosedBy: '21 Apr 2026', toBeClosedTime: '12:00PM', status: 'System Handling', statusVariant: 'warning' },
  { id: '5', subject: 'Delay in Delivery/Pickup - Delivery Delayed', ticketNumber: '#12345', awb: 'AWB# 228288992902032', customer: 'Customer Name', agent: 'Agent Name', createdOn: '14 Apr 2026', createdTime: '12:30PM', toBeClosedBy: '21 Apr 2026', toBeClosedTime: '12:00PM', status: 'Closed', statusVariant: 'coal' },
  { id: '6', subject: 'Delay in Delivery/Pickup - Delivery Delayed', ticketNumber: '#12345', awb: 'AWB# 228288992902032', customer: 'Customer Name', agent: 'Agent Name', createdOn: '14 Apr 2026', createdTime: '12:30PM', toBeClosedBy: '21 Apr 2026', toBeClosedTime: '12:00PM', status: 'Open', statusVariant: 'blue' },
];

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2.5 5H17.5M5 10H15M7.5 15H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TicketList = () => {
  return (
    <div className="flex flex-col h-full bg-tds-surface-bg-primary-default">
      {/* Action Bar */}
      <div className="flex items-center justify-between px-tds-24 py-tds-16 w-full">
        <h1 className="text-[16px] font-semibold leading-[24px] text-tds-text-heading-primary">
          Ticket List
        </h1>
        <Button variant="black" buttonStyle="secondary" size="md" leadingIcon={<FilterIcon />} text="Filter List" />
      </div>

      {/* Table using TarmacTable components */}
      <div className="flex-1 overflow-hidden px-tds-24 pb-tds-24 flex flex-col">
        <div className="border border-tds-border-neutral-primary rounded-tds-md overflow-hidden flex flex-col flex-1">
        {/* Header Row — sticky top */}
        <div className="flex bg-[#f7f7f7] border-b border-tds-border-neutral-primary shrink-0">
          <div className="w-[35%] min-w-[300px]"><HeaderCell label="Ticket name" sortable /></div>
          <div className="w-[13%]"><HeaderCell label="Customer" sortable /></div>
          <div className="w-[12%]"><HeaderCell label="Agent" sortable /></div>
          <div className="w-[13%]"><HeaderCell label="Created On" sortable /></div>
          <div className="w-[14%]"><HeaderCell label="To Be Closed By" sortable /></div>
          <div className="w-[13%]"><HeaderCell label="Status" sortable /></div>
        </div>

        {/* Scrollable Data Rows */}
        <div className="flex-1 overflow-auto">
        {mockTickets.map((ticket) => (
          <div key={ticket.id} className="flex items-center border-b border-tds-border-neutral-primary hover:bg-tds-surface-bg-coal-weakest cursor-pointer transition-colors">
            {/* Ticket name — TDS TextCell */}
            <div className="w-[35%] min-w-[300px]">
              <TextCell title={ticket.subject} subtextTop={`${ticket.ticketNumber} | ${ticket.awb}`} />
            </div>
            {/* Customer */}
            <div className="w-[13%] px-tds-12 py-tds-12">
              <Pill text={ticket.customer} pillVariant="coal" pillType="subtle" size="sm" />
            </div>
            {/* Agent */}
            <div className="w-[12%] px-tds-12 py-tds-12">
              <Pill text={ticket.agent} pillVariant="coal" pillType="subtle" size="sm" />
            </div>
            {/* Created On */}
            <div className="w-[13%] px-tds-12 py-tds-12">
              <div className="flex flex-col">
                <span className="text-[12px] text-tds-text-body-primary">{ticket.createdOn}</span>
                <span className="text-[11px] text-tds-text-caption-secondary">{ticket.createdTime}</span>
              </div>
            </div>
            {/* To Be Closed By */}
            <div className="w-[14%] px-tds-12 py-tds-12">
              <div className="flex flex-col">
                <span className="text-[12px] text-tds-text-body-primary">{ticket.toBeClosedBy}</span>
                <span className="text-[11px] text-tds-text-caption-secondary">{ticket.toBeClosedTime}</span>
              </div>
            </div>
            {/* Status — TDS Pill */}
            <div className="w-[13%] px-tds-12 py-tds-12">
              <Pill text={ticket.status} pillVariant={ticket.statusVariant} pillType="subtle" size="sm" />
            </div>
          </div>
        ))}
        </div>

        {/* Pagination — sticky bottom inside border box */}
        <div className="shrink-0 border-t border-tds-border-neutral-primary flex items-center justify-between px-tds-16 py-tds-12">
          {/* Left — Ticket count */}
          <div className="flex-1">
            <span className="text-[14px] font-medium text-tds-text-caption-secondary">Showing {mockTickets.length} Tickets</span>
          </div>

          {/* Center — Page numbers */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-[2px]">
              <div className="flex items-center justify-center w-[32px] h-[32px] rounded-tds-default text-[13px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">1</div>
              <div className="flex items-center justify-center w-[32px] h-[32px] rounded-tds-default bg-tds-surface-bg-primary-inverse-default text-[13px] font-medium text-tds-text-heading-inverse-only-white">2</div>
              <div className="flex items-center justify-center w-[32px] h-[32px] rounded-tds-default text-[13px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">3</div>
              <div className="flex items-center justify-center w-[32px] h-[32px] text-[13px] font-medium text-tds-text-body-primary">...</div>
              <div className="flex items-center justify-center w-[32px] h-[32px] rounded-tds-default text-[13px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">16</div>
              <div className="flex items-center justify-center w-[32px] h-[32px] rounded-tds-default text-[13px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">17</div>
              <div className="flex items-center justify-center w-[32px] h-[32px] rounded-tds-default text-[13px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest">18</div>
            </div>
          </div>

          {/* Right — Previous | Next */}
          <div className="flex-1 flex items-center justify-end gap-tds-8">
            <button className="flex items-center gap-tds-4 text-[13px] font-medium text-tds-text-caption-secondary cursor-pointer hover:text-tds-text-body-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Previous
            </button>
            <div className="w-px h-[12px] bg-tds-border-neutral-primary" />
            <button className="flex items-center gap-tds-4 text-[13px] font-medium text-tds-text-caption-secondary cursor-pointer hover:text-tds-text-body-primary">
              Next
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
