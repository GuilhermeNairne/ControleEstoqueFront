import api from './api'; 

interface createProdutos {
    nome: string,
    categoria: string,
    preço: number,
    quantidade: number
}

interface getProdutos {
  _id: string
  nome: string,
  categoria: string,
  preço: number,
  quantidade: number
}


export function useProdutos() {
    async function createProdutos(body: createProdutos): Promise<void> {      
        const {data} = await api.post("/produtos", body);

        return data;
  }

  async function getProdutos() {
    const {data}  = await api.get<getProdutos[]>("/produtos");

    return data;
  }

  async function deleteProduto(_id: string) {
    const { data } = await api.delete("/produtos/" + _id)
    
    console.log('aqui', data)
    return data;
  }

  return {createProdutos, getProdutos, deleteProduto}
}


