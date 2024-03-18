import api from "../api";

interface categorias {
  _id?: string;
  nome?: string;
  idsProdutos?: string[];
}

export function useCategorias() {
  async function createCategoria(body: categorias) {
    const { data } = await api.post("/categorias", body);

    return data;
  }

  async function getCategorias() {
    const { data } = await api.get<categorias[]>("/categorias");

    return data;
  }

  async function getCategoriaById(_id: string) {
    const { data } = await api.get<categorias>("/categorias/" + _id);

    return data;
  }

  async function deleteCategorias(_id: string) {
    const { data } = await api.delete("/categorias" + _id);

    return data;
  }

  async function updateCategorias(_id: string, body: categorias) {
    console.log(_id, body);
    const { data } = await api.patch(`/categorias/${_id}`, body);

    return data;
  }

  return {
    createCategoria,
    getCategorias,
    deleteCategorias,
    updateCategorias,
    getCategoriaById,
  };
}
