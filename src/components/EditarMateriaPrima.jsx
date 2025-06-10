import React, { useEffect } from "react";
import { editarMateriaPrima } from "../axios/productos/materiasprimas";
import ModalAlerta from "./ModalAlerta";
import { useModalAlerta } from "../hooks/useModalAlerta";
import { useForm } from "react-hook-form";

export default function EditarMateriaPrima({ setModalAbierto, materiaprima }) {
  const { register, reset, handleSubmit } = useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();
  useEffect(() => {
    if (materiaprima) {
      reset({
        nombre: materiaprima.nombre,
        precio_unitario: materiaprima.precio_unitario,
        unidad: materiaprima.unidad,
        stock_minimo: materiaprima.stock_minimo,
        fecha_caducidad: materiaprima.fecha_caducidad,
      });
    }
  }, [materiaprima, reset]);
  async function handleEdit(requestData) {
    try {
      const status = await editarMateriaPrima(
        requestData,
        materiaprima.id_materia_prima
      );
      if (status === 200) {
        mostrarAlerta("exito", "Materia Prima Editado con Éxito");
        setTimeout(() => {
          setModalAbierto(false);
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error al Editar Materia Prima:", error);
      mostrarAlerta("error", "Error al Editar Materia Prima");
    }
  }

  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between  bg-[#89408d] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Editar Materia Prima</h2>
          <button
            className="w-7 border rounded-full bg-[#e36161] hover:bg-[#e36161cd] cursor-pointer"
            onClick={() => setModalAbierto(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleEdit)}>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            {...register("nombre")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#89408d]"
            placeholder="Nombre de la materia prima"
          />

          <label className="block text-sm font-medium mb-2">
            Precio Unitario
          </label>
          <input
            type="number"
            step="any"
            {...register("precio_unitario")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#89408d]"
            placeholder="Precio de la materia prima"
          />

          <label className="block text-sm font-medium mb-2">Unidades</label>
          <input
            type="text"
            {...register("unidad")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#89408d]"
            placeholder="Unidades de medida"
          />

          <label className="block text-sm font-medium mb-2">Stock Minimo</label>
          <input
            type="number"
            step="any"
            {...register("stock_minimo")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#89408d]"
            placeholder="Stock"
          />

          <label className="block text-sm font-medium mb-2">
            Fecha de Caducidad
          </label>
          <input
            type="date"
            {...register("fecha_caducidad")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff]
    focus:ring-2 focus:ring-[#89408d]"
            placeholder="Fecha de caducidad"
          />

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      <ModalAlerta
        show={alerta.show}
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
      />
    </>
  );
}
