import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RegistrationPage, HomePage, LoginPage, ErrorPage } from '@/Pages';
import { Paths } from '@/Paths';
import './App.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <HomePage />,
  },
  {
    path: Paths.login,
    element: <LoginPage />,
  },
  {
    path: Paths.registration,
    element: <RegistrationPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_partialHydration: true,
    v7_startTransition: true,
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true,
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    <div
      className="grid w-screen h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
      style={{
        gridTemplateRows: '50px 1fr 50px',
      }}
    >
      <div className="w-full h-full bg-green-200" />
      <div className="flex flex-col justify-center items-center h-full">
        <RouterProvider router={router} />
      </div>
      <div className="w-full h-full bg-green-200" />
    </div>
  );
}

export default App;
