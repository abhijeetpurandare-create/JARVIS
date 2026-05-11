const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="#808080" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface PropertyFieldProps {
  label: string;
  value: string;
  hasDropdown?: boolean;
  nested?: boolean;
}

const PropertyField = ({ label, value, hasDropdown = true, nested = false }: PropertyFieldProps) => (
  <div className={`flex flex-col gap-tds-4 ${nested ? 'pl-tds-16' : ''}`}>
    <span className="text-[11px] font-medium text-tds-text-body-secondary">{label}</span>
    <div className="flex items-center justify-between px-tds-12 py-tds-6 border border-tds-border-neutral-primary rounded-[6px] bg-tds-surface-bg-primary-default cursor-pointer hover:border-tds-border-neutral-secondary">
      <span className="text-[12px] text-tds-text-body-primary truncate">{value}</span>
      {hasDropdown && <ChevronDownIcon />}
    </div>
  </div>
);

const PropertiesPanel = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Tab Group */}
      <div className="flex border-b border-tds-border-neutral-primary">
        <button className="flex-1 px-tds-12 py-tds-12 text-[12px] font-medium text-tds-text-body-primary border-b-2 border-tds-surface-bg-primary-inverse-default">
          Details
        </button>
        <button className="flex-1 px-tds-12 py-tds-12 text-[12px] font-medium text-tds-text-caption-secondary hover:text-tds-text-body-primary">
          Activity
        </button>
        <button className="flex-1 px-tds-12 py-tds-12 text-[12px] font-medium text-tds-text-caption-secondary hover:text-tds-text-body-primary">
          Properties
        </button>
      </div>

      {/* Properties content */}
      <div className="flex-1 overflow-auto p-tds-12">
        <div className="flex flex-col gap-tds-16">
          {/* Status */}
          <PropertyField label="Status" value="Open" />

          {/* Agent */}
          <PropertyField label="Agent" value="Melika Govekar" />
          <PropertyField label="Team" value="Service Center Operations" nested />

          {/* Category */}
          <PropertyField label="Category" value="Delivery Issue" />
          <PropertyField label="Sub-Category" value="Delivery Delayed" nested />

          {/* Priority */}
          <PropertyField label="Priority" value="High" />

          {/* Source */}
          <PropertyField label="Source" value="UCP" hasDropdown={false} />

          {/* SLA */}
          <PropertyField label="Closure Due" value="21 Apr 2026, 12:00 PM" hasDropdown={false} />
        </div>
      </div>

      {/* Bottom action */}
      <div className="border-t border-tds-border-neutral-primary p-tds-12">
        <button className="w-full flex items-center justify-center gap-tds-8 px-tds-12 py-tds-8 bg-tds-surface-bg-primary-inverse-default text-tds-text-heading-inverse-only-white rounded-tds-default text-[12px] font-medium cursor-pointer">
          Update Ticket
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
