import React, { useEffect } from "react";
import { actualizarPedido } from "../axios/pedidos/pedidos";
import { useForm } from "react-hook-form";
import { useModalAlerta } from "../hooks/useModalAlerta";
import ModalAlerta from "./ModalAlerta";

export default function EditarPedido({ setModalAbierto, pedido }) {
  const { register, reset, handleSubmit } = useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();

  useEffect(() => {
    if (pedido) {
      reset({
        estado: pedido.estado,
        metodo_pago: pedido.metodo_pago,
      });
    }
  }, [pedido, reset]);
  async function handleEdit(requestData) {
    try {
      const status = await actualizarPedido(requestData, pedido.id_pedido);
      if (status === 200) {
        mostrarAlerta("exito", "Pedido Editado con Éxito");
        setTimeout(() => {
          setModalAbierto(false);
        }, 2200);
        setTimeout(() => {
          window.location.reload();
        }, 2200);
      }
    } catch (error) {
      console.error("Error al editar el pedido:", error);
      mostrarAlerta("error", "Error al Editar Pedido");
    }
  }

  return (
    <>
      <div className="w-100 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between  bg-[#3bb48b] rounded-t-lg md:text-xl text-white font-bold p-2">
          <h2>Editar Pedido</h2>
          <button
            className="w-7 border rounded-full bg-[#fe2b2b] hover:bg-red-600 cursor-pointer"
            onClick={() => setModalAbierto(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleEdit)}>
          <label className="block text-sm font-medium mb-2">Estado:</label>
          <select
            {...register("estado")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="Pagado">Pagado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
          <label className="block text-sm font-medium mb-2">
            Metodo de Pago:
          </label>
          <select
            {...register("metodo_pago")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#3bb48b]"
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta de crédito</option>
            <option value="Transferencia">Transferencia Bancaria</option>
          </select>

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
