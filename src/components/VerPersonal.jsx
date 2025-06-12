export default function VerPersonal({
  setPersonalVer,
  personal,
  obtenerNombreSucursal,
}) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
        <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
          <div className="flex justify-between items-center bg-[#89408d] text-white p-3">
            <h2 className="text-xl font-bold">Detalles del Personal</h2>
            <button
              onClick={() => setPersonalVer(null)}
              className=" text-white hover:font-bold w-7 h-7 bg-red-600 rounded-full cursor-pointer"
            >
              X
            </button>
          </div>
          <div className="space-y-2 p-6">
            <p>
              <span className="font-semibold">Nombre:</span> {personal.nombre}
            </p>
            <p>
              <span className="font-semibold">Usuario:</span> {personal.usuario}
            </p>
            <p>
              <span className="font-semibold">Rol:</span>{" "}
              {personal.id_rol === 1
                ? "Administrador"
                : personal.id_rol === 2
                ? "Personal"
                : personal.id_rol === 3
                ? "Vendedor"
                : "Desconocido"}
            </p>
            <p>
              <span className="font-semibold">Sucursal de Trabajo:</span>{" "}
              {obtenerNombreSucursal(personal.id_sucursal)}
            </p>
            <p>
              <span className="font-semibold">Fecha Ultima Conexión:</span>{" "}
              {personal.fecha_ultimo_login === null
                ? "Nunca"
                : new Date(personal.fecha_ultimo_login).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Id Personal:</span>{" "}
              {personal.id_personal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
