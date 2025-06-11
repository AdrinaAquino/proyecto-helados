import { instance } from "../instance";
export async function listaPedidos(id_pedido) {
  try {
    const { data } = await instance.get(`/pedidos/${id_pedido}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaSucursales() {
  try {
    const { data } = await instance.get("/sucursales");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaPedidosSucursal(id_sucursal) {
  try {
    const { data } = await instance.get(`/pedidos/sucursal/${id_sucursal}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function crearPedido(request) {
  try {
    const { status } = await instance.post(`/pedido`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function actualizarPedido(request, id_pedido) {
  try {
    const { status } = await instance.patch(`/pedido/${id_pedido}`, request);
    return status;
  } catch (error) {
    throw error;
  }
}
export async function confirmarPedido(request, id_pedido) {
  try {
    const { status } = await instance.patch(
      `/pedido?pedido_id=${id_pedido}/confirmar`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}
