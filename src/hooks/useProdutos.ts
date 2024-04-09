import api from "../api";
import {
  Produto,
  createProdutos,
  filtrosType,
  getProdutos,
  patchProdutos,
} from "../types/produtosTypes";

export function useProdutos() {
  async function createProdutos(body: createProdutos): Promise<getProdutos> {
    const { data } = await api.post("/produtos", body);

    return data;
  }

  async function getProdutos(filtros?: filtrosType) {
    const { data } = await api.get<getProdutos[]>("/produtos", {
      params: filtros,
    });

    return data;
  }

  async function deleteProduto(_id: string) {
    const { data } = await api.delete("/produtos/" + _id);

    return data;
  }

  async function patchProdutos(_id: string, body: patchProdutos) {
    const { data } = await api.patch("/produtos/" + _id, body);

    return data;
  }

  async function updateEstoque(updateData: Produto[]) {
    const { data } = await api.post("/produtos/atualiza-estoque", updateData);

    return data;
  }

  return {
    createProdutos,
    getProdutos,
    deleteProduto,
    patchProdutos,
    updateEstoque,
  };
}
