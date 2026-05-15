import { useState } from 'react';
import { Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10.67 12.67V11.33C10.67 10 9.67 9 8.33 9H4.33C3 9 2 10 2 11.33V12.67M14 12.67V11.33C14 10.33 13.33 9.47 12.33 9.2M10 3.53C11 3.8 11.67 4.67 11.67 5.67C11.67 6.67 11 7.53 10 7.8M6.33 7.33C7.8 7.33 8.67 6.47 8.67 5C8.67 3.53 7.8 2.67 6.33 2.67C4.87 2.67 4 3.53 4 5C4 6.47 4.87 7.33 6.33 7.33Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const allTeams = [
  'A&I Breakdown Support', 'A&I Modification Support', 'Automation and Infrastructure Jarvis',
  'B2B CS Narad Team', 'B2B KAM Narad', 'B2B Support Team', 'B2BR Narad', 'B2C Claims Management - Meesho',
  'B2C KAM Narad', 'B2C L2 Narad', 'B2C Narad',
  'CCTV Tracking', 'Claims B2B', 'Claims B2C', 'COD Recon Digital',
  'Demo Jarvis Team1', 'Direct 2 Shipper', 'Direct Shipper Narad', 'DLV Narad',
  'E2E Support Narad',
  'Facility Security', 'Finance Client Support Narad', 'Flipkart Small Parcels Narad', 'FMS B2C Narad',
  'FMS LTL Narad', 'FMS Pickup Narad', 'Franchise Support', 'Fuel Payout',
  'Hyperlocal',
  'Incenter CS',
  'LT Retail KAM Narad', 'LT Retail Narad',
  'Maintenance', 'Micro SME Narad',
  'Odx Dts Narad', 'ONDC Narad', 'Ops Support Narad', 'OS1-Carrier', 'OS1-DispatchOne', 'OS1-HyperLocal', 'OS1-TMS',
  'Platform PSI', 'Production Testing Narad', 'PSI Client Support Narad',
  'RA LnD B2C', 'RA LnD Claims', 'Rapid Store CS Jarvis', 'Recon Client Support Narad',
  'SCS File Upload', 'Scrap Support', 'Security Equipments Narad', 'SF Client Group',
  'Shipment Rescue', 'Shiprocket Narad', 'SME', 'SME - Investigation - Narad',
  'SME - PTL Startup Narad', 'SME B2B Narad', 'SME B2C Narad', 'SME CMB',
  'SME Growth Narad', 'SME Growth Plus Narad', 'SME Startup Narad', 'Stores East',
  'Stores North', 'Stores South', 'Stores West', 'Strategic B2C Narad',
  'Transit Insurance Claims',
  'Unassigned Narad',
  'Vendor Desk',
];

const ManageTeams = () => {
  const [search, setSearch] = useState('');

  const filtered = allTeams.filter((t) =>
    t.toLowerCase().includes(search.toLowerCase())
  );

  // Group teams alphabetically
  const grouped: Record<string, string[]> = {};
  filtered.forEach((team) => {
    const letter = team[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(team);
  });

  const letters = Object.keys(grouped).sort();
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="px-tds-24 pt-tds-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <div className="flex items-center gap-tds-8">
          <span className="text-[14px] font-bold text-[#111111]">Manage Teams</span>
          <span className="text-[12px] text-[#666666]">({filtered.length})</span>
        </div>
        <div className="w-[240px]">
          <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search teams" value={search} onChange={(e) => setSearch(e.target.value)} leadingIcon={<SearchIcon />} />
        </div>
      </div>

      {/* Content with A-Z scroll */}
      <div className="flex gap-tds-16">
        {/* Teams grid grouped by letter */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {letters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-tds-24">
              <h3 className="text-[14px] font-semibold text-[#444444] mb-tds-12">{letter}</h3>
              <div className="grid grid-cols-4 gap-tds-12">
                {grouped[letter].map((team) => (
                  <div
                    key={team}
                    className="border border-[#e6e6e6] rounded-[8px] px-tds-12 py-tds-12 flex items-center gap-tds-8 hover:bg-[#f7f7f7] transition-colors cursor-pointer"
                  >
                    <span className="text-[#666666]"><UsersIcon /></span>
                    <span className="text-[12px] font-medium text-[#2b2b2b] truncate">{team}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* A-Z scroll sidebar */}
        <div className="shrink-0 flex flex-col items-center gap-[2px] py-tds-8">
          {allLetters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className={`text-[11px] w-[20px] h-[20px] flex items-center justify-center rounded-[4px] transition-colors ${
                letters.includes(letter)
                  ? 'text-[#2b2b2b] hover:bg-[#e6e6e6] font-medium'
                  : 'text-[#cccbcb]'
              }`}
            >
              {letter}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTeams;
