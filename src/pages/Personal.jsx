import React, { useEffect, useState } from "react";
import TablaPersonal from "../components/TablaPersonal";
import { listapersonal, listaSucursales } from "../axios/personal/personal";

export default function Personal() {
  const [dataSucursales, setDataSucursales] = useState([]);
  const [dataPersonal, setDataPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sucursales, personal] = await Promise.all([
          listaSucursales(),
          listapersonal(),
        ]);
        setDataSucursales(sucursales);
        setDataPersonal(personal);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Administración de Personal</h1>
      <div className="mb-6 shadow-lg p-4 bg-[#c69bce59] rounded-lg">
        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Sucursales...
          </p>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-2">
              Seleccione una Sucursal
            </h2>
            {dataSucursales.map((sucursal, index) => (
              <button
                key={index}
                className="bg-[#9c2bf9] text-white m-2 px-4 py-2 rounded-md hover:bg-[#a45bb0] cursor-pointer"
              >
                <span>{sucursal.nombre}</span>
              </button>
            ))}
          </>
        )}
      </div>
      <div className="mb-6 shadow-lg p-4 bg-[#c69bce59] rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Personal de Sucursal Sur</h2>
        {loading ? (
          <p className="text-center text-lg py-10 text-purple-700">
            Cargando Personal...
          </p>
        ) : (
          <TablaPersonal
            dataPersonal={dataPersonal}
            dataSucursales={dataSucursales}
          />
        )}
      </div>
    </div>
  );
}
