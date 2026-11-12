import React from 'react';
import ApplicationCard from './ApplicationCard';

function Column({ title, status, applications, onMoveStage, onReject, onDelete }) {
  return (
    <div className={`board-column column-${status.toLowerCase()}`}>
      <div className="column-header">
        <h2 className="column-title">{title}</h2>
        <span className="column-count">{applications.length}</span>
      </div>

      <div className="column-cards">
        {applications.length === 0 ? (
          <p className="empty-column-message">Nothing here yet</p>
        ) : (
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onMoveStage={onMoveStage}
              onReject={onReject}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;
