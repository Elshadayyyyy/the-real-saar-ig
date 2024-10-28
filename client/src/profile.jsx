import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null); // State for storing the image file

    const fetchUserProfile = async () => {
        const response = await axios.get('http://localhost:3001/api/users/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setUser(response.data);
        setName(response.data.name || '');
        setEmail(response.data.email || '');
        // Optionally set the photo URL if available
        setPhoto(response.data.photo || null);
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (photo) {
            formData.append('photo', photo); // Append the photo file
        }

        try {
            await axios.put('http://localhost:3001/api/users/me', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchUserProfile(); // Refresh user data
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ marginBottom: '1rem' }}>Your Profile</h1>
            {user ? (
                <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {photo && <img src={URL.createObjectURL(photo)} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                    />
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])} // Handle the file input
                        accept="image/*"
                        style={{ padding: '0.5rem', border: '1px solid #ced4da', borderRadius: '4px' }}
                    />
                    <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                        Update Profile
                    </button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
