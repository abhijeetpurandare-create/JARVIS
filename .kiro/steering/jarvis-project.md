# JARVIS — Delhivery Ticketing Platform

## Project Overview
JARVIS is a customer support ticketing platform for Delhivery, built as a React + TypeScript + Vite SPA. It uses the Tarmac Design System (TDS) from `@delhivery/tarmac` and is deployed on GitHub Pages.

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS with TDS preset (`tds-preset.cjs`)
- `@delhivery/tarmac` (local file link from `/Users/abhijeet.purandare/Downloads/Tarmac-Design-System-main 2/packages/atoms`)
- HashRouter for GitHub Pages compatibility
- GitHub Pages deployment via GitHub Actions (workflow mode, deploys `./dist`)

## Repository
- GitHub: `dlv-ap/JARVIS`
- Live site: `https://dlv-ap.github.io/JARVIS/`
- Branch: `main` (all work goes here directly)
- `Design_Version2` branch: frozen snapshot of the classic layout (do NOT push to it)

## Design System Rules

### Font
- **Noto Sans** — loaded via Google Fonts (400, 500, 600, 700)
- Set in Tailwind config, CSS body, and index.html

### Typography Scale (TDS standard)
- 10px — Badges, captions, tiny labels
- 12px / weight 400-600 / line-height 16px — Body small (table cells, metadata, form labels, nav items)
- 14px / weight 500-600 / line-height 20px — Body (card titles, dropdown items, profile names)
- 16px / weight 600-700 / line-height 24px — Heading medium (page titles)
- 20px / weight 600-700 / line-height 26px — Heading large (KPI values)
- NEVER use 11px or 13px — not in TDS scale

### Colors
- Use TDS tokens: `tds-text-*`, `tds-surface-bg-*`, `tds-border-*`
- No hardcoded hex colors except where TDS doesn't have a token (e.g., `#6366F1` for Ask AI purple, `#48a26b` for available green)
- Modern layout background: `#f7f7f7` (grey)
- Content area: white (`bg-white`)

### Spacing
- Use TDS spacing tokens: `tds-4`, `tds-6`, `tds-8`, `tds-12`, `tds-16`, `tds-24`
- Gaps between sections: 16px (`gap-tds-16`)

### Border Radius
- `tds-default`, `tds-md`, `tds-lg`, `tds-full`
- Content area top-left radius: `rounded-tl-[12px]`

## Layout System

### Two layouts available (toggle in profile dropdown):
1. **Modern Layout** (default):
   - Grey header (`#f7f7f7`), no shadow, 56px height
   - Grey sidebar, collapsed (52px), expands on hover (180px) — icons stay fixed, labels appear on right
   - White content area with `rounded-tl-[12px]`
   - Content has `px-tds-16` (equal left/right padding)

2. **Classic Layout**:
   - White header with shadow, 60px height
   - Floating black sidebar, rounded, with shadow — absolute positioned
   - Grey content background (`tds-surface-bg-coal-weakest`)
   - Content offset: `ml-[76px]` + `px-tds-16`

### Layout persistence:
- Stored in `localStorage` key `jarvis-layout`
- Values: `'modern'` | `'classic'`
- Toggle via profile dropdown: "Switch to Classic/Modern Layout"
- Persists across navigation and page refresh

## Pages

### Dashboard (`#/`)
- Title: "Dashboard" (16px semibold)
- Sections: Today's Workload Overview (4 cards), Performance Overview (5 KPI cards + date badge), Quick Links, Team-wise Ticket Ageing (heatmap table)
- "View Team Performance" button (TDS Button, rounded, black)

### Ticket List (`#/tickets`)
- Title: "Ticket List (215)" with Filter button
- Table with columns: Ticket name, Customer, Agent, Created On, To Be Closed By, Status
- Sorting: click column headers (3-state: asc → desc → default) with red arrows
- **Status filter**: dropdown with checkboxes (multi-select)
- **Agent filter**: dropdown with checkboxes (multi-select)
- Pagination: custom (Show X per page dropdown + page numbers + Previous/Next)
- Click row → navigates to ticket details

### Ticket Details (`#/ticket/:ticketId`)
- Title bar with metadata (subject, created on, raised by, client, source, AWB, LRN)
- Actions: Ask AI badge (purple), Print, Prev/Next navigation arrows
- 3 resizable panels using flex-grow ratios:
  - Conversation (65%) — chat bubbles (blue=customer, white=agent, yellow=notes)
  - Properties (17.5%) — dropdowns for status/agent/team/category/priority
  - Ask AI (17.5%) — context sections + input textbox
- Reply box: appears inline in scroll area when Reply/Note/Forward/Escalate clicked
  - Auto-grows with content, no height limit
  - Scrolls with messages (Gmail-like)
  - Bottom action strip stays static (h-[52px])
- All bottom strips: exactly h-[52px] (reply strip, update ticket strip, ask AI strip)
- Ask AI textbox: auto-grows up to 6 lines (108px), then scrolls internally
- Send button: disabled when empty, bottom-aligned with textbox

### Agent Availability (`#/availability`)
- Grid of team cards (4 columns, gap-tds-16)
- Sorted alphabetically, grouped by first letter
- A-Z scroll index on right (fixed, vertically centered)
- Search input (TDS Input)
- Click team → TDS SideDrawer opens with agent list + Switch toggles
- No visible scrollbar

## Component Usage

### TDS components that WORK:
- `Button`, `Pill`, `Badge`, `Avatar`, `TarmacTable.TextCell`
- `Card`, `SideDrawer`, `Input`, `Switch`
- `SnackbarManager` + `snackbar()` (programmatic)
- `ThemeProvider`

### TDS components that CRASH at runtime (use custom implementations):
- `Pagination` — use custom pagination with page numbers
- `TabGroup` / `TabCell` — use custom tab buttons
- `Dropdown` — use custom dropdown with click-outside-to-close
- `Breadcrumbs` — use custom nav with chevron separators
- `TextArea` — use native textarea
- `Switch` in ConversationPanel — use custom toggle div

### Custom implementations must:
- Use TDS color tokens
- Use TDS spacing tokens
- Use TDS border-radius tokens
- Match TDS typography scale
- Look visually identical to TDS components

## Breadcrumbs
- Uses `useLocation()` from React Router (reactive)
- Format: `Dashboard > Ticket Listing > Ticket Details (#ID)`
- Copy button on ticket details breadcrumb → triggers TDS snackbar

## Deployment
- GitHub Actions workflow (`.github/workflows/deploy.yml`)
- Deploys `./dist` folder (pre-built locally since TDS is a local dependency)
- Pages source: `workflow` mode (NOT legacy branch mode)
- After code changes: run `npm run build` then commit `dist/` and push to main
- Base path: `/JARVIS/`

## Git Workflow
- All work on `main` branch directly
- Do NOT push to `Design_Version2` branch
- Commit messages: descriptive, prefixed with feat/fix/refactor/ci

## User Preferences
- Customer and agent names must be different in ticket listing
- "Ask AI" text: purple (#6366F1)
- No shield icon on Ask AI
- Filter button text: "Filter" (not "Filter List")
- Breadcrumb format: "Ticket Listing > Ticket Details (#ticketID)"
- Update Ticket button: disabled until property changes
- Properties tab first, Related Tickets second
- Per-page dropdown dynamically updates listing and pagination
- Sort arrows: 1st click=asc (up red), 2nd=desc (down red), 3rd=default (both grey)
- Side nav labels: bold, uppercase when expanded
- Profile avatar: stays in fixed position when nav expands/collapses
