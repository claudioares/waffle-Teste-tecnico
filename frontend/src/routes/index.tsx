import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/login";
import { AdminDashboard } from "../pages/AdminDashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};
