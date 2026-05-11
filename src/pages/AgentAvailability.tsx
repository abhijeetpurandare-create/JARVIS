import { useState } from 'react';
import { Button, Input, Switch, SideDrawer, Card } from '@delhivery/tarmac';

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M13.33 15.83V14.17C13.33 12.5 12.08 11.25 10.42 11.25H5.42C3.75 11.25 2.5 12.5 2.5 14.17V15.83M17.5 15.83V14.17C17.5 12.92 16.67 11.83 15.42 11.5M12.5 4.58C13.75 4.92 14.58 6 14.58 7.25C14.58 8.5 13.75 9.58 12.5 9.92M7.92 9.17C9.58 9.17 10.83 7.92 10.83 6.25C10.83 4.58 9.58 3.33 7.92 3.33C6.25 3.33 5 4.58 5 6.25C5 7.92 6.25 9.17 7.92 9.17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// All teams
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

// Mock agents per team (based on narad-ui user data structure)
const AGENT_NAMES = [
  'Ashish Kumar Bhoi', 'Krishna Kant Sharma', 'Sravani Tammisetty', 'Narad Agent',
  'Siddharth Jain', 'Pranav Bhargava Bhargava', 'Mohit Sharma', 'Ayushi Aswal',
  'Abhishek Thakur', 'Ravi Kumar Singh', 'Priya Mehta', 'Deepak Nair',
  'Anita Desai', 'Vikram Joshi', 'Neha Gupta', 'Karan Singh',
];

function getAgentsForTeam(teamName: string) {
  const hash = teamName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = 4 + (hash % 8);
  return Array.from({ length: count }, (_, i) => ({
    id: `${hash}-${i}`,
    name: AGENT_NAMES[(hash + i) % AGENT_NAMES.length],
    isAvailable: (hash + i) % 3 !== 0,
  }));
}

const AgentAvailability = () => {
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [agentSearch, setAgentSearch] = useState('');
  const [agents, setAgents] = useState<{ id: string; name: string; isAvailable: boolean }[]>([]);

  const filteredTeams = search
    ? allTeams.filter((t) => t.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.localeCompare(b))
    : [...allTeams].sort((a, b) => a.localeCompare(b));

  // Group teams by first letter for A-Z index
  const letters = Array.from(new Set(filteredTeams.map((t) => t[0].toUpperCase()))).sort();

  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`team-letter-${letter}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between py-tds-16 shrink-0">
        <h1 className="text-[16px] font-semibold text-tds-text-heading-primary">Manage Availability</h1>
        <div className="w-[240px]">
          <Input
            inputStyle="tarmac-01"
            inputType="regular"
            inputSize="sm"
            styleVariant="standard"
            placeholder="Search Teams"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leadingIcon={<SearchIcon />}
          />
        </div>
      </div>

      {/* Teams Grid — TDS Card, grouped by letter with A-Z scroll */}
      <div className="flex-1 overflow-auto pb-tds-16 relative">
        {/* A-Z index — fixed, vertically centered within content area (below 60px top nav) */}
        <div className="fixed right-[16px] flex flex-col items-center gap-[1px] z-20" style={{ top: 'calc(50% + 30px)', transform: 'translateY(-50%)' }}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              className={`w-[16px] h-[16px] flex items-center justify-center text-[9px] font-semibold rounded-full cursor-pointer transition-colors ${
                letters.includes(letter)
                  ? 'text-tds-text-body-primary hover:bg-tds-surface-bg-coal-weakest'
                  : 'text-tds-text-caption-secondary/40'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Grouped teams */}
        <div className="flex flex-col gap-tds-16 pr-[32px]">
          {letters.map((letter) => {
            const teamsForLetter = filteredTeams.filter((t) => t[0].toUpperCase() === letter);
            return (
              <div key={letter} id={`team-letter-${letter}`}>
                <div className="text-[12px] font-semibold text-tds-text-caption-secondary mb-tds-8">{letter}</div>
                <div className="grid grid-cols-4 gap-tds-16">
                  {teamsForLetter.map((team) => (
                    <Card
                      key={team}
                      cardStyle="tarmac-01"
                      cardVariant="standard"
                      isHoverable
                      onClick={() => openTeam(team)}
                      className="!cursor-pointer"
                    >
                      <div className="flex items-center gap-tds-8 px-tds-12 py-tds-8">
                        <span className="text-tds-text-caption-secondary shrink-0"><UsersIcon /></span>
                        <span className="text-[13px] font-medium text-tds-text-body-primary truncate">{team}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TDS SideDrawer — Manage Team */}
      <SideDrawer
        isOpen={!!selectedTeam}
        onClose={closePanel}
        variant="narrow"
        closeOnOverlay
        closeOnEsc
      >
        <SideDrawer.Header title="Manage Team" />
        <SideDrawer.Content>
          {/* Search Agents — TDS Input */}
          <div className="px-tds-16 py-tds-12">
            <Input
              inputStyle="tarmac-01"
              inputType="regular"
              inputSize="sm"
              styleVariant="standard"
              placeholder="Search Agents"
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              leadingIcon={<SearchIcon />}
            />
          </div>

          {/* Team name header */}
          <div className="px-tds-16 py-tds-8 bg-[#f9f8fb]">
            <span className="text-[14px] font-medium text-tds-text-body-primary">{selectedTeam} Agents</span>
          </div>

          {/* Agent list with TDS Switch */}
          <div className="flex flex-col">
            {filteredAgents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between px-tds-16 py-tds-12 bg-[#f9f8fb] border-b border-tds-border-neutral-primary/30">
                <span className="text-[14px] font-medium text-tds-text-body-primary">{agent.name}</span>
                <div className="flex flex-col items-end gap-tds-2">
                  <Switch
                    tarmacColor="green"
                    tarmacStyle="filled"
                    tarmacSize="sm"
                    checked={agent.isAvailable}
                    onChange={() => toggleAvailability(agent.id)}
                  />
                  <span className={`text-[12px] ${agent.isAvailable ? 'text-[#48a26b]' : 'text-tds-text-caption-secondary'}`}>
                    {agent.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SideDrawer.Content>
        <SideDrawer.Footer
          ctasRight={
            <Button variant="black" buttonStyle="secondary" size="md" text="Cancel" onClick={closePanel} />
          }
        />
      </SideDrawer>
    </div>
  );
};

export default AgentAvailability;
