import { useState, useRef, useEffect } from 'react';

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M13.33 15.83V14.17C13.33 12.5 12.08 11.25 10.42 11.25H5.42C3.75 11.25 2.5 12.5 2.5 14.17V15.83M17.5 15.83V14.17C17.5 12.92 16.67 11.83 15.42 11.5M12.5 4.58C13.75 4.92 14.58 6 14.58 7.25C14.58 8.5 13.75 9.58 12.5 9.92M7.92 9.17C9.58 9.17 10.83 7.92 10.83 6.25C10.83 4.58 9.58 3.33 7.92 3.33C6.25 3.33 5 4.58 5 6.25C5 7.92 6.25 9.17 7.92 9.17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M8.75 15C12.2018 15 15 12.2018 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.25 13.25L17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// All teams from the screenshots
const allTeams = [
  'B2C KAM Narad', 'Production Testing Narad', 'Ops Support Narad', 'Direct Shipper Narad',
  'SME B2C Narad', 'Hyperlocal', 'LT Retail Narad', 'AnI - Breakdown and Downtime',
  'B2C L2 Narad', 'Rapid Store CS Jarvis', 'SCS File Upload', 'Transit Insurance Claims',
  'Scrap Support', 'Shipment Rescue', 'Facility Security', 'Franchise Support',
  'SME CMB', 'RA LnD B2C', 'Fuel Payout', 'Unassigned Narad',
  'Maintenance', 'AnI - Green Bag/Weighing Machine/Modification Support', 'SME - Investigation - Narad', 'Shiprocket Narad',
  'FMS Pickup Narad', 'Odx Dts Narad', 'SME B2B Narad', 'Vendor Desk',
  'Claims B2C', 'Claims B2B', 'B2C Narad', 'Flipkart Small Parcels Narad',
  'B2B KAM Narad', 'SME Growth Plus Narad', 'SME Startup Narad', 'LT Retail KAM Narad',
  'RA LnD Claims', 'CCTV Tracking', 'Finance Client Support Narad', 'PSI Client Support Narad',
  'Recon Client Support Narad', 'COD Recon Digital', 'Micro SME Narad', 'SME - PTL Startup Narad',
  'Stores North', 'Stores South', 'Stores West', 'Stores East',
  'E2E Support Narad', 'Incenter CS', 'B2B CS Narad Team', 'Automation and Infrastructure Jarvis',
  'SME', 'DLV Narad', 'Direct 2 Shipper', 'B2C Claims Management - Meesho',
  'Platform PSI', 'SME Growth Narad', 'ONDC Narad', 'OS1-DispatchOne',
  'FMS B2C Narad', 'FMS LTL Narad', 'Security Equipments Narad', 'Bihar',
  'SF Client Group', 'Demo Jarvis Team1', 'B2BR Narad', 'Strategic B2C Narad',
  'B2B Support Team', 'OS1-TMS', 'OS1-HyperLocal', 'OS1-Carrier',
  'Test_Jan17', 'Ops Facing Narad', 'Consignee Narad', 'Social Media Narad',
  'B2C L1 Narad', 'narad-test-20', 'narad-test-5', 'B2B Support Narad',
  'PSI Test Narad', 'B2B Narad', 'LT Retail L2 Finance Narad', 'narad-test-4',
  'narad-test-3', 'Enterprise Narad', 'narad-test-6', 'HRMS Narad',
  'CMOD Narad', 'D2C CS Narad', 'Narad Business Test', 'narad-demoUser',
  'E-Com Narad', 'Aggregator Narad', 'C2C Franchise - Key Accounts Narad', 'D2C Narad',
  'C2C Franchisee Narad', 'B2C Heavy Narad', 'BFSI Narad', 'Consignee',
  'Direct Shipper', 'B2C CS Narad Team', 'LTL FMS Narad', 'FMS Narad',
  'Bhiwandi two', 'narad-test-7', 'FMS Banking Narad', 'FMS Upload Narad',
  'narad-test-21', 'E2E Data Upload Narad', 'FMS Ops Support Narad',
];

// Mock agents per team (based on narad-ui data structure: name, id, state, isAvailable)
const AGENT_NAMES = [
  'Ashish Kumar Bhoi', 'Krishna Kant Sharma', 'Sravani Tammisetty', 'Narad Agent',
  'Siddharth Jain', 'Pranav Bhargava Bhargava', 'Mohit Sharma', 'Ayushi Aswal',
  'Abhishek Thakur', 'Ravi Kumar Singh', 'Priya Mehta', 'Deepak Nair',
  'Anita Desai', 'Vikram Joshi', 'Neha Gupta', 'Karan Singh',
];

