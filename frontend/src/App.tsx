import React, { useEffect, useState } from 'react';
import { Sauna } from './types';

function App() {
  const [data, setData] = useState<Sauna[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/saunas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sauna List</h1>
      <ul>
        {data.map((sauna: Sauna) => (
          <li key={sauna.id}>
            {sauna.name} - {sauna.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
