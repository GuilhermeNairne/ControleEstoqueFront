import { Form } from "../pages/listarProdutos";

export function valoresPreenchidos(Produtos: Form) {
  const valores = Object.entries(Produtos)
    .filter(([chave, valor]) => valor !== "" && valor !== 0)
    .reduce((obj: Record<string, any>, [chave, valor]) => {
      obj[chave] = valor;
      return obj;
    }, {});

  return valores;
}
