# JobTrackr: Board UI

JobTrackr is a job application tracker built with React, components, props, and state. This project is built as part of the **Day 03 Assignment: React Fundamentals**.

## Features

- **Component Architecture**: Built using modular components (`Header`, `ApplicationForm`, `Board`, `Column`, `ApplicationCard`) in `src/components/`.
- **Lifted State**: All applications are maintained in a single `useState` hook in `App.jsx`, maintaining unidirectional data flow (data flows down via props, updates bubble up through callbacks).
- **Controlled Form with Validation**:
  - `company` & `role`: Required, 2–60 characters.
  - `status`: Applied → Interview → Offer, or Rejected.
  - `appliedOn`: Required date, not in the future.
  - `priority`: Low, Medium, or High.
  - Duplicate detection: Rejects applications with the same company and role (case-insensitive).
  - Inline error messages displayed directly below each input field.
- **Kanban Board with Immutable Updates**:
  - Four status columns: **Applied**, **Interview**, **Offer**, and **Rejected** with application counts.
  - Move cards sequentially (`Applied` → `Interview` → `Offer`).
  - Move to `Rejected` from any stage.
  - Delete cards with confirmation prompt.
  - Empty columns display `"Nothing here yet"`.
  - Immutable state management using `map`, `filter`, and spread (`...`) syntax.
- **Derived Values & Instant Filtering**:
  - Real-time search by company or role.
  - Priority filter (`All`, `High`, `Medium`, `Low`).
  - Filtered lists and header statistics (`X applications · Y interviews · Z offers`) are derived during render, not stored in state.
- **Interview Answers**: Includes `INTERVIEW.md` answering core React questions under 80 words each.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Header with dynamically derived statistics
│   ├── ApplicationForm.jsx  # Controlled form with validation & duplicate detection
│   ├── Board.jsx           # 4-column Kanban board layout
│   ├── Column.jsx          # Individual status column with counter and empty state
│   └── ApplicationCard.jsx # Job card with stage advancement, rejection, & deletion
├── App.jsx                 # Main component with state, derived values, & callbacks
├── App.css                 # Application styling
├── index.css               # Global base styling
└── main.jsx                # React root entry point
INTERVIEW.md                # Task 5 interview question answers
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
