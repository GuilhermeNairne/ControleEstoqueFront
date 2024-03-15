import {
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
import { useProdutos } from "../useProdutos";
import { valoresPreenchidos } from "../utils/valores-preenchidos";
import { ModalDelete } from "./Modais/modal-delete";
import { ModalEdit } from "./Modais/modal-edit";

export interface Form {
  _id?: string;
  nome: string;
  categoria: string;
  preço: number;
  quantidade: number;
}

export function Listar() {
  const { getProdutos, deleteProduto } = useProdutos();
  const initialValues = { nome: "", categoria: "", preço: 0, quantidade: 0 };
  const { patchProdutos } = useProdutos();
  const [produtoEdit, setProdutoEdit] = useState<Form>();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const toast = useToast();

  const { data, refetch } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => getProdutos(),
  });

  async function handleEdit(Produtos: Form) {
    const ValoresPreenchidos = valoresPreenchidos(Produtos);

    try {
      await patchProdutos(produtoEdit?._id ?? "", ValoresPreenchidos);

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
        InitialValues={initialValues}
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
                    setOpenModalEdit(true);
                    setProdutoEdit(item);
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
