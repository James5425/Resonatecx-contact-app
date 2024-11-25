import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import GenerateContact from './generateContact';
import './App.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((newContacts) => {
        const formattedContacts = newContacts.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          website: user.website,
          location: user.location,
          company: user.company
        }));
        setContacts(formattedContacts);
      })
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddContact = () => {
    alert('Add contact button clicked');
  };

  const handleContactClick = (contact) => {
    navigate(`/contact/${contact.id}`, { state: { contact } });
  };

  const filteredContacts = contacts
    .filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="App">
      <h1>James Kosinar's Contacts Application</h1>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="contacts-container">
        {filteredContacts.map(contact => (
          <GenerateContact key={contact.id} {...contact} onClick={() => handleContactClick(contact)} />
        ))}
      </div>
      <button className="add-button" onClick={handleAddContact}>+</button>
    </div>
  );
}