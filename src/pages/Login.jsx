import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../axios/auth/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, clave });
      // Guarda el usuario completo
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/"); // Redirige al dashboard
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };
  return (
    <div>
      <div className="flex flex-col h-screen items-center">
        <div className=" flex items-center justify-center h-30 w-full sm:h-screen">
          <img
            src="fondo-helado3.jpg"
            alt=""
            className=" w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-75 md:h-auto bg-[#dbe9fbee] rounded-lg shadow-lg shadow-cyan-900 p-6 sm:w-100 sm:absolute sm:left-1/2 sm:top-30 sm:-translate-x-1/2">
          <img src="logo.jpeg" alt="" className="w-15 rounded-full sm:w-30" />
          <h2 className="text-2xl font-bold mb-6">Bienvenido</h2>
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2 "
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingresa tu nombre de usuario"
                className="hover:bg-[#b2d7f286] focus:bg-[#f4f9f9] w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className=" block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                className=" hover:bg-[#b2d7f286] focus:bg-[#f4f9f9] w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
            )}

            <button
              type="submit"
              className="font-bold w-full py-2 px-4 rounded-md bg-[#c87bcf95] hover:bg-[#ce85ed95] text-[#1d1c1d] border border-[#560a5d95] cursor-pointer"
            >
              INICIAR SESIÓN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
