import React,{useState} from "react";
import './Log.css';
import { useLocation,useNavigate } from "react-router-dom";

const SelectGym = () => {
    const[selectedGym,setSelectedGym]=useState('');
    const location = useLocation();
    const gymIds = location.state?.gymIds || [];
    const navigate=useNavigate();

    if (!gymIds && gymIds.length===0){
        return (<div className="gym-message">No gym IDs available</div>);
    }
 
    const handleLogin = () => {
        navigate('/HomePage')
    };

    return (
        <form onSubmit={handleLogin}>
        <div className='select-gym'>
                    <label>Select Gym:</label>
                    <select value={selectedGym} onChange={(e) => setSelectedGym(e.target.value)}required>
                        <option value="">Select Gym</option>
                        {gymIds.map(gymId=> (
                            <option key={gymId} value={gymId}>{gymId}</option>
                        ))}
                    </select>
                    <button>Submit</button>
                    </div>
            </form>
    )
}
export default SelectGym;