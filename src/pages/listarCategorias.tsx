import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { useCategorias } from "../hooks/useCategorias";
import { ModalAddCategoria } from "../Components/Modais/modal_add_categoria";
import { useState } from "react";
import { ModalDeleteCategoria } from "../Components/Modais/modal_delete_categoria";
import { ModalEditCategoria } from "../Components/Modais/modal_edit_categoria";

export type categoriaType = {
  categoriaName: string;
  id: string;
};

export function ListarCategorias() {
  const toast = useToast(),
    { isOpen, onClose, onOpen } = useDisclosure(),
    [openModalEdit, setOpenModalEdit] = useState(false),
    [openModalDelete, setOpenModalDelete] = useState(false),
    inicialValues = {
      categoriaName: "",
      id: "",
    };

  const [categoriaProps, setCategoriaProps] =
    useState<categoriaType>(inicialValues);

  const { getCategorias, createCategoria, deleteCategorias, updateCategorias } =
    useCategorias();

  const { data, refetch } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => getCategorias(),
  });

  async function CreateCategoria(nome: string) {
    try {
      await createCategoria({ nome });

      refetch();

      return toast({
        title: "Categoria cadastrada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      return toast({
        title: "Erro ao cadastrar categoria!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  }

  async function handleEdit(values: categoriaType) {
    try {
      await updateCategorias(categoriaProps!.id, {
        nome: values.categoriaName,
      });

      toast({
        title: "Categoria atualizada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Erro ao atualizar categoria!",
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
      await deleteCategorias(categoriaProps!.id);

      toast({
        title: "Categoria deletada!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Erro ao deletar categoria!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setOpenModalDelete(false);
    }
  }

  return (
    <Flex alignItems={"center"} justifyContent={"center"} flexDir={"column"}>
      <ModalAddCategoria
        IsOpen={isOpen}
        OnClose={onClose}
        OnPress={(value) => CreateCategoria(value)}
      />

      <ModalDeleteCategoria
        HandleDelete={handleDelete}
        OpenModalDelete={openModalDelete}
        SetOpenModalDelete={setOpenModalDelete}
        Categoria={categoriaProps?.categoriaName}
      />

      <ModalEditCategoria
        HandleEdit={handleEdit}
        InitialValues={categoriaProps}
        OpenModalEdit={openModalEdit}
        SetOpenModalEdit={setOpenModalEdit}
      />

      <Text fontSize={"xx-large"} fontWeight={"bold"} textAlign={"center"}>
        Listagem de Categorias
      </Text>

      <HStack alignItems={"center"} justifyContent={"center"} mt={"30px"}>
        <Text fontSize={"x-large"}>Categorias cadastradas</Text>
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
              Nome
            </Text>
            <Text fontWeight={"bold"} w={"300px"}>
              Produtos
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
              <Text w={"300px"} ml={"2%"}>
                {" "}
                {item.idsProdutos?.length}{" "}
              </Text>
              <HStack w={"55px"} spacing={5}>
                <Button
                  onClick={() => {
                    setOpenModalEdit(true);
                    setCategoriaProps({
                      categoriaName: item.nome ?? "",
                      id: item._id ?? "",
                    });
                  }}
                  bg={"transparent"}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>

                <Button
                  onClick={() => {
                    setOpenModalDelete(true);
                    setCategoriaProps({
                      categoriaName: item.nome ?? "",
                      id: item._id ?? "",
                    });
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

      <Box position="fixed" bottom={0} p={4} w="100%" left={"87%"}>
        <Link onClick={onOpen}>
          <FontAwesomeIcon icon={faPlus} color={"white"} size="lg" />
          <Text
            fontSize={"medium"}
            color={"#1A1741"}
            fontWeight={"bold"}
            textDecoration="underline"
          >
            Adicionar nova categoria
          </Text>
        </Link>
      </Box>
    </Flex>
  );
}
