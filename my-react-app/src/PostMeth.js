import React, { useState } from 'react';
import axios from './axiosConfig'; // your custom axios with baseURL etc.

function PostMeth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const response = await axios.post('/api/Post-Meth', {
        email,
        password
      });
      setResponseMessage(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <h2>Response from Backend:</h2>
      <p>{responseMessage}</p>
    </div>
  );
}

export default PostMeth;
