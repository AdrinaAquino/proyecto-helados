import React, { useEffect, useRef, useState } from "react";
import {
  crearCliente,
  crearPedido,
  listaClientes,
  listaMateriasPrimas,
  listaPersonal,
  listaProductosEstablecidos,
} from "../axios/pedidos/pedidos";
import { useForm } from "react-hook-form";
import { useModalAlerta } from "../hooks/useModalAlerta";
import ModalAlerta from "./ModalAlerta";
import { useFieldArray } from "react-hook-form";

export default function AgregarPedido({
  setModalNuevoPedido,
  sucursales,
  sucursalSeleccionada,
}) {
  const { register, handleSubmit, control, watch, setValue, getValues, reset } =
    useForm();
  const { alerta, mostrarAlerta } = useModalAlerta();
  const [dataPersonal, setDataPersonal] = useState([]);
  const [dataClientes, setDataClientes] = useState([]);
  const [datacrearCliente, setDataCrearCliente] = useState([]);
  const [dataProductosEstablecidos, setDataProductosEstablecidos] = useState(
    []
  );
  const [dataMateriasPrimas, setDataMateriasPrimas] = useState([]);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [apellidoInput, setApellidoInput] = useState("");
  const sugerenciasRef = useRef(null);

  useEffect(() => {
    if (sucursalSeleccionada) {
      reset({
        id_sucursal: sucursalSeleccionada,
      });
    }
  }, [sucursalSeleccionada, reset]);

  useEffect(() => {
    listaPersonal().then(setDataPersonal).catch(console.error);
    listaClientes().then(setDataClientes).catch(console.error);
    listaProductosEstablecidos()
      .then(setDataProductosEstablecidos)
      .catch(console.error);
    listaMateriasPrimas().then(setDataMateriasPrimas).catch(console.error);
  }, []);

  useEffect(() => {
    function manejarClickFuera(event) {
      if (
        sugerenciasRef.current &&
        !sugerenciasRef.current.contains(event.target)
      ) {
        setMostrarSugerencias(false);
      }
    }

    document.addEventListener("mousedown", manejarClickFuera);
    return () => {
      document.removeEventListener("mousedown", manejarClickFuera);
    };
  }, []);

  const clientesFiltrados = dataClientes.filter((cliente) =>
    cliente.ci_nit.toLowerCase().includes(busquedaCliente.toLowerCase())
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "detalles",
  });

  async function crearClienteNuevo(ci_nit, apellido) {
    try {
      const nuevoCliente = await crearCliente({ ci_nit, apellido });
      return nuevoCliente.id_cliente;
    } catch (error) {
      console.error("Error creando cliente:", error);
      mostrarAlerta("error", "Error creando cliente");
      return null;
    }
  }

  async function handleCrear(formData) {
    try {
      let idClienteFinal = clienteSeleccionado?.id_cliente;
      const ci_nit = busquedaCliente.trim() || null;
      const apellido = apellidoInput.trim() || null;

      if (!idClienteFinal) {
        idClienteFinal = await crearClienteNuevo(ci_nit, apellido);
        if (!idClienteFinal) return;
      }

      const requestData = {
        ...formData,
        id_cliente: idClienteFinal,
      };

      requestData.detalles = requestData.detalles.map((detalle) => {
        const limpio = { ...detalle };
        const tipo = limpio.tipo_producto;

        limpio.tipo_producto = tipo;
        limpio.cantidad = Number(limpio.cantidad);

        if (tipo === "Establecido") {
          limpio.id_producto_establecido = Number(
            limpio.id_producto_establecido
          );
          delete limpio.producto_personalizado;
        } else if (tipo === "Personalizado") {
          delete limpio.id_producto_establecido;
          limpio.producto_personalizado.margen = Number(
            limpio.producto_personalizado.margen
          );
          limpio.producto_personalizado.detalles =
            limpio.producto_personalizado.detalles.map((m) => ({
              ...m,
              id_materia_prima: Number(m.id_materia_prima),
              cantidad: Number(m.cantidad),
            }));
        }

        return limpio;
      });
      console.log("Objeto que se envía al backend:", requestData);
      const status = await crearPedido(requestData);
      if (status === 201) {
        mostrarAlerta("exito", "Pedido Creado con Éxito");
        setTimeout(() => {
          setModalNuevoPedido(false);
        }, 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error("Error al crear pedido:", error);
      mostrarAlerta("error", "Error al Crear Pedido");
    }
  }

  return (
    <>
      <div className="w-100 md:w-130 rounded-lg bg-white shadow-md m-2">
        <div className="flex justify-between bg-[#89408d] rounded-t-lg text-xl text-white font-bold p-2">
          <h2>Crear Pedido</h2>
          <button
            className="w-7 border rounded-full bg-[#e36161] hover:bg-[#e36161cd] cursor-pointer"
            onClick={() => setModalNuevoPedido(false)}
          >
            X
          </button>
        </div>

        <form className="p-4 space-y-4" onSubmit={handleSubmit(handleCrear)}>
          <label className="block text-sm font-medium mb-2">
            Nombre Sucursal:
          </label>
          <input
            type="text"
            value={
              sucursalSeleccionada
                ? sucursales.find((s) => s.id_sucursal === sucursalSeleccionada)
                    ?.nombre
                : "todas las sucursales"
            }
            disabled
            className="border border-gray-300 p-2 w-full rounded bg-gray-100 text-gray-600"
          />

          <input
            type="hidden"
            value={sucursalSeleccionada}
            {...register("id_sucursal")}
          />

          <label className="block text-sm font-medium mb-2">
            Nombre Personal:
          </label>
          <select
            {...register("id_personal", { valueAsNumber: true })}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#89408d]"
          >
            <option value="">Seleccione un personal</option>
            {dataPersonal.map((personal) => {
              return (
                <option key={personal.id_personal} value={personal.id_personal}>
                  {personal.nombre}
                </option>
              );
            })}
          </select>

          <label className="block text-sm font-medium mb-2">CI o NIT:</label>
          <div className="space-y-3 space-x-3 md:flex justify-between relative">
            <div className="w-full relative" ref={sugerenciasRef}>
              <input
                type="text"
                value={clienteSeleccionado?.ci_nit || busquedaCliente}
                onChange={(e) => {
                  setBusquedaCliente(e.target.value);
                  setClienteSeleccionado(null);
                  setMostrarSugerencias(true);
                }}
                className="h-10 border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#89408d]"
                placeholder="Escriba el CI o NIT del Cliente"
              />

              {busquedaCliente &&
                mostrarSugerencias &&
                clientesFiltrados.length > 0 && (
                  <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow-md max-h-40 overflow-auto">
                    {clientesFiltrados.map((cliente) => (
                      <li
                        key={cliente.id_cliente}
                        className="p-2 hover:bg-purple-100 cursor-pointer"
                        onClick={() => {
                          setClienteSeleccionado(cliente);
                          setBusquedaCliente(cliente.ci_nit);
                          setApellidoInput(cliente.apellido || "");
                          setMostrarSugerencias(false);
                        }}
                      >
                        {cliente.ci_nit}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <input
              type="text"
              value={clienteSeleccionado?.apellido || apellidoInput}
              onChange={(e) => setApellidoInput(e.target.value)}
              disabled={!!clienteSeleccionado}
              className="h-10 border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#89408d]"
              placeholder="Nombre del Cliente"
            />

            <input
              type="hidden"
              value={clienteSeleccionado?.id_cliente || ""}
              {...register("id_cliente")}
            />
          </div>

          <label className="block text-sm font-medium mb-2">
            Metodo de Pago:
          </label>
          <select
            {...register("metodo_pago")}
            required
            className="border border-gray-300 p-2 w-full rounded focus:outline-none hover:bg-[#eddff186] focus:bg-[#f6efff] focus:ring-2 focus:ring-[#89408d]"
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta_credito">Tarjeta de crédito</option>
            <option value="Transferencia_bancaria">
              Transferencia Bancaria:
            </option>
          </select>

          <label className="block text-sm font-medium mb-2"></label>
          {/* Sección de detalles del pedido */}
          {fields.map((item, index) => {
            const tipo = watch(`detalles.${index}.tipo_producto`);
            return (
              <div key={index} className="border p-3 rounded mb-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-purple-700">
                    Producto #{index + 1}
                  </h3>
                  <button
                    type="button"
                    className="text-red-500 text-sm"
                    onClick={() => remove(index)}
                  >
                    Quitar
                  </button>
                </div>

                {/* Tipo de producto */}
                <label className="block mt-2 text-sm font-medium">
                  Tipo de Producto
                </label>
                <select
                  {...register(`detalles.${index}.tipo_producto`)}
                  className="border border-gray-300 p-2 w-full rounded"
                  required
                >
                  <option value="">Seleccione tipo</option>
                  <option value="Establecido">Establecido</option>
                  <option value="Personalizado">Personalizado</option>
                </select>

                {/* Producto establecido */}
                {tipo === "Establecido" && (
                  <>
                    <label className="block mt-2 text-sm font-medium">
                      Producto Establecido
                    </label>
                    <select
                      {...register(
                        `detalles.${index}.id_producto_establecido`,
                        { valueAsNumber: true }
                      )}
                      className="border border-gray-300 p-2 w-full rounded"
                      required
                    >
                      <option value="">Seleccione un producto</option>
                      {dataProductosEstablecidos.map((producto) => (
                        <option
                          key={producto.id_producto_establecido}
                          value={producto.id_producto_establecido}
                        >
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {/* Producto personalizado */}
                {tipo === "Personalizado" && (
                  <div className="mt-2 p-2 bg-gray-100 rounded">
                    <label className="block text-sm font-medium">
                      Nombre del Producto Personalizado
                    </label>
                    <input
                      type="text"
                      {...register(
                        `detalles.${index}.producto_personalizado.nombre_personalizado`
                      )}
                      className="border border-gray-300 p-2 w-full rounded"
                      required
                    />

                    <label className="block mt-2 text-sm font-medium">
                      Margen de Ganancia (Ej: 0.3)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `detalles.${index}.producto_personalizado.margen`
                      )}
                      className="border border-gray-300 p-2 w-full rounded"
                      required
                    />

                    <label className="block mt-2 text-sm font-medium">
                      Materias Primas
                    </label>
                    <div className="space-y-2">
                      {dataMateriasPrimas.map((materia, mi) => (
                        <div key={mi} className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const path = `detalles.${index}.producto_personalizado.detalles`;
                              const current = getValues(path) || [];
                              if (checked) {
                                setValue(path, [
                                  ...current,
                                  {
                                    id_materia_prima: materia.id_materia_prima,
                                    cantidad: 0,
                                  },
                                ]);
                              } else {
                                setValue(
                                  path,
                                  current.filter(
                                    (m) =>
                                      m.id_materia_prima !==
                                      materia.id_materia_prima
                                  )
                                );
                              }
                            }}
                          />
                          <span className="w-40">{materia.nombre}</span>
                          <input
                            type="number"
                            placeholder="Cantidad"
                            className="border p-1 rounded w-20"
                            onChange={(e) => {
                              const cantidad = parseFloat(e.target.value);
                              const path = `detalles.${index}.producto_personalizado.detalles`;
                              const current = getValues(path) || [];
                              const updated = current.map((m) =>
                                m.id_materia_prima === materia.id_materia_prima
                                  ? { ...m, cantidad }
                                  : m
                              );
                              setValue(path, updated);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cantidad */}
                <label className="block mt-2 text-sm font-medium">
                  Cantidad
                </label>
                <input
                  type="number"
                  {...register(`detalles.${index}.cantidad`)}
                  className="border border-gray-300 p-2 w-full rounded"
                />
              </div>
            );
          })}

          <button
            type="button"
            onClick={() =>
              append({
                tipo_producto: "",
                id_producto_establecido: "",
                producto_personalizado: {
                  nombre_personalizado: "",
                  detalles: [],
                  margen: 0,
                },
                cantidad: 1,
              })
            }
            className="bg-violet-600 text-white px-3 py-1 rounded mb-4"
          >
            Agregar Producto
          </button>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
            >
              Crear Pedido
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
