import { Button, Upload } from '@delhivery/tarmac';

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 26.67V13.33M20 13.33L15 18.33M20 13.33L25 18.33" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33.33 25V31.67C33.33 32.55 32.55 33.33 31.67 33.33H8.33C7.45 33.33 6.67 32.55 6.67 31.67V25" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3.33V10.67M8 10.67L5.33 8M8 10.67L10.67 8M2.67 12.67H13.33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SLAManagement = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <h1 className="text-[20px] font-semibold text-tds-text-body-primary" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
          SLA Management
        </h1>
      </div>

      {/* Instructions */}
      <div className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg p-tds-24 mb-tds-16">
        <h2 className="text-[16px] font-semibold text-tds-text-body-primary mb-tds-12">Upload SLA Configuration</h2>
        <p className="text-[14px] text-tds-text-caption-secondary mb-tds-16">
          Upload a CSV file containing your SLA configurations. The file should include columns for team, priority, response time, and resolution time.
        </p>

        {/* Instructions list */}
        <div className="mb-tds-24">
          <h3 className="text-[14px] font-medium text-tds-text-body-primary mb-tds-8">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-[6px] text-[14px] text-tds-text-caption-secondary">
            <li>Download the sample CSV template below</li>
            <li>Fill in the SLA configurations for each team and priority</li>
            <li>Ensure all required columns are filled (Team, Priority, Response Time, Resolution Time)</li>
            <li>Upload the completed CSV file using the upload zone below</li>
            <li>Review the preview and confirm the upload</li>
          </ol>
        </div>

        {/* Download template */}
        <div className="mb-tds-24">
          <Button
            variant="black"
            buttonStyle="tertiary"
            size="md"
            text="Download Sample Template"
            leadingIcon={<DownloadIcon />}
          />
        </div>

        {/* Upload Zone */}
        <div className="border-2 border-dashed border-tds-border-neutral-primary rounded-tds-lg p-tds-24 flex flex-col items-center justify-center text-center hover:border-[#2563eb] transition-colors cursor-pointer">
          <UploadIcon />
          <p className="text-[14px] font-medium text-tds-text-body-primary mt-tds-12 mb-tds-4">
            Drag and drop your CSV file here
          </p>
          <p className="text-[12px] text-tds-text-caption-secondary mb-tds-16">
            or click to browse files (CSV format only, max 5MB)
          </p>
          <Upload
            accept=".csv"
            size="medium"
            uploadType="drag"
          />
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-tds-surface-bg-primary-default border border-tds-border-neutral-primary rounded-tds-lg p-tds-16">
        <h3 className="text-[14px] font-semibold text-tds-text-body-primary mb-tds-12">Recent Uploads</h3>
        <div className="text-[14px] text-tds-text-caption-secondary">No recent uploads found.</div>
      </div>
    </div>
  );
};

export default SLAManagement;
