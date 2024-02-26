import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpAdminPage from "./pages/SignUpAdminPage";
import LoginPage from "./pages/LoginPage";
import MySkillsPage from "./pages/MySkillsPage";
import MyProjectsPage from "./pages/MyProjectsPage";
import OrganizationSkillsPage from "./pages/OrganizationSkillsPage";
import OrganizationEmployeesPage from './pages/OrganizationEmployeesPage';
import OrganizationDepartmentsPage from './pages/OrganizationDepartmentsPage';

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
    path: '/organizationemployees',
    element: <OrganizationEmployeesPage />,
  },
  {
    path: '/organizationdepartments',
    element: <OrganizationDepartmentsPage />,
  },
  {
    path: '/organizationskills',
    element: <OrganizationSkillsPage />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}