import { Button } from '@delhivery/tarmac';
// import { useState } from 'react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8.75 15C12.2018 15 15 12.2018 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.25 13.25L17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Filter field options from narad-ui database

interface FilterDropdownProps {
  label: string;
  placeholder: string;
}

const FilterDropdown = ({ label, placeholder }: FilterDropdownProps) => (
  <div className="flex flex-col gap-tds-8 w-full">
    <span className="text-[12px] font-medium text-tds-text-body-secondary leading-[16px]">{label}</span>
    <div className="flex items-center gap-tds-4 px-tds-16 py-tds-8 border border-tds-border-neutral-primary rounded-[6px] bg-tds-surface-bg-primary-default w-full cursor-pointer hover:border-tds-border-neutral-secondary transition-colors">
      <span className="flex-1 text-[12px] font-medium text-[#808080] overflow-hidden text-ellipsis whitespace-nowrap">{placeholder}</span>
      <ChevronDownIcon />
    </div>
  </div>
);

const FilterPanel = ({ isOpen, onClose, onApply }: FilterPanelProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-tds-alpha-black-200 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-tds-surface-bg-primary-default z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ boxShadow: '0px 20px 56px -12px rgba(0,0,0,0.25)' }}
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-[20px] py-[14px]">
          {/* Filter Tickets section */}
          <div className="flex items-center justify-between h-[30px] mb-tds-24">
            <h2 className="text-[16px] font-semibold text-tds-text-heading-primary leading-[24px]">Filter Tickets</h2>
            <div className="flex items-center gap-tds-8">
              <button className="flex items-center justify-center p-tds-8 rounded-tds-default cursor-pointer hover:bg-tds-surface-bg-coal-weakest transition-colors">
                <SearchIcon />
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center p-tds-8 rounded-tds-default cursor-pointer hover:bg-tds-surface-bg-coal-weakest transition-colors"
                aria-label="Close filter panel"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Filter fields */}
          <div className="flex flex-col gap-tds-24">
            <FilterDropdown label="Agents" placeholder="Select Agent" />
            <FilterDropdown label="Date Created" placeholder="Select" />
            <FilterDropdown label="First Response Due" placeholder="Select" />
            <FilterDropdown label="Next Response Due" placeholder="Select" />
            <FilterDropdown label="Closure Due" placeholder="Select" />
            <FilterDropdown label="Status" placeholder="Select" />
            <FilterDropdown label="Category" placeholder="Select" />
            <FilterDropdown label="Sub-Category" placeholder="Select" />
          </div>
        </div>

        {/* Footer — Close + Apply Filter buttons */}
        <div className="flex gap-tds-16 px-[14px] py-tds-16 border-t border-[#e0e3eb] bg-tds-surface-bg-primary-default" style={{ boxShadow: '0px -20px 56px -12px rgba(0,0,0,0.1)' }}>
          <Button variant="black" buttonStyle="secondary" size="md" text="Close" className="flex-1" onClick={onClose} />
          <Button variant="black" buttonStyle="primary" size="md" text="Apply Filter" className="flex-1" onClick={onApply} />
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
