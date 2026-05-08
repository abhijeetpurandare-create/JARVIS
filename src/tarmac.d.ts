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
    total?: number;
    showTextLeft?: boolean;
    showNumberCells?: boolean;
    showTextRight?: boolean;
    showDivider?: boolean;
    showSizeChanger?: boolean;
    isDisabled?: boolean;
    onChange?: (page: number, pageSize: number) => void;
    showTotal?: (total: number, range: [number, number]) => ReactNode;
    prevIcon?: ReactNode;
    nextIcon?: ReactNode;
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
  export const Dropdown: FC<any>;
  export const Badge: FC<any>;
  export const Chip: FC<any>;
  export const Modal: FC<any>;
  export const Divider: FC<any>;
  export const Table: FC<any>;
  export const Sidebar: FC<any>;
}
