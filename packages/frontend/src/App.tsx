import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Paths } from '@/paths';
import { BigLoader } from '@/components/Loader';
import { PrivateLayout, PublicLayout } from '@/layouts';
import { FullScreenContainer } from '@/components/FullScreenContainer';
import './App.css';
import './index.css';
import '@/i18n';

const ErrorPage = lazy(() => import('@/pages/error'));
const HomePage = lazy(() => import('@/pages/home'));
const LoginPage = lazy(() => import('@/pages/login'));
const ProfilePage = lazy(() => import('@/pages/profile'));
const RegistrationPage = lazy(() => import('@/pages/registration'));
const UserPage = lazy(() => import('@/pages/user'));

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
    path: `${Paths.user}/:nickname`,
    element: <PublicLayout><UserPage /></PublicLayout>,
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
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true,
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FullScreenContainer>
        <Suspense fallback={<div className="w-screen flex justify-center"><BigLoader /></div>}>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </Suspense>
      </FullScreenContainer>
    </QueryClientProvider>
  );
}

export default App;
