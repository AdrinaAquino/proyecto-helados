import React, { useEffect, useState } from "react";
import TablaSucursales from "../components/TablaSucursales";
import AgregarSucursal from "../components/AgregarSucursal";
import { listaSucursales } from "../axios/sucursales/sucursales";

export default function Sucursales() {
  const [modalNuevoSucursal, setModalNuevoSucursal] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    listaSucursales()
      .then((rs) => setData(rs))
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div className=" py-4 md:flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          Administración de Sucursales
        </h2>
        <button
          className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600"
          onClick={() => setModalNuevoSucursal(true)}
        >
          <strong className="text-xl">+</strong> Nueva Sucursal
        </button>
      </div>
      <TablaSucursales data={data} setData={setData} />
      {modalNuevoSucursal && (
        <div className="fixed inset-0 bg-[#6563635d] flex items-center justify-center">
          <AgregarSucursal setModalNuevoSucursal={setModalNuevoSucursal} />
        </div>
      )}
    </div>
  );
}
