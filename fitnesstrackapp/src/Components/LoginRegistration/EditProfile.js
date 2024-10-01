// EditProfile.js
import React, { useState} from 'react';

const EditProfile = ({ user, onSave, onCancel }) => {
    const [fullName, setFullName] = useState(user.fullName);
    const [email, setEmail] = useState(user.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, fullName, email };
        await onSave(updatedUser); // Call the save function from parent
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditProfile;
