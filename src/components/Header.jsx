import React from 'react';

function Header({ totalApplications, interviewCount, offerCount }) {
  const offerText = offerCount === 1 ? '1 offer' : `${offerCount} offers`;
  const interviewText = interviewCount === 1 ? '1 interview' : `${interviewCount} interviews`;
  const appText = totalApplications === 1 ? '1 application' : `${totalApplications} applications`;

  return (
    <header className="app-header">
      <div className="header-brand">
        <h1 className="logo-title">JobTrackr</h1>
        <p className="logo-subtitle">Your personal job hunt dashboard</p>
      </div>

      <div className="header-stats">
        <span className="stats-pill">
          {appText} · {interviewText} · {offerText}
        </span>
      </div>
    </header>
  );
}

export default Header;
