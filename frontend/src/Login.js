import React, {useState } from 'react';
import axios from 'axios';
import './App.css';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { firstName, lastName, dob, pincode });
            console.log(response)
            const { success, message} = response.data;
            if (success) {
                // Login successful
                setMessage(message);
            } else {
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
                <label>Date of Birth(MM/DD/YYYY):</label>
                <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} required />
                <label>Pincode:</label>
                <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
export default Login;