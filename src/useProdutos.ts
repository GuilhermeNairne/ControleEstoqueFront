import api from './api'; 

interface produtos {
    nome: string,
    categoria: string,
    preço: number,
    quantidade: number
}

export class useProdutos {
    async createProdutos(body: produtos): Promise<void> {
        try {
        console.log('aqui')
      const data = await api.post("/produtos", body);
      console.log("Produto criado com sucesso:", data);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  }
}


