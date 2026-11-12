import React, { useState } from 'react';

function ApplicationForm({ onAddApplication, existingApplications }) {
  // Helper to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Form field states (controlled inputs)
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Applied');
  const [appliedOn, setAppliedOn] = useState(getTodayDate());
  const [priority, setPriority] = useState('Medium');

  // Error state for field validations
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const trimmedCompany = company.trim();
    const trimmedRole = role.trim();
    const todayStr = getTodayDate();

    // Company validation: required, 2-60 characters
    if (!trimmedCompany) {
      newErrors.company = 'Company name is required';
    } else if (trimmedCompany.length < 2 || trimmedCompany.length > 60) {
      newErrors.company = 'Company name must be between 2 and 60 characters';
    }

    // Role validation: required, 2-60 characters
    if (!trimmedRole) {
      newErrors.role = 'Role is required';
    } else if (trimmedRole.length < 2 || trimmedRole.length > 60) {
      newErrors.role = 'Role must be between 2 and 60 characters';
    }

    // Applied date validation: required, not in future
    if (!appliedOn) {
      newErrors.appliedOn = 'Applied date is required';
    } else if (appliedOn > todayStr) {
      newErrors.appliedOn = 'Applied date cannot be in the future';
    }

    // Priority validation
    if (!['Low', 'Medium', 'High'].includes(priority)) {
      newErrors.priority = 'Please select a valid priority';
    }

    // Status validation
    if (!['Applied', 'Interview', 'Offer', 'Rejected'].includes(status)) {
      newErrors.status = 'Please select a valid status';
    }

    // Duplicate check: reject same company and role (ignoring case)
    if (!newErrors.company && !newErrors.role) {
      const isDuplicate = existingApplications.some(
        (app) =>
          app.company.trim().toLowerCase() === trimmedCompany.toLowerCase() &&
          app.role.trim().toLowerCase() === trimmedRole.toLowerCase()
      );

      if (isDuplicate) {
        newErrors.company = 'An application for this role at this company already exists';
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear errors and submit new application
    setErrors({});
    const newApplication = {
      id: Date.now().toString(),
      company: company.trim(),
      role: role.trim(),
      status,
      appliedOn,
      priority,
    };

    onAddApplication(newApplication);

    // Reset form fields
    setCompany('');
    setRole('');
    setStatus('Applied');
    setAppliedOn(getTodayDate());
    setPriority('Medium');
  };

  return (
    <section className="form-card">
      <h2 className="form-title">Add New Job Application</h2>
      <form onSubmit={handleSubmit} noValidate className="application-form">
        <div className="form-grid">
          {/* Company field */}
          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input
              id="company"
              type="text"
              placeholder="e.g. Google, Stripe"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={errors.company ? 'input-error' : ''}
            />
            {errors.company && <span className="error-message">{errors.company}</span>}
          </div>

          {/* Role field */}
          <div className="form-group">
            <label htmlFor="role">Role *</label>
            <input
              id="role"
              type="text"
              placeholder="e.g. Software Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={errors.role ? 'input-error' : ''}
            />
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          {/* Applied Date field */}
          <div className="form-group">
            <label htmlFor="appliedOn">Applied On *</label>
            <input
              id="appliedOn"
              type="date"
              max={getTodayDate()}
              value={appliedOn}
              onChange={(e) => setAppliedOn(e.target.value)}
              className={errors.appliedOn ? 'input-error' : ''}
            />
            {errors.appliedOn && <span className="error-message">{errors.appliedOn}</span>}
          </div>

          {/* Priority field */}
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={errors.priority ? 'input-error' : ''}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priority && <span className="error-message">{errors.priority}</span>}
          </div>

          {/* Status field */}
          <div className="form-group">
            <label htmlFor="status">Initial Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={errors.status ? 'input-error' : ''}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            {errors.status && <span className="error-message">{errors.status}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            + Add Application
          </button>
        </div>
      </form>
    </section>
  );
}

export default ApplicationForm;
