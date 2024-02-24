import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import MySkillsPage from "./pages/MySkillsPage";
import MyProjectsPage from "./pages/MyProjectsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="skills" element={<MySkillsPage />} />
          <Route path="projects" element={<MyProjectsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}