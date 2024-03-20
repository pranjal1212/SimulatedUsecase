import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { firstName, lastName, dob, pincode });
            const { success, message, user_data } = response.data;
            if (success) {
                // Login successful, do something with user_data
                setUserData(user_data);
                setMessage(message);

            } else {
                setUserData(null);
                setMessage(message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <label>Date of Birth:</label>
                <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} required />
                <label>Pincode:</label>
                <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            {userData && (
                <div>
                    <h3>User Data:</h3>
                    <p>First Name: {userData.first_name}</p>
                    <p>Last Name: {userData.last_name}</p>
                    <p>Date of Birth: {userData.birth_dt}</p>
                </div>)}
        </div>
    );
};
export default Login;