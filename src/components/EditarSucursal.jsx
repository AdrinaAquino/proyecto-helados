import React from "react";

export default function EditarSucursal({ handleEditarSucursal }) {
  return (
    <>
      <div className="w-100 border border-gray-300 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between items-center bg-[#89408d] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Editar Sucursal</h2>
          <button
            className="w-7 border rounded-full bg-[#e36161] hover:bg-[#e36161cd] cursor-pointer"
            onClick={handleEditarSucursal}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4">
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#89408d]"
            placeholder="Nombre de la sucursal"
          />

          <label className="block text-sm font-medium mb-2">Ubicación</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#89408d]"
            placeholder="Ubicación de la sucursal"
          />

          <label className="block text-sm font-medium mb-2">Teléfono</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#89408d]"
            placeholder="Número de teléfono"
          />

          <label className="block text-sm font-medium mb-2">
            Horario Apertura
          </label>
          <input
            type="time"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#89408d]"
            placeholder="Horario de apertura"
          />

          <label className="block text-sm font-medium mb-2">
            Horario Cierre
          </label>
          <input
            type="time"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
focus:ring-2 focus:ring-[#89408d]"
            placeholder="Horario de cierre"
          />
          <div className="flex justify-end mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
