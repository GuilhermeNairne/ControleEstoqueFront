import api from "../api";
import { filtrosType } from "../types/produtosTypes";

interface createProdutos {
  nome: string;
  categoriaId: string;
  preço: number;
  quantidade: number;
}

interface patchProdutos {
  nome?: string;
  categoria?: string;
  preço?: number;
  quantidade?: number;
}

interface getProdutos {
  _id: string;
  nome: string;
  categoriaName: string;
  categoriaId: string;
  preço: number;
  quantidade: number;
}

export function useProdutos() {
  async function createProdutos(body: createProdutos): Promise<getProdutos> {
    const { data } = await api.post("/produtos", body);

    return data;
  }

  async function getProdutos(filtros?: filtrosType) {
    const { data } = await api.get<getProdutos[]>("/produtos", {
      params: filtros
    });

    console.log("data", data);
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

  return { createProdutos, getProdutos, deleteProduto, patchProdutos };
}
