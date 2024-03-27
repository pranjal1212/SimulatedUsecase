import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    const[gymid,setGymId] = useState([]);
    const[selectedGym,setSelectedGym]=useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { firstName, lastName, dob, pincode });
            const { success, message,gym_id} = response.data;
            if (success) {
                // Login successful
                setMessage(message);
                setGymId(gym_id);

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
            {gymid.length>0 && (
                <div className='select-gym'>
                    <label>Select Gym:</label>
                    <select value={selectedGym} onChange={(e) => setSelectedGym(e.target.value)}required>
                        <option value="">Select Gym</option>
                        {gymid.map(gymId=> (
                            <option key={gymId} value={gymId}>{gymId}</option>
                        ))}
                    </select>
                    </div>
            )}
        </div>
    );
};
export default Login;