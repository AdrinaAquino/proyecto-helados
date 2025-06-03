import { instance } from "../instance";

export async function login(request) {
  try {
    const { data } = await instance.post("/auth/login", request);
    return data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const msg = error.response.data?.message || "Error desconocido";

      if (status === 422 || status === 500) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      throw new Error(msg);
    }

    throw new Error("Error de red o servidor no disponible");
  }
}

export async function profile() {
  try {
    const { data } = await instance.get("/users/profile");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function users() {
  try {
    const { data } = await instance.get("/users");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const { status } = await instance.delete(`/users/${id}`);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function update(request, id) {
  try {
    const { status } = await instance.put(`/users/${id}`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function create(request) {
  try {
    const { status } = await instance.post(`/users`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

/* ------------------ */
export async function logout() {
  try {
    const { status } = await instance.post("/auth/logout");
    return status;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(data) {
  try {
    const { status } = await instance.put("/auth/change-password", data);
    return status;
  } catch (error) {
    throw error;
  }
}
