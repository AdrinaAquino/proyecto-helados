export default function VerCliente({ setClienteVer, cliente }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#aea7b46d] z-50">
      <div className="bg-white rounded-lg overflow-hidden w-full max-w-md shadow-xl relative">
        <div className="flex justify-between items-center bg-[#89408d] text-white p-3">
          <h2 className="text-xl font-bold">Detalles del Cliente</h2>
          <button
            onClick={() => setClienteVer(null)}
            className=" text-white hover:font-bold w-7 h-7 bg-red-600 rounded-full cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="space-y-2 p-6">
          <p>
            <span className="font-semibold">Apellido:</span> {cliente.apellido}
          </p>
          <p>
            <span className="font-semibold">CI o NIT:</span> {cliente.ci_nit}
          </p>
          <p>
            <span className="font-semibold">Fecha de Registro:</span>{" "}
            {new Date(cliente.fecha_registro).toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Id_cliente:</span>{" "}
            {cliente.id_cliente}
          </p>
        </div>
      </div>
    </div>
  );
}
