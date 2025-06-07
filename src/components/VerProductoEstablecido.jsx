import React from "react";

export default function VerProductoEstablecido({
  setModalAbierto,
  productoestablecido,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
        <div className="flex justify-between items-center bg-[#89408d] text-white p-3">
          <h2 className="text-xl font-bold">
            Detalles de la Producto Establecido
          </h2>
          <button
            onClick={() => setModalAbierto(null)}
            className=" text-white hover:font-bold w-7 h-7 bg-red-600 rounded-full cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="space-y-2 p-6">
          <p>
            <span className="font-semibold">Producto:</span>{" "}
            {productoestablecido.nombre}
          </p>
          <p>
            <span className="font-semibold">Descripción:</span>{" "}
            {productoestablecido.descripcion}
          </p>
          <p>
            <span className="font-semibold">Precio:</span>{" "}
            {productoestablecido.precio_unitario} Bs
          </p>
          <p>
            <span className="font-semibold">Es helado?:</span>{" "}
            {productoestablecido.es_helado === true ? "Si" : "No"}
          </p>
          <p>
            <span className="font-semibold">Id del Producto:</span>{" "}
            {productoestablecido.id_producto_establecido}
          </p>
        </div>
      </div>
    </div>
  );
}
