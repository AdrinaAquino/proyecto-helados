// components/ModalConfirmacion.jsx
import React from "react";

export default function ModalConfirmacion({
  mensaje,
  onConfirmar,
  onCancelar,
}) {
  return (
    <div className="fixed inset-0 bg-[#55555549] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <p className="mb-4 text-lg">{mensaje}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancelar}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
