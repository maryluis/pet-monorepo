import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegistrationPage, HomePage } from '@/Pages';
import { Paths } from '@/Paths';
import './App.css';

// interface IServerResponse {
//   message: string;
// }

function App() {
  // useEffect(() => {
  //   fetch('http://localhost:3001')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       console.log('checking');
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError('Error fetching data');
  //       setLoading(false);
  //     });
  // }, []);

  // const createUser = async() => {
  //   const userData = {
  //     id: '123',
  //     nickName: 'JohnDoe',
  //     name: 'John',
  //     password: 'password123',
  //     confirmPassword: 'password123'
  //   };

  //   try {
  //     const response = await fetch('http://localhost:3001/create-user', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData), // перетворюємо об'єкт в JSON
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('User created successfully:', data);
  //     } else {
  //       const errorData = await response.json();
  //       console.log('Error:', errorData.error);
  //     }
  //   } catch (error) {
  //     console.error('Request failed:', error);
  //   }
  // };

  return (
    <Router>
      <Routes>
        <Route path={Paths.home} element={<HomePage />} />
        <Route path={Paths.registration} element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
