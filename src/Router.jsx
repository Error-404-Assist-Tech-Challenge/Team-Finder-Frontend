import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpAdminPage from "./pages/SignUpAdminPage";
import LoginPage from "./pages/LoginPage";
import MySkillsPage from "./pages/MySkillsPage";
import MyProjectsPage from "./pages/MyProjectsPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpAdminPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/skills',
    element: <MySkillsPage />,
  },
  {
    path: '/projects',
    element: <MyProjectsPage />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}