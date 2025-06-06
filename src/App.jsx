import { useState } from "react";
import Login from "./pages/Login";
import Aside from "./components/Aside";
import NavBar from "./components/NavBar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Sucursales from "./pages/Sucursales";
import Personal from "./pages/Personal";
import Pedidos from "./pages/Pedidos";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Inventarios from "./pages/Inventarios";
import Predicciones from "./pages/Predicciones";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";

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
    <div className="min-h-screen bg-gray-100">
      <NavBar toggleMenu={toggleMenu} />
      <div className="flex flex-col md:flex-row mx-auto">
        <Aside openMenu={openMenu} />
        <main className="flex-1 p-4 overflow-auto min-h-screen bg-white">
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
          <Route path="/clientes" element={<Clientes />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/productos" element={<Productos />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/inventarios" element={<Inventarios />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/pedidos" element={<Pedidos />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/predicciones" element={<Predicciones />} />
        </Route>
      </Route>
    </Routes>
  );
}
