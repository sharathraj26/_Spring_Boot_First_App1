import React, { useState } from 'react';
import axios from './axiosConfig';

function YourComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputId, setInputId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setError('');
    setLoading(true);
    setEmail('');
    setPassword('');
    try {
      const response = await axios.get('/api/Get-Meth', {
        params: { id: inputId },
      });
      setEmail(response.data.email);
      setPassword(response.data.password);
      console.log(response.data.email, response.data.password);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div id="user-fetch-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 id="user-title">Fetch User Data</h2>
      <form onSubmit={handleSubmit} id="user-form">
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="Enter ID"
            required
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <button type="submit" disabled={!inputId || loading}>
          {loading ? 'Loading...' : 'Fetch User Data'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div id="user-data-display" style={{ marginTop: '20px' }}>
        {email && <p>Email: <strong>{email}</strong></p>}
        {password && <p>Password: <strong>{password}</strong></p>}
      </div>
    </div>
  );
}

export default YourComponent;
