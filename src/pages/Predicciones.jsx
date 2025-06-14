import React, { useEffect, useState } from "react";
import {
  listaProductosEstablecidos,
  prediccionesDemanda,
  prediccionesRiesgoStock,
  prediccionesTendencias,
} from "../axios/predicciones/predicciones";
import DashboardTendencia from "../components/DashboardTendencia";

export default function Predicciones() {
  const [dataTendencia, setDataTendencia] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
  const [dataDemanda, setDataDemanda] = useState(1);
  const [dataRiesgoStock, setDataRiesgoStock] = useState([]);
  const [idProducto, setIdProducto] = useState(1);
  const [loadingTendencia, setLoadingTendencia] = useState(true);
  const [loadingDemanda, setLoadingDemanda] = useState(false);
  const [loadingRiesgoStock, setLoadingRiesgoStock] = useState(true);

  useEffect(() => {
    setLoadingTendencia(true);
    prediccionesTendencias()
      .then((rs) => setDataTendencia(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingTendencia(false));
  }, []);

  useEffect(() => {
    listaProductosEstablecidos()
      .then((rs) => setDataProductos(rs))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setLoadingRiesgoStock(true);
    prediccionesRiesgoStock()
      .then((rs) => {
        setDataRiesgoStock(rs);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingRiesgoStock(false));
  }, []);

  const obtenerPrediccionDemanda = () => {
    setLoadingDemanda(true);
    prediccionesDemanda(idProducto)
      .then((rs) => setDataDemanda(rs))
      .catch((error) => console.error(error))
      .finally(() => setLoadingDemanda(false));
  };
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Predicciones</h1>
      <div className="flex flex-wrap gap-10 justify-center">
        <div className="w-120 bg-purple-50 p-3 rounded-2xl shadow-md mt-10 border border-purple-200">
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            Predicciones Tendencia
          </h2>
          {loadingTendencia ? (
            <p className="text-center text-purple-700">Cargando...</p>
          ) : (
            <DashboardTendencia dataTendencia={dataTendencia} />
          )}
        </div>
        <div className="w-65 bg-purple-50 p-3 rounded-2xl shadow-md mt-10 border border-purple-200">
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            Predicciones de Demanda
          </h2>
          <div className="mb-4">
            <label className="block mb-1 text-purple-700">
              Escriba el ID del producto:
            </label>
            <select
              value={idProducto}
              onChange={(e) => setIdProducto(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
            >
              {dataProductos.map((producto) => {
                return (
                  <option
                    key={producto.id_producto_establecido}
                    value={producto.id_producto_establecido}
                  >
                    {producto.nombre}
                  </option>
                );
              })}
            </select>
            <button
              onClick={obtenerPrediccionDemanda}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Consultar Demanda
            </button>
          </div>
          {loadingDemanda ? (
            <p className="text-purple-700">Consultando demanda...</p>
          ) : (
            <div className="space-y-4">
              {dataDemanda ? (
                <div className="bg-white rounded-xl p-3 shadow-md">
                  <p className="text-purple-700 mt-1">
                    <strong>Demanda del Producto:</strong>{" "}
                    {dataDemanda.producto}
                  </p>
                  <p className="text-purple-700">
                    <strong>Demanda Proyectada:</strong>{" "}
                    {dataDemanda.demanda_proyectada}
                  </p>
                  <p className="text-purple-700">
                    <strong>Unidades:</strong> {dataDemanda.unidad}
                  </p>
                </div>
              ) : (
                <p className="text-purple-700">No hay datos disponibles</p>
              )}
            </div>
          )}
        </div>
        <div className="w-65 bg-purple-50 p-3 rounded-2xl shadow-md mt-10 border border-purple-200">
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            Predecicciones de Riesgo de Stock
          </h2>
          {loadingRiesgoStock ? (
            <p className="text-purple-700">Cargando...</p>
          ) : dataRiesgoStock.length > 0 ? (
            <ul className="space-y-4">
              {dataRiesgoStock.map((item, index) => (
                <li key={index} className="bg-white rounded-xl p-3 shadow-md ">
                  <strong className="text-xl text-purple-900">
                    {item.materia_prima}
                  </strong>
                  <p className="text-purple-700 mt-1">
                    Dias Restantes: {item.dias_restantes}
                  </p>
                  <p className="text-purple-700 mt-1">
                    Unidades: {item.unidad}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-purple-700 text-center">
              No hay datos de riesgo de stock disponibles.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
