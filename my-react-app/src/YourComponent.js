import React, { useState } from 'react';
import axios from './axiosConfig';   

function YourComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(1);  
  const [inputId, setInputId] = useState(''); 

  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/Get-Meth', {
        params: { id: inputId }  
      });
      setEmail(response.data.email);
      setPassword(response.data.password);
      console.log(response.data.email, response.data.password);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  
    fetchData();         
  };

  return (
    <div>
      <h1>Email and Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">Enter User ID:</label>
          <input
            type="number"
            id="userId"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}  
            placeholder="Enter ID"
          />
        </div>
        <button type="submit">Fetch User Data</button>
      </form>

      <div>
        {email && <p>Email: {email}</p>}
        {password && <p>Password: {password}</p>}
      </div>
    </div>
  );
}

export default YourComponent;
