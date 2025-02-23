import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/login";
import { AdminDashboard } from "../pages/AdminDashboard";
import { PrivateRoute, PublicRoute } from "./routeGuardMiddleware";

export const AppRoutes = () => {
  return (
    <Routes>
       <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};