function getAgentsForTeam(teamName: string) {
  // Generate deterministic agents per team based on team name hash
  const hash = teamName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = 4 + (hash % 8); // 4-11 agents per team
  return Array.from({ length: count }, (_, i) => ({
    id: `${hash}-${i}`,
    name: AGENT_NAMES[(hash + i) % AGENT_NAMES.length],
    isAvailable: (hash + i) % 3 !== 0, // ~66% available
  }));
}

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const AgentAvailability = () => {
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [agentSearch, setAgentSearch] = useState('');
  const [agents, setAgents] = useState<{ id: string; name: string; isAvailable: boolean }[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const filteredTeams = search
    ? allTeams.filter((t) => t.toLowerCase().includes(search.toLowerCase()))
    : allTeams;

  const openTeam = (team: string) => {
    setSelectedTeam(team);
    setAgentSearch('');
    setAgents(getAgentsForTeam(team));
  };

  const closePanel = () => {
    setSelectedTeam(null);
    setAgents([]);
  };

  const toggleAvailability = (id: string) => {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, isAvailable: !a.isAvailable } : a));
  };

  const filteredAgents = agentSearch
    ? agents.filter((a) => a.name.toLowerCase().includes(agentSearch.toLowerCase()))
    : agents;

  // Close panel on click outside
  useEffect(() => {
    if (!selectedTeam) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selectedTeam]);

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between pr-tds-16 py-tds-16 shrink-0">
        <h1 className="text-[16px] font-semibold text-tds-text-heading-primary">Manage Availability</h1>
        <div className="flex items-center gap-tds-8 px-tds-12 py-tds-6 border border-tds-border-neutral-primary rounded-tds-default bg-tds-surface-bg-primary-default w-[240px]">
          <span className="text-tds-text-caption-secondary"><SearchIcon /></span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Teams"
            className="flex-1 text-[13px] text-tds-text-body-primary placeholder:text-tds-text-body-disabled outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="flex-1 overflow-auto pr-tds-16 pb-tds-16">
        <div className="grid grid-cols-4 gap-tds-12">
          {filteredTeams.map((team) => (
            <div
              key={team}
              onClick={() => openTeam(team)}
              className="flex items-center gap-tds-8 px-tds-16 py-tds-12 border border-tds-border-neutral-primary rounded-tds-md bg-tds-surface-bg-primary-default hover:bg-tds-surface-bg-coal-weakest cursor-pointer transition-colors"
            >
              <span className="text-tds-text-caption-secondary shrink-0"><UsersIcon /></span>
              <span className="text-[13px] font-medium text-tds-text-body-primary truncate">{team}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Slide-in Panel — Manage Team */}
      {selectedTeam && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40" />
          {/* Panel */}
          <div
            ref={panelRef}
            className="fixed top-0 right-0 h-full w-[400px] bg-tds-surface-bg-primary-default shadow-xl z-50 flex flex-col animate-[slideInRight_0.2s_ease-out]"
          >
            {/* Header */}
            <div className="flex items-center gap-tds-12 px-tds-16 py-tds-16 border-b border-tds-border-neutral-primary shrink-0">
              <button onClick={closePanel} className="flex items-center justify-center w-[36px] h-[36px] border border-tds-border-neutral-primary rounded-tds-md cursor-pointer hover:bg-tds-surface-bg-coal-weakest">
                <BackIcon />
              </button>
              <span className="text-[16px] font-medium text-tds-text-heading-primary">Manage Team</span>
            </div>

            {/* Search agents */}
            <div className="px-tds-16 py-tds-12 shrink-0">
              <div className="flex items-center gap-tds-8 px-tds-12 py-tds-6 border border-tds-border-neutral-primary rounded-tds-default bg-tds-surface-bg-primary-default">
                <span className="text-tds-text-caption-secondary"><SearchIcon /></span>
                <input
                  type="text"
                  value={agentSearch}
                  onChange={(e) => setAgentSearch(e.target.value)}
                  placeholder="Search Agents"
                  className="flex-1 text-[13px] text-tds-text-body-primary placeholder:text-tds-text-body-disabled outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Team name header */}
            <div className="px-tds-16 py-tds-8 bg-[#f9f8fb] border-b border-tds-border-neutral-primary shrink-0">
              <span className="text-[14px] font-medium text-tds-text-body-primary">{selectedTeam} Agents</span>
            </div>

            {/* Agent list */}
            <div className="flex-1 overflow-auto">
              {filteredAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between px-tds-16 py-tds-12 bg-[#f9f8fb] border-b border-tds-border-neutral-primary/50">
                  <span className="text-[14px] font-medium text-tds-text-body-primary">{agent.name}</span>
                  <div className="flex flex-col items-end gap-tds-2">
                    {/* Toggle */}
                    <div
                      className={`w-[40px] h-[22px] rounded-full relative cursor-pointer transition-colors ${agent.isAvailable ? 'bg-[#48a26b]' : 'bg-tds-border-neutral-primary'}`}
                      onClick={() => toggleAvailability(agent.id)}
                    >
                      <div className={`absolute top-[3px] w-[16px] h-[16px] rounded-full bg-tds-surface-bg-primary-default shadow-sm transition-all ${agent.isAvailable ? 'left-[21px]' : 'left-[3px]'}`} />
                    </div>
                    <span className={`text-[12px] ${agent.isAvailable ? 'text-[#48a26b]' : 'text-tds-text-caption-secondary'}`}>
                      {agent.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-tds-16 py-tds-12 border-t border-tds-border-neutral-primary flex justify-end shrink-0">
              <button
                onClick={closePanel}
                className="px-tds-16 py-tds-8 border border-tds-border-neutral-primary rounded-tds-default text-[14px] font-medium text-tds-text-body-primary cursor-pointer hover:bg-tds-surface-bg-coal-weakest"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentAvailability;
