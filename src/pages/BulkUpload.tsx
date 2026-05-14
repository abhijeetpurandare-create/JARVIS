import { useState, useRef } from 'react';
import { Button, Link } from '@delhivery/tarmac';

const BulkUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  return (
    <div className="flex flex-col h-full overflow-auto px-tds-16">
      {/* Header */}
      <div className="py-tds-16">
        <h1 className="text-[16px] font-semibold text-tds-text-heading-primary leading-[24px]">Bulk Upload</h1>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto w-full flex flex-col gap-tds-24">
        {/* Drop zone */}
        <div
          className={`border-2 border-dashed rounded-tds-lg p-tds-24 flex flex-col items-center justify-center gap-tds-12 min-h-[200px] transition-colors cursor-pointer ${
            isDragging ? 'border-tds-border-info-primary bg-tds-surface-bg-blue-weakest' : 'border-tds-border-neutral-primary bg-[#fafafa]'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {/* CSV icon */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="12" y="6" width="24" height="36" rx="2" stroke="#737373" strokeWidth="1.5" />
            <path d="M18 18H30M18 24H30M18 30H26" stroke="#737373" strokeWidth="1.5" strokeLinecap="round" />
            <text x="24" y="44" textAnchor="middle" fontSize="8" fill="#737373" fontWeight="600">CSV</text>
          </svg>

          {file ? (
            <div className="flex flex-col items-center gap-tds-4">
              <span className="text-[14px] font-medium text-tds-text-body-primary">{file.name}</span>
              <span className="text-[12px] text-tds-text-caption-secondary">{(file.size / 1024).toFixed(1)} KB</span>
              <Button variant="black" buttonStyle="secondary" size="sm" text="Remove" onClick={(e) => { e.stopPropagation(); setFile(null); }} />
            </div>
          ) : (
            <>
              <p className="text-[14px] font-medium text-tds-text-body-primary text-center">
                Drop your .CSV file with list of ticket you wish to update
              </p>
              <p className="text-[12px] text-tds-text-caption-secondary text-center">
                You can drag and drop or <span className="text-tds-text-info-primary cursor-pointer hover:underline">Click here</span> to upload upto 500 tickets (Max 20MB)
              </p>
              <p className="text-[12px] text-tds-text-caption-secondary">The tickets will be updated</p>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Instructions */}
        <div className="border border-tds-border-neutral-primary rounded-tds-md p-tds-24">
          <h3 className="text-[14px] font-semibold text-tds-text-heading-primary mb-tds-16">Instructions</h3>
          <ul className="flex flex-col gap-tds-8">
            <li className="text-[14px] text-tds-text-body-primary leading-[20px]">
              Upload CSV file with maximum of 500 tickets. Not sure what to upload?{' '}
              <Link href="#">Download Sample CSV file</Link>
            </li>
            <li className="text-[14px] text-tds-text-body-primary leading-[20px]">
              The names of the columns should match exactly with field names in Jarvis
            </li>
            <li className="text-[14px] text-tds-text-body-primary leading-[20px]">
              Column for ticket ID is mandatory
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
