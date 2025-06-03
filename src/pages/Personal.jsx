import React from "react";
import TablaPersonal from "../components/TablaPersonal";

export default function Personal() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administración de Personal</h1>
      <div className="mb-6 shadow-lg p-4 bg-[#c69bce59] rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Seleccione una Sucursal</h2>
        <button className="bg-[#9c2bf9] text-white m-2 px-4 py-2 rounded-md hover:bg-[#a45bb0] cursor-pointer">
          <span>Sucursal Sur</span>
        </button>
        <button className="bg-[#9c2bf9] text-white m-2 px-4 py-2 rounded-md hover:bg-[#a45bb0] cursor-pointer">
          <span>Sucursal Norte</span>
        </button>
        <button className="bg-[#9c2bf9] text-white m-2 px-4 py-2 rounded-md hover:bg-[#a45bb0] cursor-pointer">
          <span>Sucursal Este</span>
        </button>
      </div>
      <div className="mb-6 shadow-lg p-4 bg-[#c69bce59] rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Personal de Sucursal Sur</h2>
        <TablaPersonal />
      </div>
    </div>
  );
}
