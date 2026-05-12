import { useState, useEffect, useRef } from 'react';
import { Button } from '@delhivery/tarmac';
import { TicketDetail } from '../../data/ticketDetailsData';

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="#808080" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Options from narad-ui database
const STATUS_OPTIONS = ['Open', 'In Progress', 'Pending', 'Agent Handling', 'System Handling', 'Waiting On Customer', 'Waiting On Internal Team', 'Resolved', 'Reopened', 'Closed'];
const AGENT_OPTIONS = ['Sulaksha Halankar', 'Abhay Kumar', 'Conney Dcosta', 'Ravi Sharma', 'Priya Patel', 'Melika Govekar', 'Amit Verma'];
const TEAM_OPTIONS = ['Service Center Operations', 'Last Mile Operations', 'Returns & Exchange', 'Escalation Team', 'Claims Team'];
const CATEGORY_OPTIONS = ['Delivery Issue', 'Pickup Issue', 'Payment Issue', 'Return/Refund', 'Address Change', 'Escalation', 'COD Issue'];
const SUB_CATEGORY_OPTIONS = ['Delivery Delayed', 'Package Lost', 'Wrong Item', 'Damaged Package', 'Not Delivered', 'Reattempt Required', 'Customer Unavailable'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];

interface PropertyFieldProps {
  label: string;
  value: string;
  options?: string[];
  nested?: boolean;
  onChange?: (val: string) => void;
}

const PropertyField = ({ label, value, options, nested = false, onChange }: PropertyFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={ref} className={`flex flex-col gap-tds-4 relative ${nested ? 'pl-tds-16' : ''}`}>
      <span className="text-[12px] font-medium text-tds-text-body-secondary">{label}</span>
      <div
        className="flex items-center justify-between px-tds-12 py-tds-6 border border-tds-border-neutral-primary rounded-[6px] bg-tds-surface-bg-primary-default cursor-pointer hover:border-tds-border-neutral-secondary"
        onClick={() => options && setIsOpen(!isOpen)}
      >
        <span className="text-[12px] text-tds-text-body-primary truncate">{value}</span>
        {options && <ChevronDownIcon />}
      </div>

      {/* Dropdown */}
      {isOpen && options && (
        <div className="absolute top-full left-0 right-0 mt-tds-2 bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-md shadow-lg z-10 max-h-[180px] overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              className={`px-tds-12 py-tds-6 text-[12px] cursor-pointer hover:bg-tds-surface-bg-coal-weakest ${opt === value ? 'font-medium text-tds-text-body-primary bg-tds-surface-bg-coal-weakest' : 'text-tds-text-body-secondary'}`}
              onClick={() => { onChange?.(opt); setIsOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PropertiesPanel = ({ ticket }: { ticket: TicketDetail }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState(ticket.status);
  const [agent, setAgent] = useState(ticket.agent);
  const [team, setTeam] = useState(ticket.team);
  const [category, setCategory] = useState(ticket.category);
  const [subCategory, setSubCategory] = useState(ticket.subCategory);
  const [priority, setPriority] = useState(ticket.priority);

  const hasChanges = status !== ticket.status || agent !== ticket.agent || team !== ticket.team || category !== ticket.category || subCategory !== ticket.subCategory || priority !== ticket.priority;

  return (
    <div className="flex flex-col h-full">
      {/* Tab Group */}
      <div className="flex border-b border-tds-border-neutral-primary">
        <button
          className={`flex-1 px-tds-12 py-tds-12 text-[12px] font-medium ${activeTab === 0 ? 'text-tds-text-body-primary border-b-2 border-tds-surface-bg-primary-inverse-default' : 'text-tds-text-caption-secondary hover:text-tds-text-body-primary'}`}
          onClick={() => setActiveTab(0)}
        >
          Properties
        </button>
        <button
          className={`flex-1 px-tds-12 py-tds-12 text-[12px] font-medium ${activeTab === 1 ? 'text-tds-text-body-primary border-b-2 border-tds-surface-bg-primary-inverse-default' : 'text-tds-text-caption-secondary hover:text-tds-text-body-primary'}`}
          onClick={() => setActiveTab(1)}
        >
          Related Tickets
        </button>
      </div>

      {/* Properties content */}
      {activeTab === 0 && (
        <div className="flex-1 overflow-auto p-tds-16">
          <div className="flex flex-col gap-tds-16">
            <PropertyField label="Status" value={status} options={STATUS_OPTIONS} onChange={setStatus} />
            <PropertyField label="Agent" value={agent} options={AGENT_OPTIONS} onChange={setAgent} />
            <PropertyField label="Team" value={team} options={TEAM_OPTIONS} nested onChange={setTeam} />
            <PropertyField label="Category" value={category} options={CATEGORY_OPTIONS} onChange={setCategory} />
            <PropertyField label="Sub-Category" value={subCategory} options={SUB_CATEGORY_OPTIONS} nested onChange={setSubCategory} />
            <PropertyField label="Priority" value={priority} options={PRIORITY_OPTIONS} onChange={setPriority} />
            <PropertyField label="Source" value={ticket.source} />
            <PropertyField label="Closure Due" value={ticket.closureDue} />
          </div>
        </div>
      )}

      {/* Related Tickets tab */}
      {activeTab === 1 && (
        <div className="flex-1 overflow-auto p-tds-16 flex items-center justify-center">
          <span className="text-[12px] text-tds-text-caption-secondary">No related tickets found</span>
        </div>
      )}

      {/* Bottom action — TDS Button */}
      <div className="border-t border-tds-border-neutral-primary px-tds-12 h-[52px] flex items-center">
        <Button
          variant="black"
          buttonStyle="primary"
          size="sm"
          text="Update Ticket"
          disabled={!hasChanges}
          className="!w-full"
        />
      </div>
    </div>
  );
};

export default PropertiesPanel;
