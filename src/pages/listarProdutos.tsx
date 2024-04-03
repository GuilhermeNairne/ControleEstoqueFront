import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { ModalDeleteProduto } from "../Components/Modais/modal_delete_produto";
import { ModalEditProduto } from "../Components/Modais/modal_edit_produto";
import {
  ProdutosFilter,
  inicialFiltrosValues,
} from "../Components/produtosFilter";
import { useCategorias } from "../hooks/useCategorias";
import { useProdutos } from "../hooks/useProdutos";
import { ProdutoForm, filtrosType } from "../types/produtosTypes";

export function ListarProdutos() {
  const toast = useToast();
  const { getProdutos, deleteProduto } = useProdutos();
  const { updateCategorias } = useCategorias();
  const initialValues = {
    _id: "",
    nome: "",
    categoriaId: "",
    preço: 0,
    quantidade: 0,
  };
  const { patchProdutos } = useProdutos();
  const [filtros, setFiltros] = useState<filtrosType>(inicialFiltrosValues);
  const [produtoEdit, setProdutoEdit] = useState<ProdutoForm>(initialValues);
  const [openModais, setOpenModais] = useState<
    "modalEdit" | "modalDelete" | null
  >();
  const { data, refetch } = useQuery({
    queryKey: ["produtos", filtros],
    queryFn: async () => getProdutos(filtros),
  });

  async function handleEdit(Produtos: ProdutoForm) {
    const updateProduto = {
      nome: Produtos.nome,
      preço: Produtos.preço,
      categoriaId: Produtos.categoriaId,
      quantidade: Produtos.quantidade,
    };

    try {
      await patchProdutos(produtoEdit?._id ?? "", updateProduto);

      await updateCategorias(Produtos.categoriaId, {
        idsProdutos: [Produtos._id],
        idCategoriaAntiga: produtoEdit?.categoriaAntiga,
      });

      toast({
        title: "Produto atualizado com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Erro ao atualizar o produto!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setOpenModais(null);
    }
  }

  async function handleDelete() {
    try {
      await deleteProduto(produtoEdit?._id ?? "");

      await updateCategorias(produtoEdit!.categoriaId, {
        idsProdutos: [produtoEdit!._id],
      });
      setOpenModais(null);
      refetch();
    } catch (error) {
      throw new Error("Erro ao deletar produto!");
    }
  }

  return (
    <Flex flexDir={"column"}>
      <ModalEditProduto
        HandleEdit={handleEdit}
        InitialValues={produtoEdit ? produtoEdit : initialValues}
        OpenModalEdit={openModais}
        setOpenModais={setOpenModais}
        CategoriaAntiga={(value) =>
          setProdutoEdit({ ...produtoEdit, categoriaAntiga: value })
        }
      />

      <ModalDeleteProduto
        HandleDelete={handleDelete}
        OpenModalDelete={openModais}
        Produtos={produtoEdit}
        setOpenModais={setOpenModais}
      />

      <Text fontSize={"xx-large"} fontWeight={"bold"} textAlign={"center"}>
        Listagem de Produtos
      </Text>

      <HStack alignItems={"center"} justifyContent={"center"} mt={"30px"}>
        <Text fontSize={"x-large"}>Produtos cadastrados</Text>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"30px"}
          h={"30px"}
          bg={"#1A1741"}
          borderRadius={"8px"}
        >
          <Text fontSize={"large"} color={"white"}>
            {data?.length ?? 0}
          </Text>
        </Box>
      </HStack>

      <ProdutosFilter filtros={filtros} setFiltros={setFiltros} />
      <Center mt={"40px"}>
        <Stack>
          <HStack h={"30px"} px={"5px"}>
            <Text fontWeight={"bold"} w={"300px"}>
              Produto
            </Text>
            <Text fontWeight={"bold"} w={"200px"}>
              Categoria
            </Text>
            <Text fontWeight={"bold"} w={"100px"}>
              Preço
            </Text>
            <Text fontWeight={"bold"} w={"100px"}>
              Quant.
            </Text>
          </HStack>
          {data?.map((item, index) => (
            <HStack
              p={"5px"}
              borderRadius={"8px"}
              bg={index % 2 === 0 ? "#EEFCFF" : "#F6F6F6"}
              w={"850px"}
            >
              <Text w={"300px"}> {item.nome} </Text>
              <Text w={"200px"}> {item.categoriaName} </Text>
              <Text w={"100px"}> R$ {item.preço} </Text>
              <Text w={"100px"}> {item.quantidade} </Text>
              <HStack w={"55px"} spacing={5}>
                <Button
                  onClick={() => {
                    setProdutoEdit(item);
                    setOpenModais("modalEdit");
                  }}
                  bg={"transparent"}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>

                <Button
                  onClick={() => {
                    setOpenModais("modalDelete");
                    setProdutoEdit(item);
                  }}
                  bg={"transparent"}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </HStack>
            </HStack>
          ))}
        </Stack>
      </Center>
    </Flex>
  );
}
