import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpAdminPage from "./pages/SignUpAdminPage";
import LoginPage from "./pages/LoginPage";
import MySkillsPage from "./pages/MySkillsPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import OrganizationSkillsPage from "./pages/OrganizationSkillsPage";

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
    path: '/myskills',
    element: <MySkillsPage />,
  },
  {
    path: '/myprojects',
    element: <MyProjectsPage />,
  },
  {
    path: '/organizationskills',
    element: <OrganizationSkillsPage />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}