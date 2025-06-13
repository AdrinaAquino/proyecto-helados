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
    const { status } = await instance.post(`/pedidos`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function actualizarPedido(request, id_pedido) {
  try {
    const { status } = await instance.patch(`/pedidos/${id_pedido}`, request);
    return status;
  } catch (error) {
    throw error;
  }
}
export async function confirmarPedido(request, id_pedido) {
  try {
    const { status } = await instance.patch(
      `/pedidos?pedido_id=${id_pedido}/confirmar`,
      request
    );
    return status;
  } catch (error) {
    throw error;
  }
}

export async function listaPersonal() {
  try {
    const { data } = await instance.get("/personal");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaClientes() {
  try {
    const { data } = await instance.get("/clientes");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function crearCliente(request) {
  try {
    const response = await instance.post(`/clientes`, request);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listaMateriasPrimas() {
  try {
    const { data } = await instance.get("/productos/materias-primas");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function listaProductosEstablecidos() {
  try {
    const { data } = await instance.get("/productos/establecidos");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaInventariosMateriasPrimas(id_sucursal) {
  try {
    const { data } = await instance.get(
      `/inventario/materias-primas/sucursal/${id_sucursal}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function listaInventarioProductosEstablecidos(id_sucursal) {
  try {
    const { data } = await instance.get(
      `/inventario/productos/sucursal/${id_sucursal}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}
