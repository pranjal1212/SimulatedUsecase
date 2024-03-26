import React, { useState } from 'react';
import axios from 'axios';
import './Log.css';

const Login = ({handleRegister}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    //const [userData, setUserData] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { firstName, lastName, dob, pincode });
            const { success, message} = response.data;
            if (success) {
                // Login successful, do something with user_data
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
                <label>Date of Birth:</label>
                <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} required />
                <label>Pincode:</label>
                <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p className='log'>New account?  <a href='#' onClick={() => handleRegister()}>Register</a></p>
            {message && <p>{message}</p>}
        </div>
    );
};
export default Login;