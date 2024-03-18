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
import { useProdutos } from "../hooks/useProdutos";
import { valoresPreenchidos } from "../utils/valores-preenchidos";
import { ModalDelete } from "../Components/Modais/modal-delete";
import { ModalEdit } from "../Components/Modais/modal-edit";
import { useCategorias } from "../hooks/useCategorias";

export interface Form {
  _id: string;
  nome: string;
  categoria: string;
  categoriaId: string;
  preço: number;
  quantidade: number;
}

export function ListarProdutos() {
  const { getProdutos, deleteProduto } = useProdutos();
  const initialValues = {
    _id: "",
    nome: "",
    categoria: "",
    categoriaId: "",
    preço: 0,
    quantidade: 0,
  };
  const { patchProdutos } = useProdutos();
  const { updateCategorias, getCategoriaById } = useCategorias();
  const [produtoEdit, setProdutoEdit] = useState<Form>();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const toast = useToast();

  const { data, refetch } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => getProdutos(),
  });

  async function handleEdit(Produtos: Form) {
    const categoriaNome = await getCategoriaById(Produtos.categoria);
    const updateProduto = {
      nome: Produtos.nome,
      preço: Produtos.preço,
      categoria: categoriaNome.nome ?? "",
      categoriaId: Produtos.categoria,
      quantidade: Produtos.quantidade,
    };

    console.log(updateProduto);

    try {
      await patchProdutos(produtoEdit?._id ?? "", updateProduto);

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
      setOpenModalEdit(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteProduto(produtoEdit?._id ?? "");

      await updateCategorias(produtoEdit!.categoriaId, {
        idsProdutos: [produtoEdit!._id],
      });
      setOpenModalDelete(false);
      refetch();
    } catch (error) {
      throw new Error("Erro ao deletar produto!");
    }
  }

  return (
    <Flex flexDir={"column"}>
      <ModalEdit
        HandleEdit={handleEdit}
        InitialValues={produtoEdit ? produtoEdit : initialValues}
        OpenModalEdit={openModalEdit}
        SetOpenModalEdit={setOpenModalEdit}
      />

      <ModalDelete
        HandleDelete={handleDelete}
        OpenModalDelete={openModalDelete}
        Produtos={produtoEdit}
        SetOpenModalDelete={setOpenModalDelete}
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
            {data?.length}
          </Text>
        </Box>
      </HStack>

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
              <Text w={"200px"}> {item.categoria} </Text>
              <Text w={"100px"}> R$ {item.preço} </Text>
              <Text w={"100px"}> {item.quantidade} </Text>
              <HStack w={"55px"} spacing={5}>
                <Button
                  onClick={() => {
                    setProdutoEdit(item);
                    setOpenModalEdit(true);
                  }}
                  bg={"transparent"}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>

                <Button
                  onClick={() => {
                    setOpenModalDelete(true);
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
