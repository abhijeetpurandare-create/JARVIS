import { useState } from 'react';
import { Dropdown, TabGroup, TabCell, Button } from '@delhivery/tarmac';
import { TicketDetail } from '../../data/ticketDetailsData';

// Options from narad-ui database
const STATUS_OPTIONS = [
  { label: 'Open', value: 'Open' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Agent Handling', value: 'Agent Handling' },
  { label: 'System Handling', value: 'System Handling' },
  { label: 'Waiting On Customer', value: 'Waiting On Customer' },
  { label: 'Waiting On Internal Team', value: 'Waiting On Internal Team' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Reopened', value: 'Reopened' },
  { label: 'Closed', value: 'Closed' },
];
const AGENT_OPTIONS = [
  { label: 'Sulaksha Halankar', value: 'Sulaksha Halankar' },
  { label: 'Abhay Kumar', value: 'Abhay Kumar' },
  { label: 'Conney Dcosta', value: 'Conney Dcosta' },
  { label: 'Ravi Sharma', value: 'Ravi Sharma' },
  { label: 'Priya Patel', value: 'Priya Patel' },
  { label: 'Melika Govekar', value: 'Melika Govekar' },
  { label: 'Amit Verma', value: 'Amit Verma' },
];
const TEAM_OPTIONS = [
  { label: 'Service Center Operations', value: 'Service Center Operations' },
  { label: 'Last Mile Operations', value: 'Last Mile Operations' },
  { label: 'Returns & Exchange', value: 'Returns & Exchange' },
  { label: 'Escalation Team', value: 'Escalation Team' },
  { label: 'Claims Team', value: 'Claims Team' },
];
const CATEGORY_OPTIONS = [
  { label: 'Delivery Issue', value: 'Delivery Issue' },
  { label: 'Pickup Issue', value: 'Pickup Issue' },
  { label: 'Payment Issue', value: 'Payment Issue' },
  { label: 'Return/Refund', value: 'Return/Refund' },
  { label: 'Address Change', value: 'Address Change' },
  { label: 'Escalation', value: 'Escalation' },
  { label: 'COD Issue', value: 'COD Issue' },
];
const SUB_CATEGORY_OPTIONS = [
  { label: 'Delivery Delayed', value: 'Delivery Delayed' },
  { label: 'Package Lost', value: 'Package Lost' },
  { label: 'Wrong Item', value: 'Wrong Item' },
  { label: 'Damaged Package', value: 'Damaged Package' },
  { label: 'Not Delivered', value: 'Not Delivered' },
  { label: 'Reattempt Required', value: 'Reattempt Required' },
  { label: 'Customer Unavailable', value: 'Customer Unavailable' },
];
const PRIORITY_OPTIONS = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
  { label: 'Critical', value: 'Critical' },
];

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
      {/* TDS Tab Group */}
      <TabGroup orientation="horizontal" size="sm" tabType="regular" showDivider={false}>
        <TabCell
          tabType="regular"
          size="sm"
          title="Properties"
          tabStyle="black"
          isSelected={activeTab === 0}
          onClick={() => setActiveTab(0)}
        />
        <TabCell
          tabType="regular"
          size="sm"
          title="Related Tickets"
          tabStyle="black"
          isSelected={activeTab === 1}
          onClick={() => setActiveTab(1)}
        />
      </TabGroup>

      {/* Properties content */}
      {activeTab === 0 && (
        <div className="flex-1 overflow-auto p-tds-12">
          <div className="flex flex-col gap-tds-12">
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize="sm"
              label="Status"
              placeholder="Select status"
              value={status}
              onChange={(val) => setStatus(val as string)}
              options={STATUS_OPTIONS}
              tarmacOptions={STATUS_OPTIONS}
            />
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize="sm"
              label="Agent"
              placeholder="Select agent"
              value={agent}
              onChange={(val) => setAgent(val as string)}
              options={AGENT_OPTIONS}
              tarmacOptions={AGENT_OPTIONS}
              isSearchable
            />
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize="sm"
              label="Team"
              placeholder="Select team"
              value={team}
              onChange={(val) => setTeam(val as string)}
              options={TEAM_OPTIONS}
              tarmacOptions={TEAM_OPTIONS}
            />
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize="sm"
              label="Category"
              placeholder="Select category"
              value={category}
              onChange={(val) => setCategory(val as string)}
              options={CATEGORY_OPTIONS}
              tarmacOptions={CATEGORY_OPTIONS}
            />
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize="sm"
              label="Sub-Category"
              placeholder="Select sub-category"
              value={subCategory}
              onChange={(val) => setSubCategory(val as string)}
              options={SUB_CATEGORY_OPTIONS}
              tarmacOptions={SUB_CATEGORY_OPTIONS}
            />
            <Dropdown
              dropdownStyle="tarmac-01"
              dropdownSize="sm"
              label="Priority"
              placeholder="Select priority"
              value={priority}
              onChange={(val) => setPriority(val as string)}
              options={PRIORITY_OPTIONS}
              tarmacOptions={PRIORITY_OPTIONS}
            />
            {/* Read-only fields */}
            <div className="flex flex-col gap-tds-4">
              <span className="text-[11px] font-medium text-tds-text-body-secondary">Source</span>
              <span className="text-[12px] text-tds-text-body-primary px-tds-8 py-tds-6 border border-tds-border-neutral-primary rounded-[6px] bg-tds-surface-bg-coal-weakest">{ticket.source}</span>
            </div>
            <div className="flex flex-col gap-tds-4">
              <span className="text-[11px] font-medium text-tds-text-body-secondary">Closure Due</span>
              <span className="text-[12px] text-tds-text-body-primary px-tds-8 py-tds-6 border border-tds-border-neutral-primary rounded-[6px] bg-tds-surface-bg-coal-weakest">{ticket.closureDue}</span>
            </div>
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
