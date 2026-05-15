import { useState } from 'react';
import { Button } from '@delhivery/tarmac';

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4.67V12.67C2 13.03 2.3 13.33 2.67 13.33H13.33C13.7 13.33 14 13.03 14 12.67V5.33C14 4.97 13.7 4.67 13.33 4.67H8L6.67 3.33H2.67C2.3 3.33 2 3.63 2 4V4.67Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z" stroke="#e6e6e6" strokeWidth="2" />
    <path d="M16 20H32M16 28H28" stroke="#e6e6e6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface CannedFolder {
  id: string;
  name: string;
  responseCount: number;
}

const mockFolders: CannedFolder[] = [
  { id: '1', name: 'CR Folder 1', responseCount: 3 },
  { id: '2', name: 'CR Folder 2', responseCount: 2 },
  { id: '3', name: 'CR Folder 3', responseCount: 4 },
  { id: '4', name: 'CR Folder 4', responseCount: 5 },
  { id: '5', name: 'CR Folder 5', responseCount: 2 },
  { id: '6', name: 'CR Folder 6', responseCount: 3 },
  { id: '7', name: 'CR Folder 7', responseCount: 5 },
  { id: '8', name: 'CR Folder 8', responseCount: 1 },
];

const CannedResponses = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>(mockFolders[0].id);

  const activeFolder = mockFolders.find((f) => f.id === selectedFolder) || mockFolders[0];

  return (
    <div className="px-tds-24 pt-tds-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <span className="text-[14px] font-bold text-[#111111]">Canned Responses</span>
        <Button variant="black" buttonStyle="secondary" size="md" text="Create New Folder" />
      </div>

      {/* Two-panel layout */}
      <div className="flex gap-tds-16 h-[calc(100vh-220px)]">
        {/* Left - Folder list */}
        <div className="w-[260px] shrink-0 border border-[#e6e6e6] rounded-[8px] overflow-y-auto">
          {mockFolders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`w-full flex items-center gap-tds-8 px-tds-16 py-tds-12 text-left transition-colors cursor-pointer border-b border-[#e6e6e6] last:border-b-0 ${
                selectedFolder === folder.id
                  ? 'border-l-[3px] border-l-[#2563eb] bg-[#f7f7f7]'
                  : 'border-l-[3px] border-l-transparent hover:bg-[#f7f7f7]'
              }`}
            >
              <span className="text-[#666666]"><FolderIcon /></span>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] font-medium text-[#2b2b2b] block truncate">{folder.name}</span>
                <span className="text-[11px] text-[#666666]">{folder.responseCount} Responses</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right - Folder content */}
        <div className="flex-1 border border-[#e6e6e6] rounded-[8px] flex flex-col">
          {/* Folder header */}
          <div className="flex items-center justify-between px-tds-16 py-tds-12 border-b border-[#e6e6e6]">
            <span className="text-[14px] font-semibold text-[#2b2b2b]">{activeFolder.name}</span>
            <Button variant="black" buttonStyle="secondary" size="sm" text="New Response" />
          </div>

          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-tds-24">
            <EmptyIcon />
            <p className="text-[14px] font-medium text-[#2b2b2b] mt-tds-12">No Responses Yet</p>
            <p className="text-[12px] text-[#666666] mt-tds-4">Create a new response to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CannedResponses;
