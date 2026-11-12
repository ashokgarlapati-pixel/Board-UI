import React from 'react';
import Column from './Column';

const COLUMNS = [
  { id: 'Applied', title: 'Applied' },
  { id: 'Interview', title: 'Interview' },
  { id: 'Offer', title: 'Offer' },
  { id: 'Rejected', title: 'Rejected' },
];

function Board({ applications, onMoveStage, onReject, onDelete }) {
  return (
    <div className="board-container">
      {COLUMNS.map((col) => {
        const columnApps = applications.filter((app) => app.status === col.id);
        return (
          <Column
            key={col.id}
            status={col.id}
            title={col.title}
            applications={columnApps}
            onMoveStage={onMoveStage}
            onReject={onReject}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

export default Board;
