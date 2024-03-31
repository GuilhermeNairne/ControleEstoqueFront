export type ProdutoForm = {
    _id: string;
    nome: string;
    categoriaId: string;
    preço: number;
    quantidade: number;
  }

  export type filtrosType = {
    nome: string;
    categoriaId: string;
    preço: string;
  }