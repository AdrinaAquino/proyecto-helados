import React, { useState } from "react";
import EditarPedido from "./EditarPedido";
import VerPedido from "./VerPedido";

export default function TablaPedidos({ pedidos }) {
  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [pedidoVer, setPedidoVer] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState("");

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const coincideNombre = (pedido.nombre_cliente || "")
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());

    return coincideNombre;
  });

  return (
    <>
      <div className="flex-wrap">
        <input
          type="text"
          placeholder="Nombre del Cliente"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="border-2 border-[#8d127b] rounded px-3 py-1 m-2"
        />
      </div>
      <div className="overflow-x-auto p-4 ">
        <div className="shadow-lg ">
          <table className="min-w-full bg-white overflow-hidden rounded-lg">
            <thead className="bg-[#89408d] text-white">
              <tr>
                <th className="py-2 px-4 ">Id Pedido</th>
                <th className="py-2 px-4">Nombre del Producto</th>
                <th className="py-2 px-4">Nombre Cliente</th>
                <th className="py-2 px-4">Total a Cancelar</th>
                <th className="py-2 px-4">Estado</th>
                <th className="py-2 px-4">Metodo de Pago</th>
                <th className="py-2 px-4">Fecha de Pedido</th>
                <th className="py-2 px-4">Hora de Pedido</th>
                <th className="py-2 px-4">Nombre del Personal</th>
                <th className="py-2 px-4">Nombre Sucursal</th>
                <th className="py-2 px-4">Opciones</th>
              </tr>
            </thead>
            {pedidosFiltrados.map((pedido, index) => {
              return (
                <tbody key={index}>
                  <tr className="border-b border-gray-200 hover:bg-gray-100 text-center">
                    <td className="py-2 px-4">{pedido.id_pedido}</td>
                    <td className="py-2 px-4">
                      <div>
                        {pedido.detalles?.map((detalle, index) => (
                          <div key={index}>
                            {detalle.tipo_producto === "Establecido"
                              ? detalle.nombre_producto
                              : detalle.producto_personalizado
                                  ?.nombre_personalizado}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      {pedido.nombre_cliente || "S/N"}
                    </td>
                    <td className="py-2 px-4">
                      {pedido.total} {" Bs"}
                    </td>

                    <td className="py-2 px-4">
                      <span
                        className={
                          pedido.estado === "Pendiente"
                            ? "bg-red-100 text-red-800 font-semibold px-2 py-1 rounded"
                            : "bg-green-100 text-green-800 font-semibold px-2 py-1 rounded"
                        }
                      >
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="py-2 px-4">{pedido.metodo_pago}</td>
                    <td className="py-2 px-4">
                      {new Date(pedido.fecha_pedido).toLocaleDateString()}
                    </td>

                    <td className="py-2 px-4">
                      {new Date(pedido.fecha_pedido).toLocaleTimeString(
                        "es-BO",
                        { timeStyle: "short" }
                      )}
                    </td>
                    <td className="py-2 px-4">{pedido.nombre_personal}</td>
                    <td className="py-2 px-4">{pedido.nombre_sucursal}</td>

                    <td className="py-2 px-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer hover:text-black hover:scale-110"
                          onClick={() => setPedidoVer(pedido)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
                        <button
                          className="bg-orange-400 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-orange-500 hover:text-black hover:scale-110"
                          onClick={() => setPedidoEditar(pedido)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          {pedidoVer && (
            <VerPedido setModalAbierto={setPedidoVer} pedidos={pedidoVer} />
          )}
          {pedidoEditar && (
            <div className="fixed inset-0 bg-[#aea7b46d] flex items-center justify-center">
              <EditarPedido
                setModalAbierto={setPedidoEditar}
                pedido={pedidoEditar}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
