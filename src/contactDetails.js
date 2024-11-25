import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

export default function ContactDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state;

  if (!contact) {
    return <div className="error-message">Contact not found</div>;
  }

  const initials = contact.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleEditClick = () => {
    alert('Edit button clicked');
  };

  return (
    <div className="contact-details-container">
      <div className="top-strip">
        <button className="back-button" onClick={handleBackClick}>&lt; Back</button>
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
      </div>

      <div className="profile-section">
        {contact.img ? (
          <img src={contact.img} className="profile-image" alt="Profile" />
        ) : (
          <div className="placeholder-image">
            <span className="initials">{initials}</span>
          </div>
        )}
        <h2>{contact.name}</h2>
        <p>📞 {contact.phone || 'N/A'}</p>
        <p>✉️ {contact.email || 'N/A'}</p>
      </div>

      <div className="additional-info">
        <div className="info-box">
          <h3>Address</h3>
          {contact.address ? (
            <>
              <p>{contact.address.street || 'N/A'}, {contact.address.suite || ''}</p>
              <p>{contact.address.city || 'N/A'}, {contact.address.zipcode || 'N/A'}</p>
            </>
          ) : (
            <p>No address available</p>
          )}
        </div>
        <div className="info-box">
          <h3>Company</h3>
          {contact.company ? (
            <>
              <p><strong>{contact.company.name}</strong></p>
              <p>🌐 <a href={`https://${contact.website}`} target="_blank" rel="noopener noreferrer">
                {contact.website || 'N/A'}
              </a></p>
            </>
          ) : (
            <p>No company information available</p>
          )}
        </div>
      </div>
    </div>
  );
}