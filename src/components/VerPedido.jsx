import React from "react";

export default function VerPedido({ setModalAbierto, pedidos }) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
        <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
          <div className="flex justify-between bg-[#3bb48b] rounded-t-lg text-xl text-white font-bold p-2">
            <h2 className="text-xl font-bold">Detalles del Pedido</h2>
            <button
              onClick={() => setModalAbierto(null)}
              className=" w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            >
              X
            </button>
          </div>
          <div className="space-y-2 p-6 overflow-y-auto max-h-[70vh]">
            <p>
              <span className="font-semibold">Id Pedido:</span>{" "}
              {pedidos.id_pedido}
            </p>
            <p>
              <span className="font-semibold">Fecha y Hora del Pedido:</span>{" "}
              {new Date(pedidos.fecha_pedido).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Personal que Atendió:</span>{" "}
              {pedidos.nombre_personal || "null"}
            </p>
            <p>
              <span className="font-semibold">Sucursal:</span>{" "}
              {pedidos.nombre_sucursal}
            </p>
            <p>
              <span className="font-semibold">Cliente:</span>{" "}
              {pedidos.nombre_cliente || "null"}
            </p>
            <p>
              <span className="font-semibold">Estado:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  pedidos.estado === "Pendiente"
                    ? " text-red-800"
                    : " text-green-800"
                }`}
              >
                {pedidos.estado}
              </span>
            </p>
            <p>
              <span className="font-semibold">Método de Pago:</span>{" "}
              {pedidos.metodo_pago}
            </p>

            <hr className="my-2" />

            <h3 className="text-lg font-semibold text-purple-700">
              Productos:
            </h3>
            {pedidos.detalles?.map((detalle, index) => (
              <div
                key={detalle.id_detalle_pedido}
                className="mb-4 border border-gray-300 p-3 rounded-md bg-gray-50"
              >
                <p>
                  <span className="font-semibold">
                    {index + 1}. Tipo de Producto:
                  </span>{" "}
                  {detalle.tipo_producto}
                </p>

                {detalle.tipo_producto === "Establecido" ? (
                  <div>
                    <div>
                      <span className="font-semibold">
                        Nombre del Producto:
                      </span>
                      <br />
                      <div className="flex items-center">
                        <img src="helado1.png" alt="" className="h-3" />
                        {"-"}{" "}
                        <span className="text-green-600 font-semibold">
                          {detalle.nombre_producto}
                        </span>
                      </div>
                    </div>
                    <p>
                      <span className="font-semibold">Cantidad:</span>{" "}
                      {detalle.cantidad}
                    </p>
                    <p>
                      <span className="font-semibold">Subtotal:</span> Bs.{" "}
                      {detalle.subtotal}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span className="font-semibold">
                        Nombre del Producto Personalizado:
                      </span>{" "}
                      {detalle.producto_personalizado?.nombre_personalizado}
                    </p>

                    <div>
                      <p className="font-semibold">Materias Primas:</p>
                      <ul className="text-green-600 font-semibold">
                        {detalle.producto_personalizado?.detalles?.map(
                          (mp, i) => (
                            <li key={i}>
                              <div className="flex items-center">
                                <img src="helado1.png" alt="" className="h-3" />
                                {"-"}
                                {mp.nombre_materia} - {mp.cantidad} {mp.unidad}{" "}
                                - (Precio: {mp.subtotal})
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <p>
                      <span className="font-semibold">Subtotal:</span>{" "}
                      {detalle.subtotal}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <hr className="my-2" />
            <p>
              <span className="font-bold">Total: Bs. {pedidos.total}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
