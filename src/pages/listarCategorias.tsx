import {
  Box,
  Center,
  Flex,
  HStack,
  Link,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { useCategorias } from "../hooks/useCategorias";
import { ModalAddCategoria } from "../Components/Modais/modal-add-categoria";

export function ListarCategorias() {
  const { getCategorias, createCategoria } = useCategorias();
  const toast = useToast();

  const { data, refetch } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => getCategorias(),
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

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

  return (
    <Flex alignItems={"center"} justifyContent={"center"} flexDir={"column"}>
      <ModalAddCategoria
        IsOpen={isOpen}
        OnClose={onClose}
        OnPress={(value) => CreateCategoria(value)}
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
              {/* <HStack w={"55px"} spacing={5}>
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
              </HStack> */}
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
