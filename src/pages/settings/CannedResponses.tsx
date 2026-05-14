import { useState } from 'react';
import { Button } from '@delhivery/tarmac';

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4.67V12.67C2 13.03 2.3 13.33 2.67 13.33H13.33C13.7 13.33 14 13.03 14 12.67V5.33C14 4.97 13.7 4.67 13.33 4.67H8L6.67 3.33H2.67C2.3 3.33 2 3.63 2 4V4.67Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface CannedFolder {
  id: string;
  name: string;
  responseCount: number;
  responses: { title: string; content: string }[];
}

const mockFolders: CannedFolder[] = [
  {
    id: '1',
    name: 'AFoldrtyy tes fenfhn...',
    responseCount: 3,
    responses: [
      { title: 'Greeting', content: 'Hello! Thank you for reaching out. How can I assist you today?' },
      { title: 'Follow Up', content: 'I wanted to follow up on your previous request. Could you please provide more details?' },
      { title: 'Closing', content: 'Thank you for your patience. Is there anything else I can help you with?' },
    ],
  },
  {
    id: '2',
    name: 'AutomationTestRJ0y3b...',
    responseCount: 5,
    responses: [
      { title: 'Ticket Acknowledged', content: 'Your ticket has been received and is being reviewed by our team.' },
      { title: 'Escalation Notice', content: 'Your issue has been escalated to the relevant team for further investigation.' },
      { title: 'Resolution Update', content: 'We have identified the root cause and are working on a fix.' },
      { title: 'Pending Info', content: 'We need additional information to proceed. Please provide the requested details.' },
      { title: 'Resolved', content: 'Your issue has been resolved. Please verify and let us know if you face any further issues.' },
    ],
  },
  {
    id: '3',
    name: 'B2C Standard Responses',
    responseCount: 4,
    responses: [
      { title: 'Shipment Delay', content: 'We apologize for the delay. Your shipment is currently in transit and expected to arrive within 24-48 hours.' },
      { title: 'Refund Initiated', content: 'Your refund has been initiated and will be processed within 5-7 business days.' },
      { title: 'Pickup Scheduled', content: 'A reverse pickup has been scheduled. Our delivery partner will collect the package within 2 business days.' },
      { title: 'Claim Filed', content: 'Your claim has been filed successfully. Our claims team will review and update you within 48 hours.' },
    ],
  },
  {
    id: '4',
    name: 'Ops Support Templates',
    responseCount: 3,
    responses: [
      { title: 'Route Issue', content: 'We have identified a routing issue and are rerouting the shipment. Updated ETA will be shared shortly.' },
      { title: 'Vehicle Breakdown', content: 'Due to a vehicle breakdown, there may be a slight delay. An alternate vehicle has been arranged.' },
      { title: 'Facility Update', content: 'The facility is currently experiencing high volume. Processing times may be slightly extended.' },
    ],
  },
  {
    id: '5',
    name: 'Claims Team Responses',
    responseCount: 2,
    responses: [
      { title: 'Claim Under Review', content: 'Your claim is currently under review. We will update you once the investigation is complete.' },
      { title: 'Claim Approved', content: 'Your claim has been approved. The settlement amount will be credited within 7 business days.' },
    ],
  },
];

const CannedResponses = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>(mockFolders[0].id);

  const activeFolder = mockFolders.find((f) => f.id === selectedFolder) || mockFolders[0];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        
        <div className="flex items-center gap-tds-8">
          <Button variant="black" buttonStyle="tertiary" size="md" text="Create Folder" />
          <Button variant="black" buttonStyle="secondary" size="md" text="Create Response" />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-tds-16 h-[calc(100vh-220px)]">
        {/* Left - Folder List */}
        <div className="w-[280px] shrink-0 bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg overflow-y-auto">
          <div className="p-tds-12 border-b border-tds-border-neutral-primary">
            <p className="text-[12px] font-semibold text-tds-text-caption-secondary uppercase">Folders</p>
          </div>
          <div className="p-tds-8">
            {mockFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center gap-tds-8 px-tds-12 py-tds-8 rounded-[6px] text-left transition-colors cursor-pointer ${
                  selectedFolder === folder.id
                    ? 'bg-[#eff6ff] text-[#2563eb]'
                    : 'hover:bg-[#f5f5f5] text-tds-text-body-primary'
                }`}
              >
                <FolderIcon />
                <span className="text-[14px] truncate flex-1">{folder.name}</span>
                <span className="text-[12px] text-tds-text-caption-secondary shrink-0">{folder.responseCount}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right - Response Content */}
        <div className="flex-1 bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg overflow-y-auto">
          <div className="p-tds-12 border-b border-tds-border-neutral-primary">
            <p className="text-[14px] font-semibold text-tds-text-body-primary">{activeFolder.name}</p>
            <p className="text-[12px] text-tds-text-caption-secondary mt-tds-4">{activeFolder.responseCount} responses</p>
          </div>
          <div className="p-tds-16 space-y-[12px]">
            {activeFolder.responses.map((response) => (
              <div
                key={response.title}
                className="border border-tds-border-neutral-primary rounded-[8px] p-tds-12 hover:bg-[#f9f9f9] transition-colors"
              >
                <h4 className="text-[14px] font-medium text-tds-text-body-primary mb-tds-6">{response.title}</h4>
                <p className="text-[12px] text-tds-text-caption-secondary leading-[18px]">{response.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CannedResponses;
