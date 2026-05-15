import { useState } from 'react';
import { Button, Input } from '@delhivery/tarmac';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7 12.5C10.0376 12.5 12.5 10.0376 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.33 2L14 4.67L5.33 13.33H2.67V10.67L11.33 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const DeleteIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2.67 4.67H13.33M6 4.67V2.67H10V4.67M12 4.67V13.33H4V4.67H12ZM6.67 7.33V10.67M9.33 7.33V10.67" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

// Category Groups data
interface CategoryGroup {
  name: string;
  categoryCount: number;
  categories: { name: string; subcategoryCount: number }[];
}

const mockGroups: CategoryGroup[] = [
  {
    name: 'SCS File Upload',
    categoryCount: 1,
    categories: [{ name: 'File Upload', subcategoryCount: 0 }],
  },
  {
    name: 'B2B Client Issue',
    categoryCount: 3,
    categories: [
      { name: 'B2B Client Issue', subcategoryCount: 14 },
      { name: 'Shipment Tracking', subcategoryCount: 5 },
      { name: 'Invoice Query', subcategoryCount: 3 },
    ],
  },
  {
    name: 'A&I - Breakdown',
    categoryCount: 7,
    categories: [
      { name: 'Conveyor Belt', subcategoryCount: 4 },
      { name: 'Scanner Malfunction', subcategoryCount: 2 },
      { name: 'Weighing Machine', subcategoryCount: 6 },
      { name: 'Printer Breakdown', subcategoryCount: 1 },
      { name: 'Network Connectivity', subcategoryCount: 3 },
      { name: 'Power Supply Issue', subcategoryCount: 0 },
      { name: 'CCTV Camera Fault', subcategoryCount: 2 },
    ],
  },
  {
    name: 'B2C Claims',
    categoryCount: 5,
    categories: [
      { name: 'Shipment Lost', subcategoryCount: 8 },
      { name: 'Shipment Damaged', subcategoryCount: 6 },
      { name: 'Partial Delivery', subcategoryCount: 3 },
      { name: 'Wrong Delivery', subcategoryCount: 2 },
      { name: 'RTO Claim', subcategoryCount: 4 },
    ],
  },
  {
    name: 'Ops Support',
    categoryCount: 4,
    categories: [
      { name: 'Route Optimization', subcategoryCount: 2 },
      { name: 'Vehicle Breakdown', subcategoryCount: 5 },
      { name: 'Manpower Shortage', subcategoryCount: 1 },
      { name: 'Delivery Delay', subcategoryCount: 7 },
    ],
  },
];

// Category Lists data
interface CategoryItem {
  name: string;
  subcategoryCount: number;
  subcategories: string[];
}

const mockCategories: CategoryItem[] = [
  {
    name: 'B2B Client Issue',
    subcategoryCount: 9,
    subcategories: ['Consignee', 'FM-FE', 'LM-FE', 'LM-TL', 'Lost By Rider', 'RT-FE', 'RT-TL', 'Rider Absconding with Shipments', 'Seller'],
  },
  {
    name: 'File Upload',
    subcategoryCount: 0,
    subcategories: [],
  },
  {
    name: 'Shipment Lost',
    subcategoryCount: 5,
    subcategories: ['In Transit', 'At Hub', 'Last Mile', 'RTO', 'Cross Dock'],
  },
  {
    name: 'Conveyor Belt',
    subcategoryCount: 4,
    subcategories: ['Belt Tear', 'Motor Failure', 'Alignment Issue', 'Sensor Fault'],
  },
  {
    name: 'Route Optimization',
    subcategoryCount: 2,
    subcategories: ['Urban Routes', 'Rural Routes'],
  },
];

const tabs = ['Category Groups', 'Category Lists'];

const CategoryManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [groupSearch, setGroupSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  const filteredGroups = mockGroups.filter((g) =>
    g.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const filteredCategories = mockCategories.filter((c) =>
    c.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <div>
      {/* Horizontal Tabs */}
      <div className="flex items-center border-b border-[#e6e6e6] mb-tds-16">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-tds-16 py-tds-12 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === i
                ? 'border-b-[#191919] text-[#2b2b2b]'
                : 'border-b-transparent text-[#737373] hover:text-[#2b2b2b]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===== Category Groups Tab ===== */}
      {activeTab === 0 && (
        <div className="px-tds-24 pt-tds-16">
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <span className="text-[14px] font-bold text-[#111111]">Groups</span>
              <span className="text-[12px] text-[#666666]">({filteredGroups.length})</span>
            </div>
            <div className="flex items-center gap-tds-16">
              <div className="w-[240px]">
                <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search groups" value={groupSearch} onChange={(e) => setGroupSearch(e.target.value)} leadingIcon={<SearchIcon />} />
              </div>
              <Button variant="black" buttonStyle="secondary" size="md" text="+ Create New Group" />
            </div>
          </div>

          {/* Group sections */}
          <div className="flex flex-col gap-tds-24">
            {filteredGroups.map((group) => (
              <div key={group.name} className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
                {/* Section header */}
                <div className="flex items-center justify-between mb-tds-12">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111111]">{group.name}</h3>
                    <p className="text-[12px] text-[#666666]">{group.categoryCount} Category Configured</p>
                  </div>
                  <div className="flex items-center gap-tds-12">
                    <Button variant="black" buttonStyle="secondary" size="sm" text="+ Add New Category" />
                    <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><EditIcon /></button>
                    <button className="p-tds-4 text-[#737373] hover:text-[#dc2626] cursor-pointer"><DeleteIcon /></button>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e6e6e6] mb-tds-12 -mx-tds-16" />

                {/* Category chips */}
                <div className="flex flex-wrap gap-tds-8">
                  {group.categories.map((cat, idx) => (
                    <div key={`${cat.name}-${idx}`} className="px-tds-12 py-tds-8 border border-[#e6e6e6] rounded-[4px] bg-white">
                      <div className="text-[12px] font-medium text-[#2b2b2b]">{cat.name}</div>
                      <div className="text-[12px] text-[#666666]">{cat.subcategoryCount} {cat.subcategoryCount === 1 ? 'Subcategory' : 'Subcategories'}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== Category Lists Tab ===== */}
      {activeTab === 1 && (
        <div className="px-tds-24 pt-tds-16">
          <div className="flex items-center justify-between mb-tds-16">
            <div className="flex items-center gap-tds-8">
              <span className="text-[14px] font-bold text-[#111111]">Categories</span>
              <span className="text-[12px] text-[#666666]">({filteredCategories.length})</span>
            </div>
            <div className="flex items-center gap-tds-16">
              <div className="w-[240px]">
                <Input inputStyle="tarmac-01" inputSize="sm" styleVariant="standard" placeholder="Search categories" value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)} leadingIcon={<SearchIcon />} />
              </div>
              <Button variant="black" buttonStyle="secondary" size="md" text="+ Create New Category" />
            </div>
          </div>

          {/* Category sections */}
          <div className="flex flex-col gap-tds-24">
            {filteredCategories.map((category) => (
              <div key={category.name} className="border border-[#e6e6e6] rounded-[8px] p-tds-16">
                {/* Section header */}
                <div className="flex items-center justify-between mb-tds-12">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#111111]">{category.name}</h3>
                    <p className="text-[12px] text-[#666666]">{category.subcategoryCount} {category.subcategoryCount === 1 ? 'Subcategory' : 'Subcategories'}</p>
                  </div>
                  <div className="flex items-center gap-tds-12">
                    <Button variant="black" buttonStyle="secondary" size="sm" text="+ Add New Subcategory" />
                    <button className="p-tds-4 text-[#737373] hover:text-[#2b2b2b] cursor-pointer"><EditIcon /></button>
                    <button className="p-tds-4 text-[#737373] hover:text-[#dc2626] cursor-pointer"><DeleteIcon /></button>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#e6e6e6] mb-tds-12 -mx-tds-16" />

                {/* Subcategory chips */}
                <div className="flex flex-wrap gap-tds-8">
                  {category.subcategories.length > 0 ? (
                    category.subcategories.map((sub, idx) => (
                      <div key={`${sub}-${idx}`} className="px-tds-12 py-tds-8 border border-[#e6e6e6] rounded-[4px] bg-white">
                        <span className="text-[12px] font-medium text-[#2b2b2b]">{sub}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-[12px] text-[#666666]">No subcategories configured</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
