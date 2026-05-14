import { useState } from 'react';
import { Button, Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M13.33 15.83V14.17C13.33 12.5 12.08 11.25 10.42 11.25H5.42C3.75 11.25 2.5 12.5 2.5 14.17V15.83M17.5 15.83V14.17C17.5 12.92 16.67 11.83 15.42 11.5M12.5 4.58C13.75 4.92 14.58 6 14.58 7.25C14.58 8.5 13.75 9.58 12.5 9.92M7.92 9.17C9.58 9.17 10.83 7.92 10.83 6.25C10.83 4.58 9.58 3.33 7.92 3.33C6.25 3.33 5 4.58 5 6.25C5 7.92 6.25 9.17 7.92 9.17Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
];

function getMemberCount(teamName: string) {
  const hash = teamName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return 4 + (hash % 12);
}

const ManageTeams = () => {
  const [search, setSearch] = useState('');

  const filtered = allTeams.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        
        <Button variant="black" buttonStyle="secondary" size="md" text="Create Team" />
      </div>

      {/* Search */}
      <div className="mb-tds-16 max-w-[320px]">
        <Input
          size="sm"
          placeholder="Search teams..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          leadingIcon={<SearchIcon />}
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-tds-12">
        {filtered.map((team) => (
          <div
            key={team}
            className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg p-tds-16 hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-tds-12">
              <div className="w-[32px] h-[32px] rounded-[8px] bg-[#e8f0fe] flex items-center justify-center shrink-0">
                <span className="text-[#2563eb]">
                  <UsersIcon />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[14px] font-medium text-tds-text-body-primary truncate" title={team}>
                  {team}
                </h3>
                <p className="text-[12px] text-tds-text-caption-secondary mt-tds-4">
                  {getMemberCount(team)} members
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTeams;
