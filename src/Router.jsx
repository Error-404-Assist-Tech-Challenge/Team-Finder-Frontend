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
import MainPage from './pages/MainPage'

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
    element: <MainPage Content={MySkillsPage} />,
  },
  {
    path: '/projects',
    element: <MainPage Content={ProjectsPage}/>,
},
{
    path: '/organizationemployees',
    element: <MainPage Content={OrganizationEmployeesPage}/>,
  },
  {
    path: '/organizationdepartments',
    element: <MainPage Content={OrganizationDepartmentsPage}/>,

  },
  {
    path: '/organizationskills',
    element: <MainPage Content={OrganizationSkillsPage}/>,
  },
  {
    path: '/mydepartment',
    element: <MainPage Content={MyDepartment}/>,
  },
  {
    path: '/myprojects',
    element: <MainPage Content={MyProjects}/>,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}