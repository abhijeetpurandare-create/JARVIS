import { Pill, Button, TarmacTable } from '@delhivery/tarmac';
import { useState, useMemo } from 'react';
import FilterPanel from '../components/FilterPanel';

const { TextCell } = TarmacTable;

// Sort arrow component — grey default, red asc (up), red desc (down), 3rd click resets
type SortState = { column: string; direction: 'asc' | 'desc' } | null;

const SortArrow = ({ column, sortState, onSort }: { column: string; sortState: SortState; onSort: (col: string) => void }) => {
  const isAsc = sortState?.column === column && sortState.direction === 'asc';
  const isDesc = sortState?.column === column && sortState.direction === 'desc';
  return (
    <button
      onClick={() => onSort(column)}
      className="flex flex-col items-center justify-center cursor-pointer ml-tds-4"
      aria-label={`Sort by ${column}`}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
        <path d="M5 6L8 3L11 6" stroke={isAsc ? '#ED1B36' : '#999'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10L8 13L11 10" stroke={isDesc ? '#ED1B36' : '#999'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

interface TicketRow {
  id: string;
  publicTicketId: string;
  subject: string;
  customerName: string;
  agent: string;
  createdDate: string;
  createdTime: string;
  closureDueDate: string;
  closureDueTime: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'error' | 'blue' | 'coal';
}

// Realistic mock data based on narad-ui's actual ticket structure
const NAMES = ['Ramesh Kumar', 'Conney Dcosta', 'Seeya Sitaram Mahale', 'Amit Verma', 'Neha Gupta', 'Karan Singh', 'Pooja Reddy', 'Vikram Joshi', 'Anita Desai', 'Deepak Nair'];
const AGENTS = ['Melika Govekar', 'Abhay Kumar', 'Ravi Sharma', 'Priya Patel', 'Sulaksha Halankar', 'Arun Mehta', 'Divya Iyer', 'Nikhil Rao'];
const SUBJECTS = [
  'Reattempt or Delay in delivery / consignee pickup - Delivery Delayed',
  'Package not delivered - Customer complaint about missing delivery',
  'Wrong item delivered - Exchange request pending',
  'Refund not processed - Payment reversal required',
  'Address change request - Delivery rerouting needed',
  'Damaged package received - Replacement requested',
  'Delivery delayed beyond SLA - Escalation required',
  'COD amount mismatch - Payment reconciliation needed',
  'Shipment stuck in transit - No update for 3 days',
  'Customer requesting cancellation - Order not yet shipped',
];
const STATUSES: { label: string; variant: TicketRow['statusVariant'] }[] = [
  { label: 'Agent Handling', variant: 'warning' },
  { label: 'Open', variant: 'blue' },
  { label: 'System Handling', variant: 'warning' },
  { label: 'Closed', variant: 'coal' },
  { label: 'Waiting On Customer', variant: 'warning' },
  { label: 'Resolved', variant: 'success' },
];

const mockTickets: TicketRow[] = Array.from({ length: 215 }, (_, i) => {
  const status = STATUSES[i % STATUSES.length];
  const createdDay = 28 - (i % 28);
  const month = i < 140 ? 'Apr' : 'Mar';
  return {
    id: String(i + 1),
    publicTicketId: `J${17769268800000 + i + 1}`,
    subject: SUBJECTS[i % SUBJECTS.length],
    customerName: NAMES[i % NAMES.length],
    agent: AGENTS[i % AGENTS.length],
    createdDate: `${createdDay} ${month} 2026`,
    createdTime: `${9 + (i % 8)}:${String((i * 7) % 60).padStart(2, '0')}${i % 2 === 0 ? 'AM' : 'PM'}`,
    closureDueDate: `${createdDay + 7 > 28 ? (createdDay + 7 - 28) : createdDay + 7} ${month === 'Mar' ? 'Apr' : 'Apr'} 2026`,
    closureDueTime: '12:00PM',
    status: status.label,
    statusVariant: status.variant,
  };
});

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2.5 5H17.5M5 10H15M7.5 15H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TicketList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortState, setSortState] = useState<SortState>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [agentFilter, setAgentFilter] = useState<string[]>([]);
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const handleSort = (column: string) => {
    if (sortState?.column !== column) {
      setSortState({ column, direction: 'asc' });
    } else if (sortState.direction === 'asc') {
      setSortState({ column, direction: 'desc' });
    } else {
      setSortState(null);
    }
  };

  const sortedTickets = useMemo(() => {
    let tickets = mockTickets;

    // Apply status filter
    if (statusFilter.length > 0) {
      tickets = tickets.filter((t) => statusFilter.includes(t.status));
    }

    // Apply agent filter
    if (agentFilter.length > 0) {
      tickets = tickets.filter((t) => agentFilter.includes(t.agent));
    }

    if (!sortState) return tickets;

    const { column, direction } = sortState;
    const sorted = [...tickets].sort((a, b) => {
      let cmp = 0;

      switch (column) {
        case 'ticket_name': cmp = a.subject.localeCompare(b.subject); break;
        case 'customer': cmp = a.customerName.localeCompare(b.customerName); break;
        case 'agent': cmp = a.agent.localeCompare(b.agent); break;
        case 'created_on': {
          const dateA = new Date(a.createdDate.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3')).getTime();
          const dateB = new Date(b.createdDate.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3')).getTime();
          cmp = dateA - dateB;
          break;
        }
        case 'closure_due': {
          const dateA = new Date(a.closureDueDate.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3')).getTime();
          const dateB = new Date(b.closureDueDate.replace(/(\d+) (\w+) (\d+)/, '$2 $1, $3')).getTime();
          cmp = dateA - dateB;
          break;
        }
        case 'status': cmp = a.status.localeCompare(b.status); break;
      }

      return direction === 'asc' ? cmp : -cmp;
    });

    return sorted;
  }, [sortState, statusFilter, agentFilter]);

  const totalTickets = sortedTickets.length;
  const totalPages = Math.ceil(totalTickets / perPage);
  const paginatedTickets = sortedTickets.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Filter Panel — slides in from right */}
      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={() => setFilterOpen(false)}
      />

      {/* Action Bar */}
      <div className="flex items-center justify-between py-tds-16 w-full">
        <div className="flex items-center gap-tds-8">
          <h1 className="text-[16px] font-semibold leading-[24px] text-tds-text-heading-primary">
            Ticket List
          </h1>
          <span className="text-[12px] font-medium text-tds-text-caption-secondary">({totalTickets})</span>
        </div>
        <Button variant="black" buttonStyle="secondary" size="sm" leadingIcon={<FilterIcon />} text="Filter" onClick={() => setFilterOpen(true)} />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden pb-tds-16 flex flex-col">
        <div className="border border-tds-border-neutral-primary rounded-tds-md overflow-hidden flex flex-col flex-1">
          {/* Header Row */}
          <div className="flex bg-[#f7f7f7] border-b border-tds-border-neutral-primary shrink-0">
            <div className="w-[35%] min-w-[300px] flex items-center px-tds-16 py-tds-12 cursor-pointer select-none" onClick={() => handleSort('ticket_name')}>
              <span className="text-[12px] font-normal text-tds-text-caption-primary">Ticket name</span>
              <SortArrow column="ticket_name" sortState={sortState} onSort={handleSort} />
            </div>
            <div className="w-[13%] flex items-center px-tds-12 py-tds-12 cursor-pointer select-none" onClick={() => handleSort('customer')}>
              <span className="text-[12px] font-normal text-tds-text-caption-primary">Customer</span>
              <SortArrow column="customer" sortState={sortState} onSort={handleSort} />
            </div>
            <div className="w-[12%] flex items-center px-tds-12 py-tds-12 cursor-pointer select-none relative" onClick={() => setAgentDropdownOpen(!agentDropdownOpen)}>
              <span className="text-[12px] font-normal text-tds-text-caption-primary">Agent</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-tds-4"><path d="M3 4.5L6 7.5L9 4.5" stroke={agentFilter.length > 0 ? '#ED1B36' : '#999'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {agentFilter.length > 0 && <span className="w-[6px] h-[6px] rounded-full bg-[#ED1B36] absolute top-[8px] right-[8px]" />}

              {/* Agent filter dropdown with checkboxes */}
              {agentDropdownOpen && (
                <div className="absolute top-full left-0 mt-tds-4 w-[200px] bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-md shadow-lg z-30 max-h-[280px] overflow-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="py-tds-4 text-[12px] font-medium text-tds-text-caption-secondary px-tds-12 pt-tds-8">Show:</div>
                  {/* All option */}
                  <div
                    className={`px-tds-12 py-tds-8 text-[12px] cursor-pointer hover:bg-tds-surface-bg-coal-weakest transition-colors flex items-center gap-tds-8 ${agentFilter.length === 0 ? 'font-semibold text-tds-text-body-primary' : 'text-tds-text-body-secondary'}`}
                    onClick={() => { setAgentFilter([]); setCurrentPage(1); }}
                  >
                    <div className={`w-[16px] h-[16px] rounded-[3px] border flex items-center justify-center ${agentFilter.length === 0 ? 'bg-tds-surface-bg-primary-inverse-default border-tds-surface-bg-primary-inverse-default' : 'border-tds-border-neutral-primary'}`}>
                      {agentFilter.length === 0 && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    All Agents
                  </div>
                  {/* Individual agents */}
                  {AGENTS.map((agent) => {
                    const isChecked = agentFilter.includes(agent);
                    return (
                      <div
                        key={agent}
                        className={`px-tds-12 py-tds-8 text-[12px] cursor-pointer hover:bg-tds-surface-bg-coal-weakest transition-colors flex items-center gap-tds-8 ${isChecked ? 'font-semibold text-tds-text-body-primary' : 'text-tds-text-body-secondary'}`}
                        onClick={() => {
                          if (isChecked) setAgentFilter(agentFilter.filter((a) => a !== agent));
                          else setAgentFilter([...agentFilter, agent]);
                          setCurrentPage(1);
                        }}
                      >
                        <div className={`w-[16px] h-[16px] rounded-[3px] border flex items-center justify-center ${isChecked ? 'bg-tds-surface-bg-primary-inverse-default border-tds-surface-bg-primary-inverse-default' : 'border-tds-border-neutral-primary'}`}>
                          {isChecked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        {agent}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="w-[13%] flex items-center px-tds-12 py-tds-12 cursor-pointer select-none" onClick={() => handleSort('created_on')}>
              <span className="text-[12px] font-normal text-tds-text-caption-primary">Created On</span>
              <SortArrow column="created_on" sortState={sortState} onSort={handleSort} />
            </div>
            <div className="w-[14%] flex items-center px-tds-12 py-tds-12 cursor-pointer select-none" onClick={() => handleSort('closure_due')}>
              <span className="text-[12px] font-normal text-tds-text-caption-primary">To Be Closed By</span>
              <SortArrow column="closure_due" sortState={sortState} onSort={handleSort} />
            </div>
            <div className="w-[13%] flex items-center px-tds-12 py-tds-12 cursor-pointer select-none relative" onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}>
              <span className="text-[12px] font-normal text-tds-text-caption-primary">Status</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-tds-4"><path d="M3 4.5L6 7.5L9 4.5" stroke={statusFilter.length > 0 ? '#ED1B36' : '#999'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {statusFilter.length > 0 && <span className="w-[6px] h-[6px] rounded-full bg-[#ED1B36] absolute top-[8px] right-[8px]" />}

              {/* Status filter dropdown with checkboxes */}
              {statusDropdownOpen && (
                <div className="absolute top-full left-0 mt-tds-4 w-[200px] bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-md shadow-lg z-30 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                  <div className="py-tds-4 text-[12px] font-medium text-tds-text-caption-secondary px-tds-12 pt-tds-8">Show:</div>
                  {/* All option */}
                  <div
                    className={`px-tds-12 py-tds-8 text-[12px] cursor-pointer hover:bg-tds-surface-bg-coal-weakest transition-colors flex items-center gap-tds-8 ${statusFilter.length === 0 ? 'font-semibold text-tds-text-body-primary' : 'text-tds-text-body-secondary'}`}
                    onClick={() => { setStatusFilter([]); setCurrentPage(1); }}
                  >
                    <div className={`w-[16px] h-[16px] rounded-[3px] border flex items-center justify-center ${statusFilter.length === 0 ? 'bg-tds-surface-bg-primary-inverse-default border-tds-surface-bg-primary-inverse-default' : 'border-tds-border-neutral-primary'}`}>
                      {statusFilter.length === 0 && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    All
                  </div>
                  {/* Individual statuses */}
                  {['Agent Handling', 'Open', 'System Handling', 'Closed', 'Waiting On Customer', 'Resolved'].map((status) => {
                    const isChecked = statusFilter.includes(status);
                    return (
                      <div
                        key={status}
                        className={`px-tds-12 py-tds-8 text-[12px] cursor-pointer hover:bg-tds-surface-bg-coal-weakest transition-colors flex items-center gap-tds-8 ${isChecked ? 'font-semibold text-tds-text-body-primary' : 'text-tds-text-body-secondary'}`}
                        onClick={() => {
                          if (isChecked) {
                            setStatusFilter(statusFilter.filter((s) => s !== status));
                          } else {
                            setStatusFilter([...statusFilter, status]);
                          }
                          setCurrentPage(1);
                        }}
                      >
                        <div className={`w-[16px] h-[16px] rounded-[3px] border flex items-center justify-center ${isChecked ? 'bg-tds-surface-bg-primary-inverse-default border-tds-surface-bg-primary-inverse-default' : 'border-tds-border-neutral-primary'}`}>
                          {isChecked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        {status}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Data Rows */}
          <div className="flex-1 overflow-auto">
            {paginatedTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center border-b border-tds-border-neutral-primary hover:bg-tds-surface-bg-coal-weakest cursor-pointer transition-colors" onClick={() => window.location.hash = `#/ticket/${ticket.publicTicketId}`}>
                {/* Ticket name — TDS TextCell */}
                <div className="w-[35%] min-w-[300px] [&>div]:!gap-0">
                  <TextCell title={ticket.subject} subtextBottom={`#${ticket.publicTicketId} | AWB# 2282889929020${ticket.id}2`} showSubtextTop={false} showSubtextBottom={true} />
                </div>
                {/* Customer */}
                <div className="w-[13%] px-tds-12 py-tds-12">
                  <Pill text={ticket.customerName} pillVariant="coal" pillType="subtle" size="sm" />
                </div>
                {/* Agent */}
                <div className="w-[12%] px-tds-12 py-tds-12">
                  <Pill text={ticket.agent} pillVariant="coal" pillType="subtle" size="sm" />
                </div>
                {/* Created On */}
                <div className="w-[13%] px-tds-12 py-tds-12">
                  <div className="flex flex-col">
                    <span className="text-[12px] text-tds-text-body-primary">{ticket.createdDate}</span>
                    <span className="text-[12px] text-tds-text-caption-secondary">{ticket.createdTime}</span>
                  </div>
                </div>
                {/* To Be Closed By */}
                <div className="w-[14%] px-tds-12 py-tds-12">
                  <div className="flex flex-col">
                    <span className="text-[12px] text-tds-text-body-primary">{ticket.closureDueDate}</span>
                    <span className="text-[12px] text-tds-text-caption-secondary">{ticket.closureDueTime}</span>
                  </div>
                </div>
                {/* Status */}
                <div className="w-[13%] px-tds-12 py-tds-12">
                  <Pill text={ticket.status} pillVariant={ticket.statusVariant} pillType="subtle" size="sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="shrink-0 border-t border-tds-border-neutral-primary flex items-center justify-between px-tds-16 py-tds-12">
            <div className="flex-1 flex items-center gap-tds-4">
              <span className="text-[12px] font-medium text-tds-text-caption-secondary">Show</span>
              <select
                className="text-[12px] font-medium text-tds-text-body-primary bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-default px-tds-6 py-tds-2 cursor-pointer outline-none"
                value={perPage}
                onChange={(e) => handlePerPageChange(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-[12px] font-medium text-tds-text-caption-secondary">per page</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-[2px]">
                {getPageNumbers().map((page, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-center w-[32px] h-[32px] rounded-tds-default text-[12px] font-medium ${
                      page === currentPage
                        ? 'bg-tds-surface-bg-primary-inverse-default text-tds-text-heading-inverse-only-white'
                        : page === '...'
                        ? 'text-tds-text-body-primary'
                        : 'text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest'
                    }`}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  >
                    {page}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-end gap-tds-8">
              <button
                className="flex items-center gap-tds-4 text-[12px] font-medium text-tds-text-caption-secondary cursor-pointer hover:text-tds-text-body-primary disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Previous
              </button>
              <div className="w-px h-[12px] bg-tds-border-neutral-primary" />
              <button
                className="flex items-center gap-tds-4 text-[12px] font-medium text-tds-text-caption-secondary cursor-pointer hover:text-tds-text-body-primary disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
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
