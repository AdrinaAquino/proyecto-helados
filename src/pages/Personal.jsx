import React, { useEffect, useState } from "react";
import TablaPersonal from "../components/TablaPersonal";
import { listapersonal, listaSucursales } from "../axios/personal/personal";
import AgregarPersonal from "../components/AgregarPersonal";

export default function Personal() {
  const [modalNuevoPersonal, setModalNuevoPersonal] = useState(false);
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
        <div className=" md:flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">
            Personal de Sucursal Sur
          </h2>
          <button
            className="bg-green-500 text-white py-3 px-3 rounded-md cursor-pointer hover:bg-green-600"
            onClick={() => setModalNuevoPersonal(true)}
          >
            <strong className="text-xl">+</strong> Nueva Personal
          </button>
        </div>

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
        {modalNuevoPersonal && (
          <div className="fixed inset-0 bg-[#aea7b46d] flex items-center justify-center">
            <AgregarPersonal
              setModalNuevoPersonal={setModalNuevoPersonal}
              personal={dataPersonal}
              sucursales={dataSucursales}
            />
          </div>
        )}
      </div>
    </div>
  );
}
