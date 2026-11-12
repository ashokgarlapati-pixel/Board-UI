import React, { useState } from 'react';
import Header from './components/Header';
import ApplicationForm from './components/ApplicationForm';
import Board from './components/Board';
import './App.css';

// Initial sample applications to demonstrate board functionality on load
const INITIAL_APPLICATIONS = [
  {
    id: '1',
    company: 'Google',
    role: 'Frontend Engineer',
    status: 'Applied',
    appliedOn: '2026-11-05',
    priority: 'High',
  },
  {
    id: '2',
    company: 'Microsoft',
    role: 'Software Engineer',
    status: 'Interview',
    appliedOn: '2026-11-02',
    priority: 'High',
  },
  {
    id: '3',
    company: 'Amazon',
    role: 'Full Stack Developer',
    status: 'Interview',
    appliedOn: '2026-10-28',
    priority: 'Medium',
  },
  {
    id: '4',
    company: 'Stripe',
    role: 'React Developer',
    status: 'Offer',
    appliedOn: '2026-10-20',
    priority: 'High',
  },
  {
    id: '5',
    company: 'Netflix',
    role: 'UI Engineer',
    status: 'Rejected',
    appliedOn: '2026-10-15',
    priority: 'Low',
  },
];

function App() {
  // State lifted up: all applications kept in one useState in App
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);

  // Filter state (search term and priority selection)
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  /*
   * ============================================================================
   * WHY apps.push(x); setApps(apps) DOES NOT RE-RENDER:
   *
   * In React, state updates rely on reference equality checks (Object.is).
   * When we call `apps.push(x)`, it mutates the existing array in-place, meaning
   * `apps` still points to the exact same reference in computer memory.
   * When `setApps(apps)` is called with that same reference, React checks:
   * `Object.is(oldState, newState)` -> true.
   * Because the reference did not change, React assumes nothing has changed and
   * bails out of re-rendering the component.
   *
   * To trigger a re-render, we must update state immutably (e.g. `[...apps, x]`,
   * `map`, or `filter`). This creates a brand new array reference in memory,
   * allowing React to detect the change and re-render the UI.
   * ============================================================================
   */

  // 1. Add application immutably with spread operator
  const handleAddApplication = (newApp) => {
    setApplications((prevApps) => [newApp, ...prevApps]);
  };

  // 2. Move application to next stage immutably with map
  const handleMoveStage = (id) => {
    setApplications((prevApps) =>
      prevApps.map((app) => {
        if (app.id !== id) return app;

        // Next stage progression: Applied -> Interview -> Offer
        if (app.status === 'Applied') {
          return { ...app, status: 'Interview' };
        }
        if (app.status === 'Interview') {
          return { ...app, status: 'Offer' };
        }
        return app;
      })
    );
  };

  // 3. Mark application as Rejected immutably with map
  const handleReject = (id) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, status: 'Rejected' } : app
      )
    );
  };

  // 4. Delete application immutably with filter
  const handleDelete = (id) => {
    setApplications((prevApps) => prevApps.filter((app) => app.id !== id));
  };

  /*
   * DERIVED VALUES (calculated during render, NOT stored in state):
   * These counts and filtered lists automatically re-calculate whenever
   * `applications`, `searchTerm`, or `priorityFilter` change.
   */
  const totalApplications = applications.length;
  const interviewCount = applications.filter((app) => app.status === 'Interview').length;
  const offerCount = applications.filter((app) => app.status === 'Offer').length;

  // Filtered applications derived during render
  const filteredApplications = applications.filter((app) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      app.company.toLowerCase().includes(query) ||
      app.role.toLowerCase().includes(query);

    const matchesPriority =
      priorityFilter === 'All' || app.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="app-container">
      {/* Header with dynamically derived statistics */}
      <Header
        totalApplications={totalApplications}
        interviewCount={interviewCount}
        offerCount={offerCount}
      />

      <main className="main-content">
        {/* Controlled Form with Validation */}
        <ApplicationForm
          onAddApplication={handleAddApplication}
          existingApplications={applications}
        />

        {/* Filter & Search Bar */}
        <section className="filter-section">
          <div className="filter-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by company or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="priority-filter">
              <label htmlFor="filter-priority" className="filter-label">
                Priority:
              </label>
              <select
                id="filter-priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {(searchTerm || priorityFilter !== 'All') && (
            <p className="filter-info">
              Showing {filteredApplications.length} of {applications.length} applications
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSearchTerm('');
                  setPriorityFilter('All');
                }}
              >
                Reset filters
              </button>
            </p>
          )}
        </section>

        {/* Kanban Board with 4 Status Columns */}
        <Board
          applications={filteredApplications}
          onMoveStage={handleMoveStage}
          onReject={handleReject}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
