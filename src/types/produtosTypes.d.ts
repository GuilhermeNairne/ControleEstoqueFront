export type ProdutoForm = {
  _id: string;
  nome: string;
  categoriaId: string;
  categoriaAntiga?: string;
  preço: number;
  quantidade: number;
};

export type filtrosType = {
  nome: string;
  categoriaId: string;
  preço: string;
};

export type Produto = {
  _id: string;
  quantidade: number;
};

type createProdutos = {
  nome: string;
  categoriaId: string;
  preço: number;
  quantidade: number;
};

type patchProdutos = {
  nome?: string;
  categoria?: string;
  preço?: number;
  quantidade?: number;
};

type getProdutos = {
  _id: string;
  nome: string;
  categoriaName: string;
  categoriaId: string;
  preço: number;
  quantidade: number;
};
