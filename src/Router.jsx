import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpAdminPage from "./pages/SignUpAdmin";
import LoginPage from "./pages/Login";
import MySkillsPage from "./pages/MySkills";
import ProjectsPage from "./pages/Projects";
import OrganizationSkillsPage from "./pages/OrganizationSkills";
import OrganizationEmployeesPage from './pages/OrganizationEmployees';
import OrganizationDepartmentsPage from './pages/OrganizationDepartments';
import MyDepartment from './pages/MyDepartment';
import MyProjects from './pages/MyProjects'

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
    path: '/projects',
    element: <ProjectsPage />,
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
  },
  {
    path: '/mydepartment',
    element: <MyDepartment />,
  },
  {
    path: '/myprojects',
    element: <MyProjects />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}