declare module '@delhivery/tarmac' {
  import { FC, ReactNode, HTMLAttributes, CSSProperties } from 'react';

  // ThemeProvider
  export interface ThemeProviderProps {
    initialSource?: string;
    activeTheme?: string;
    children?: ReactNode;
    showLoadingUntilReady?: boolean;
    loadingComponent?: ReactNode;
  }
  export const ThemeProvider: FC<ThemeProviderProps>;
  export function useTheme(): { theme: any };

  // Button
  export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant?: string;
    buttonStyle?: string;
    size?: string;
    buttonType?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    icon?: ReactNode;
    iconPosition?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    disabled?: boolean;
    text?: string;
    isGhost?: boolean;
    isRounded?: boolean;
    children?: ReactNode;
  }
  export const Button: FC<ButtonProps>;

  // Pill
  export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
    text?: string;
    pillVariant?: string;
    pillType?: string;
    size?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    showStatus?: boolean;
    isDisabled?: boolean;
  }
  export const Pill: FC<PillProps>;

  // Pagination
  export interface PaginationProps {
    paginationStyle?: string;
    cellStyle?: string;
    tarmacSize?: string;
    current?: number;
    defaultCurrent?: number;
    pageSize?: number;
    defaultPageSize?: number;
    total?: number;
    showTextLeft?: boolean;
    showNumberCells?: boolean;
    showTextRight?: boolean;
    showDivider?: boolean;
    showSizeChanger?: boolean;
    pageSizeOptions?: (string | number)[];
    isDisabled?: boolean;
    onChange?: (page?: number, pageSize?: number) => void;
    onShowSizeChange?: (current: number, size: number) => void;
    showTotal?: (total: number, range: [number, number]) => ReactNode;
    prevIcon?: ReactNode;
    nextIcon?: ReactNode;
    textCount?: string;
    textItems?: ReactNode[];
    showPageCell?: boolean;
    showLeftIconButton?: boolean;
    onLeftIconButtonClick?: () => void;
    className?: string;
  }
  export const Pagination: FC<PaginationProps>;

  // TarmacTable
  export interface TableHeaderCellProps {
    label?: string;
    sortable?: boolean;
    headerType?: string;
    className?: string;
  }
  export interface TableTextCellProps {
    title?: string;
    subtextTop?: string;
    subtextBottom?: string;
    showTitle?: boolean;
    showSubtextTop?: boolean;
    showSubtextBottom?: boolean;
    variant?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    leadingSubtextIcon?: ReactNode;
    trailingSubtextIcon?: ReactNode;
    className?: string;
  }
  interface TarmacTableComponent extends FC<any> {
    HeaderCell: FC<TableHeaderCellProps>;
    TextCell: FC<TableTextCellProps>;
    Divider: FC<any>;
    StatusIndicator: FC<any>;
    CellBadgePills: FC<any>;
    CellAddons: FC<any>;
    SectionHeader: FC<any>;
    SectionFooter: FC<any>;
    FullHeader: FC<any>;
    Row: FC<any>;
  }
  export const TarmacTable: TarmacTableComponent;
  export const TableTextCell: FC<TableTextCellProps>;
  export const TableHeaderCell: FC<TableHeaderCellProps>;

  // SideNavigation
  export interface SideNavigationProps {
    navStyle?: string;
    navType?: string;
    isCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    hoverToExpand?: boolean;
    expandMode?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }
  export interface NavCellProps {
    itemKey?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    label?: string;
    isActive?: boolean;
    onClick?: () => void;
  }
  interface SideNavigationComponent extends FC<SideNavigationProps> {
    Cell: FC<NavCellProps>;
    Divider: FC<any>;
    Group: FC<any>;
    Slot: FC<any>;
  }
  export const SideNavigation: SideNavigationComponent;

  // Other exports
  export interface AvatarProps {
    size?: string;
    text?: string;
    src?: string;
    alt?: string;
    avatarType?: string;
    shape?: string;
    type?: string;
    showStatus?: boolean;
    statusType?: string;
    className?: string;
  }
  export const Avatar: FC<AvatarProps>;
  export const Navbar: FC<any>;

  // Dropdown
  export interface DropdownOption {
    label: string;
    value: string | number;
  }
  export interface TarmacDropdownOption {
    label: string;
    value: string | number;
    description?: string;
  }
  export interface DropdownProps {
    dropdownStyle?: string;
    dropdownInputType?: string;
    dropdownSize?: string;
    label?: string;
    placeholder?: string;
    value?: string | number | (string | number)[];
    onChange?: (value: string | number | (string | number)[]) => void;
    options?: DropdownOption[];
    tarmacOptions?: TarmacDropdownOption[];
    isSearchable?: boolean;
    multiple?: boolean;
    isDisabled?: boolean;
    isGhost?: boolean;
    isMandatory?: boolean;
    leadingIcon?: ReactNode;
    titleIcon?: ReactNode;
    helperTextTop?: ReactNode;
    helperTextBottom?: ReactNode;
    subtext?: ReactNode;
    addonText?: ReactNode;
    listVariant?: string;
    maxVisibleItems?: number;
    showFooter?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string;
    size?: string;
    dropdownHeight?: string | number;
    position?: string;
  }
  export const Dropdown: FC<DropdownProps>;

  export const Badge: FC<any>;
  export const Chip: FC<any>;
  export const Modal: FC<any>;
  export const Divider: FC<any>;
  export const Table: FC<any>;
  export const Sidebar: FC<any>;

  // Switch
  export interface SwitchProps {
    tarmacColor?: string;
    tarmacStyle?: string;
    tarmacSize?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    onClick?: (checked: boolean) => void;
    disabled?: boolean;
    loading?: boolean;
    size?: string;
    variant?: string;
    className?: string;
    checkedChildren?: ReactNode;
    unCheckedChildren?: ReactNode;
    isGhost?: boolean;
  }
  export const Switch: FC<SwitchProps>;

  // TextArea
  export interface TextAreaProps {
    textAreaStyle?: string;
    textAreaType?: string;
    textAreaSize?: string;
    styleVariant?: string;
    label?: ReactNode;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    isDisabled?: boolean;
    isGhost?: boolean;
    isMandatory?: boolean;
    helperTextTop?: ReactNode;
    helperTextBottom?: ReactNode;
    subtext?: ReactNode;
    statusText?: ReactNode;
    trailingIcon?: ReactNode;
    titleIcon?: ReactNode;
    descriptionText?: ReactNode;
    className?: string;
  }
  export const TextArea: FC<TextAreaProps>;

  // TabGroup
  export interface TabGroupProps {
    orientation?: string;
    size?: string;
    tabType?: string;
    showDivider?: boolean;
    className?: string;
    children?: ReactNode;
  }
  export const TabGroup: FC<TabGroupProps>;

  // TabCell
  export interface TabCellProps {
    tabType?: string;
    orientation?: string;
    tabStyle?: string;
    size?: string;
    isPressed?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isGhost?: boolean;
    title?: string;
    subtext?: string;
    showCheckbox?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    badge?: ReactNode;
    pill?: ReactNode;
    status?: ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    children?: ReactNode;
  }
  export const TabCell: FC<TabCellProps>;

  // Breadcrumbs
  export interface BreadcrumbCellProps {
    label?: string;
    link?: string;
    isCurrent?: boolean;
    leadingIcon?: ReactNode;
    pill?: ReactNode;
    key?: string;
  }
  export interface BreadcrumbsProps {
    items?: BreadcrumbCellProps[];
    dividerStyle?: 'slash' | 'chevron';
    size?: 'lg' | 'sm';
    showDivider?: boolean;
    className?: string;
    children?: ReactNode;
  }
  export const Breadcrumbs: FC<BreadcrumbsProps>;
  export const BreadcrumbCell: FC<BreadcrumbCellProps>;
  export const AddCircleIcon20: FC<any>;
  export const AddCircleIcon16: FC<any>;

  // DropdownList
  export const DropdownList: FC<any>;

  // Input
  export interface InputProps {
    inputStyle?: string;
    inputType?: string;
    inputSize?: string;
    styleVariant?: string;
    label?: ReactNode;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled?: boolean;
    isGhost?: boolean;
    isMandatory?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    titleIcon?: ReactNode;
    helperTextTop?: ReactNode;
    helperTextBottom?: ReactNode;
    subtext?: ReactNode;
    statusText?: ReactNode;
    badge?: ReactNode;
    addonText?: ReactNode;
    size?: string;
    className?: string;
  }
  export const Input: FC<InputProps>;
  export const InputAddon: FC<any>;
}
