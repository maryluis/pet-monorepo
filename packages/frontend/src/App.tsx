import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface IServerResponse {
  message: string;
}

function App() {
  const [data, setData] = useState<IServerResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Отримуємо дані з бекенду за допомогою fetch
    fetch('http://localhost:3001') // Переконайся, що бекенд працює на цьому порту
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Перетворюємо відповідь в JSON
      })
      .then((data) => {
        setData(data); // Записуємо отримані дані в state
        setLoading(false); // Оновлюємо статус завантаження
      })
      .catch(() => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {loading && <div>Loading...</div>}
        {error && <div>Error from backend</div>}
        {data?.message &&
          <div>
            <h1>Data from Backend:</h1>
            <p>{data?.message}</p>
          </div>
        }
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
