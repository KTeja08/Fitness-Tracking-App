// ViewProfile.js
import React from 'react';

const ViewProfile = ({ user, onClose }) => {
    return (
        <div className="view-profile">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {user.fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {/* <p><strong>Additional Info:</strong> Add any additional user information here</p> */}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ViewProfile;
