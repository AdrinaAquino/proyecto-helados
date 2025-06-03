import React, { useState } from "react";
import TablaSucursales from "../components/TablaSucursales";
import AgregarSucursal from "../components/AgregarSucursal";

export default function Sucursales() {
  const [modalNuevoSucursal, setModalNuevoSucursal] = useState(false);
  const handleNuevoSucursal = () => {
    setModalNuevoSucursal(!modalNuevoSucursal);
  };
  return (
    <div>
      <div className=" py-4 md:flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          Administración de Sucursales
        </h2>
        <button
          className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600"
          onClick={handleNuevoSucursal}
        >
          <strong className="text-xl">+</strong> Nueva Sucursal
        </button>
      </div>
      <TablaSucursales />
      {modalNuevoSucursal && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#6563635d] flex items-center justify-center">
          <AgregarSucursal handleNuevoSucursal={handleNuevoSucursal} />
        </div>
      )}
    </div>
  );
}
