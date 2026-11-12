import React from 'react';

function ApplicationCard({ application, onMoveStage, onReject, onDelete }) {
  const { id, company, role, status, appliedOn, priority } = application;

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the application for "${role}" at "${company}"?`
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  // Determine next stage label and availability
  let nextStageLabel = '';
  if (status === 'Applied') {
    nextStageLabel = 'Interview →';
  } else if (status === 'Interview') {
    nextStageLabel = 'Offer →';
  }

  // Priority color badge class
  const priorityClass = `badge priority-${priority.toLowerCase()}`;

  return (
    <div className="application-card">
      <div className="card-top">
        <span className={priorityClass}>{priority}</span>
        <button
          type="button"
          onClick={handleDelete}
          className="btn-icon delete-btn"
          title="Delete application"
          aria-label="Delete application"
        >
          ×
        </button>
      </div>

      <div className="card-content">
        <h3 className="card-role">{role}</h3>
        <p className="card-company">{company}</p>
        <p className="card-date">
          <span className="date-label">Applied:</span> {appliedOn}
        </p>
      </div>

      <div className="card-actions">
        {nextStageLabel && (
          <button
            type="button"
            className="btn btn-advance"
            onClick={() => onMoveStage(id)}
          >
            {nextStageLabel}
          </button>
        )}

        {status !== 'Rejected' && (
          <button
            type="button"
            className="btn btn-reject"
            onClick={() => onReject(id)}
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
}

export default ApplicationCard;
