
import React, { useEffect, useState } from 'react';
import './UserList.css';
import ViewProfile from './ViewProfile';
import EditProfile from './EditProfile';
const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [viewUser, setViewUser] = useState(null);
    const [editUser, setEditUser] = useState(null);

    const getUsers = async () => {
        const response = await fetch('http://localhost:8082/api/get-users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                console.log(data);
                setUsers(data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        };

        fetchUsers();
    }, []);

    const handleView = (user) => {
        setViewUser(user);
    };

    const handleEdit = (user) => {
        setEditUser(user);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`http://localhost:8082/api/delete-user?id=${userId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setUsers(users.filter(user => user.id !== userId));
                    console.log(`Deleted user with ID: ${userId}`);
                } else {
                    console.error('Failed to delete user');
                }
            } catch (error) {
                console.error("There was an error deleting the user!", error);
            }
        }
    };

    const handleSave = async (updatedUser) => {
        // Call your API to update the user
        const response = await fetch(`http://localhost:8082/api/update-user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            const updatedUsers = users.map(user => 
                user.id === updatedUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
            setEditUser(null); // Close edit form
        } else {
            console.error('Failed to update user');
        }
    };

    return (
        <div className="user-list">
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <p><span>Name:</span> {user.fullName}</p>
                        <p><span>Email:</span> {user.email}</p>
                        <button onClick={() => handleView(user)}>View Profile</button>
                        <button onClick={() => handleEdit(user)}>Edit Profile</button>
                        <button onClick={() => handleDelete(user.id)}>Delete User</button>
                    </li>
                ))}
            </ul>

            {/* Conditional rendering for View Profile */}
            {viewUser && (
                <div className="modal">
                    <ViewProfile user={viewUser} onClose={() => setViewUser(null)} />
                </div>
            )}

            {/* Conditional rendering for Edit Profile */}
            {editUser && (
                <div className="modal">
                    <EditProfile 
                        user={editUser} 
                        onSave={handleSave} 
                        onCancel={() => setEditUser(null)} 
                    />
                </div>
            )}
        </div>
    );
};

export default UsersList;
