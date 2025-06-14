import React, { useEffect, useState } from "react";
import {
  listaPedidosSucursal,
  listaSucursales,
} from "../axios/pedidos/pedidos";
import TablaPedidos from "../components/TablaPedidos";
import AgregarPedido from "../components/AgregarPedido";

export default function Pedidos() {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
  const [modalNuevoPedido, setModalNuevoPedido] = useState(false);
  const [dataSucursales, setDataSucursales] = useState([]);
  const [dataPedido, setDataPedido] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const sucursales = await listaSucursales();
        setDataSucursales(sucursales);
        if (sucursales.length > 0) {
          const sucursalInicial =
            sucursales.find((s) => s.id_sucursal === 1) || sucursales[0];
          setSucursalSeleccionada(sucursalInicial.id_sucursal);
        }
      } catch (error) {
        console.error("Error cargando sucursales:", error);
      }
    };

    fetchSucursales();
  }, []);

  const fetchPedidos = async () => {
    if (!sucursalSeleccionada) return;
    setLoading(true);
    try {
      const pedidos = await listaPedidosSucursal(sucursalSeleccionada);
      setDataPedido(pedidos);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPedidos();
  }, [sucursalSeleccionada]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administración de Pedidos</h1>
      <div className="mb-6 shadow-lg p-4 bg-[#c69bce59] rounded-lg">
        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Sucursales...
          </p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Seleccione una Sucursal
            </h2>
            {dataSucursales
              .sort((a, b) => a.id_sucursal - b.id_sucursal)
              .map((sucursal, index) => (
                <button
                  key={index}
                  className={`m-2 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-105 ${
                    sucursalSeleccionada === sucursal.id_sucursal
                      ? "bg-purple-900 text-white font-bold scale-100 ring-4 ring-indigo-300"
                      : "bg-[#9c2bf9] text-white hover:bg-[#a45bb0]"
                  }`}
                  onClick={() => setSucursalSeleccionada(sucursal.id_sucursal)}
                >
                  <span>{sucursal.nombre}</span>
                </button>
              ))}
          </div>
        )}
      </div>
      <div className="mb-6 shadow-lg p-4 bg-[#c69bce59] rounded-lg">
        <div className=" md:flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-2 text-blue-600 ">
            Pedido de{" "}
            {sucursalSeleccionada
              ? dataSucursales.find(
                  (s) => s.id_sucursal === sucursalSeleccionada
                )?.nombre
              : "todas las sucursales"}
            🏪
          </h2>
          <button
            className="text-xl border-4 border-green-600 rounded-2xl bg-[#97f61b] font-bold  py-3 px-3  cursor-pointer hover:bg-[#efff89] hover:scale-103"
            onClick={() => setModalNuevoPedido(true)}
          >
            <strong className="text-2xl">+</strong> Nueva Pedido🍨
          </button>
        </div>

        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Pedidos...
          </p>
        ) : (
          <TablaPedidos pedidos={dataPedido} />
        )}
        {modalNuevoPedido && (
          <div className="fixed inset-0 z-50 bg-[#aea7b46d] flex items-center justify-center">
            <AgregarPedido
              setModalNuevoPedido={setModalNuevoPedido}
              sucursalSeleccionada={sucursalSeleccionada}
              sucursales={dataSucursales}
              onPedidoCreado={fetchPedidos}
            />
          </div>
        )}
      </div>
    </div>
  );
}
