import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ErrorPage, HomePage, LoginPage, ProfilePage, RegistrationPage, } from '@/pages';
import { Paths } from '@/paths';
import { PrivateLayout, PublicLayout } from '@/layouts';
import './App.css';
import './index.css';
import '@/i18n';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <PublicLayout><HomePage /></PublicLayout>,
  },
  {
    path: Paths.login,
    element: <PublicLayout><LoginPage /></PublicLayout>,
  },
  {
    path: Paths.profile,
    element: <PrivateLayout><ProfilePage /></PrivateLayout>,
  },
  {
    path: Paths.registration,
    element: <PublicLayout><RegistrationPage /></PublicLayout>,
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
