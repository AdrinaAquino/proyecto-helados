import { Link } from "react-router-dom";

export default function Aside({ openMenu }) {
  return (
    <aside
      className={`${
        openMenu ? "block" : "hidden"
      } md:block absolute right-0 top-18 md:top-0 h-auto w-45 shrink-0 flex-none border border-[#8704af] rounded-2xl bg-[#804193d2] font-semibold cursor-pointer md:rounded-none  md:relative md:w-45 md:h-auto md:bg-[#7a4193] text-[#fefffc] p-4 overflow-y-auto`}
    >
      <nav className="space-y-2 flex flex-col">
        <Link
          to="/sucursales"
          className="px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          Sucursales
        </Link>

        <Link
          to="/personal"
          className="px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          Personal
        </Link>

        <Link
          to="/clientes"
          className="px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          Clientes
        </Link>

        <Link
          to="/productos"
          className="px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          Productos
        </Link>

        <Link
          to="/inventarios"
          className="px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          Inventarios
        </Link>

        <Link
          to="/pedidos"
          className="px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          Pedidos
        </Link>

        <Link
          to="/predicciones"
          className="px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          Predicciones
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className=" font-bold px-1 py-2 rounded-md hover:bg-slate-700 transition "
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}
