import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
 
function App() {
  const [showFirstFields, setshowFirstFields] = useState(true)
  const [style, setStyle] = useState("first");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [gymID, setGymID] = useState("");
 
 
 
 
  const handleNextPage = () => {
    console.log("anu");
    setshowFirstFields(false);
    setStyle("second");
  }
 
  const handleRegistration = async () => {
    console.log("register")
    console.log(first_name + " " + last_name + " " + city);

    const requestBody = {
      "category_type" : categoryType,
      "city" : city,
      "country" : country,
      "birth_dt" : dob,
      "first_name" : first_name,
      "gym_id" : gymID,
      "last_name" : last_name,
      "pincode" : pincode,
      "state" : state
    }

    const response = await axios.post("http://localhost:5000/register", requestBody);
    console.log(response);
    if (response.status == 200){
      alert("Registration Successful");
      setCategoryType("");
      setCity("");
      setCountry("");
      setDob("");
      setFirstName("");
      setGymID("");
      setLastName("");
      setPincode("");
      setState("");
      handleBack();
    }
  }

  const handleBack = () => {
    console.log("back")
    setshowFirstFields(true);
    setStyle("first");
  }
 
  return (
    <div className="App">
      <form className={style}>
        {showFirstFields ? (
          <div>
            <h1>Register</h1>

            <div className='Field'>
              <label>First Name : </label>
              <input value={first_name}
                onChange={e => setFirstName(e.target.value)} />
            </div>
 
            <div className='Field'>
              <label>Last Name : </label>
              <input value={last_name}
                onChange={e => {
                  setLastName(e.target.value);
                  console.log(e.target.value)
                }
                }
              />
            </div>
 
            <div className='Field'>
              <label>Date of Birth : </label>
              <input value={dob}
                onChange={e => {
                  setDob(e.target.value);
                  console.log(e.target.value)
                }
                }
              />
            </div>
 
            <button type="button" onClick={handleNextPage} >Next Page</button>
 
          </div>
        ) : (
          <div id='secondPage'>
           
            <button id='backButton' onClick={handleBack}><i class="fa-solid fa-left-long fa-2x"></i></button>
            <h3>Please fill these additional details</h3>
 
            <div className='Field'>
              <label>Gym ID : </label>
              <select name='gymID' id='gymID' value={gymID} onChange={e => setGymID(e.target.value)}>
                <option value="" disabled selected hidden>Select an option</option>
                <option value="GYM01">GYM01</option>
                <option value="GYM02">GYM02</option>
                <option value="GYM03">GYM03</option>
                <option value="GYM04">GYM04</option>
                <option value="GYM05">GYM05</option>
                <option value="GYM06">GYM06</option>
                <option value="GYM07">GYM07</option>
                <option value="GYM08">GYM08</option>
                <option value="GYM09">GYM09</option>
                <option value="GYM10">GYM10</option>
              </select>
            </div>
 
            <div className='Field'>
              <label>Category Type : </label>
              <select name="categoryType" id="categoryType" value={categoryType} onChange = {e => setCategoryType(e.target.value)}>
                <option value="" disabled selected hidden>Select an option</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premuim</option>
              </select>
            </div>
 
            <div className='Field'>
              <label>City : </label>
              <input value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
 
            <div className='Field'>
              <label>State : </label>
              <input value={state}
                onChange={e => setState(e.target.value)}
              />
            </div>
 
            <div className='Field'>
              <label>Country : </label>
              <input value={country}
                onChange={e => setCountry(e.target.value)}
              />
            </div>
 
            <div className='Field'>
              <label>Pincode : </label>
              <input value={pincode}
                onChange={e => setPincode(e.target.value)}
              />
            </div>
 
 
 
            <button type='button' onClick={handleRegistration} >Register</button>
 
          </div>
        )}
      </form>
    </div>
  );
}
 
export default App;