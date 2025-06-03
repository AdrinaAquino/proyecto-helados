import React, { useState } from "react";
import Login from "./pages/Login";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Sucursales from "./pages/Sucursales";
import Personal from "./pages/Personal";
import Pedidos from "./pages/Pedidos";
import Inventarios from "./pages/Inventarios.jsx";

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
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/sucursales" replace />} />
        <Route path="/sucursales" element={<Sucursales />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/inventarios" element={<Inventarios />} />
      </Route>
    </Routes>
  );
}
