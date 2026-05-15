import { Button } from '@delhivery/tarmac';

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 3.33V10.67M8 10.67L5.33 8M8 10.67L10.67 8M2.67 12.67H13.33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UploadCloudIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 26.67V13.33M20 13.33L15 18.33M20 13.33L25 18.33" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33.33 25V31.67C33.33 32.55 32.55 33.33 31.67 33.33H8.33C7.45 33.33 6.67 32.55 6.67 31.67V25" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SLAManagement = () => {
  return (
    <div className="px-tds-24 pt-tds-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-tds-16">
        <span className="text-[14px] font-bold text-[#111111]">SLA Management</span>
        <Button variant="black" buttonStyle="secondary" size="md" text="Download Current SLA List" leadingIcon={<DownloadIcon />} />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-tds-16 mb-tds-24">
        {/* Left - File Upload */}
        <div className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
          <h3 className="text-[14px] font-semibold text-[#444444] mb-tds-12">File Upload</h3>

          {/* Dashed upload zone */}
          <div className="border-2 border-dashed border-[#e6e6e6] rounded-[8px] p-tds-24 flex flex-col items-center justify-center text-center mb-tds-12">
            <UploadCloudIcon />
            <p className="text-[12px] text-[#2b2b2b] mt-tds-12 mb-tds-8">
              Drop your CSV file here with list of SLAs you wish to update
            </p>
            <Button variant="black" buttonStyle="secondary" size="sm" text="Click to browse" />
          </div>

          <p className="text-[12px] text-[#666666] mb-tds-4">Browse file, and drag and drop into this field</p>
          <div className="flex items-center gap-tds-8">
            <span className="text-[12px] text-[#666666]">Status:</span>
            <span className="text-[12px] font-medium text-[#666666]">Pending</span>
          </div>
        </div>

        {/* Right - Instructions */}
        <div className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
          <h3 className="text-[14px] font-semibold text-[#444444] mb-tds-12">Instructions</h3>

          <ol className="list-decimal list-inside space-y-[8px] text-[12px] text-[#2b2b2b] mb-tds-16">
            <li>Download the CSV template using the button below</li>
            <li>Fill in the SLA configurations for each team and priority</li>
            <li>Ensure all required columns are filled (Team, Priority, Response Time, Resolution Time)</li>
            <li>Upload the completed CSV file using the upload zone on the left</li>
            <li>Review the preview and confirm the upload</li>
          </ol>

          <p className="text-[12px] text-[#666666] mb-tds-8">Not sure what to upload?</p>
          <Button variant="black" buttonStyle="secondary" size="sm" text="Download CSV Template" leadingIcon={<DownloadIcon />} />
        </div>
      </div>

      {/* Recent Uploads */}
      <div>
        <h3 className="text-[14px] font-semibold text-[#444444] mb-tds-12">Recent Uploads</h3>
        <div className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
          <p className="text-[12px] text-[#666666]">No recent uploads found</p>
        </div>
      </div>
    </div>
  );
};

export default SLAManagement;
