import React, { useState } from "react";
import Login from "./pages/Login";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Sucursales from "./pages/Sucursales";
import Personal from "./pages/Personal";
import Pedidos from "./pages/Pedidos";
import Inventarios from "./pages/Inventarios.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function DashboardLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    if (openMenu) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  };
  return (
    <div>
      <NavBar toggleMenu={toggleMenu} />
      <div className="md:flex">
        <Aside openMenu={openMenu} />
        <main className="flex-1 m-4">
          {" "}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<DashboardLayout />}>
        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/" element={<Navigate to="/sucursales" replace />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/personal" element={<Personal />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/pedidos" element={<Pedidos />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/inventarios" element={<Inventarios />} />
        </Route>
      </Route>
    </Routes>
  );
}
