import React from 'react';
import './App.css';

export default function GenerateContact({ id, img, name = "Contact Name", onClick }) {
    const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();

    return (
        <div className="contact-card" onClick={onClick}>
            {img ? (
                <img src={img} className="circle-image" alt="contact" />
            ) : (
                <div className="placeholder-image circle-image">
                    <span className="initials">{initials}</span>
                </div>
            )}
            <p className="contact-name">{name}</p>
        </div>
    );
}