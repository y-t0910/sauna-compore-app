import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/saunas`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Sauna List</h1>
      <ul>
        {data.map((sauna: any) => (
          <li key={sauna.id}>
            {sauna.name} - {sauna.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
