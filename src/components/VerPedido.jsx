import React from "react";

export default function VerPedido({ setModalAbierto, pedidos }) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
        <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
          <div className="flex justify-between items-center bg-[#89408d] text-white p-3">
            <h2 className="text-xl font-bold">Detalles del Pedido</h2>
            <button
              onClick={() => setModalAbierto(null)}
              className=" text-white hover:font-bold w-7 h-7 bg-red-600 rounded-full cursor-pointer"
            >
              X
            </button>
          </div>
          <div className="space-y-2 p-6">
            <p>
              <span className="font-semibold">Id Pedido:</span>{" "}
              {pedidos.id_pedido}
            </p>
            <p>
              <span className="font-semibold">Fecha Y Hora del Pedido:</span>{" "}
              {new Date(pedidos.fecha_pedido).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Personal que Atendio:</span>{" "}
              {pedidos.nombre_personal || "null"}
            </p>
            <p>
              <span className="font-semibold">Nombre de la Sucursal:</span>{" "}
              {pedidos.nombre_sucursal}
            </p>
            <p>
              <span className="font-semibold">Nombre del Cliente:</span>{" "}
              {pedidos.nombre_cliente || "null"}
            </p>
            <p>
              <span className="font-semibold">Estado:</span> {pedidos.estado}
            </p>
            <p>
              <span className="font-semibold">Metodo de Pago:</span>{" "}
              {pedidos.metodo_pago}
            </p>
            <p>
              <span className="font-semibold">Tipo de Producto:</span>{" "}
              {pedidos.detalles?.[0]?.tipo_producto || "Sin producto"}
            </p>
            <p>
              <span className="font-semibold">Nombre del Producto:</span>{" "}
              {pedidos.detalles?.[0]?.nombre_producto || "S/N"}
            </p>
            <p>
              <span className="font-semibold">Cantidad:</span>{" "}
              {pedidos.detalles?.[0]?.cantidad}
            </p>
            <p>
              <span className="font-semibold">Precio Unitario:</span>{" "}
              {pedidos.detalles?.[0]?.precio_unitario || "S/P"}
            </p>
            <p>
              <span className="font-semibold">Precio Subtotal:</span>{" "}
              {pedidos.detalles?.[0]?.subtotal}
            </p>
            <p>
              <span className="font-semibold">Total:</span> {pedidos.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
