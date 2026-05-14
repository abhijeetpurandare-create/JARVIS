import { useState } from 'react';
import { Upload, Link } from '@delhivery/tarmac';

const BulkUpload = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange = (info: any) => {
    setFileList(info.fileList);
  };

  const handleRemove = () => {
    setFileList([]);
  };

  return (
    <div className="flex flex-col h-full overflow-auto px-tds-16">
      {/* Header */}
      <div className="py-tds-16">
        <h1 className="text-[16px] font-semibold text-tds-text-heading-primary leading-[24px]">Bulk Upload</h1>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto w-full flex flex-col gap-tds-24">
        {/* TDS Upload — drag and drop */}
        <Upload
          version="v1"
          uploadType="drag"
          accept=".csv"
          multiple={false}
          maxCount={1}
          fileList={fileList}
          onChange={handleChange}
          onRemove={handleRemove}
          beforeUpload={() => false}
          title="Drop your .CSV file with list of ticket you wish to update"
          description="You can drag and drop or click to upload upto 500 tickets (Max 20MB)"
          dragTitle="Drop your .CSV file with list of ticket you wish to update"
          dragDescription="You can drag and drop or click to upload upto 500 tickets (Max 20MB). The tickets will be updated"
          size="large"
        />

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
