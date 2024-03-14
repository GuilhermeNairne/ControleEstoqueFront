import {
  Button,
  Center,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useState } from "react";
import { useQuery } from "react-query";
import { useProdutos } from "../useProdutos";
import { CustonInput } from "./customInput";

interface Form {
  nome: string;
  categoria: string;
  preço: number;
  quantidade: number;
}

export function Listar() {
  const { getProdutos, deleteProduto } = useProdutos();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialValues = { nome: "", categoria: "", preço: 0, quantidade: 0 };
  const { patchProdutos } = useProdutos();
  const [id, setId] = useState("");
  const toast = useToast();

  const { data, refetch } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => getProdutos(),
  });

  function saveId_OpenModal(_id: string) {
    setId(_id);
    onOpen();
  }

  async function handleEdit(Produtos: Form) {
    console.log("aquii", Produtos);

    const valoresPreenchidos = Object.entries(Produtos)
      .filter(([chave, valor]) => valor !== "" && valor !== 0)
      .reduce((obj: Record<string, any>, [chave, valor]) => {
        obj[chave] = valor;
        return obj;
      }, {});

    try {
      await patchProdutos(id, valoresPreenchidos);

      toast({
        title: "Produto atualizado com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      refetch();
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao atualizar o produto!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      onClose();
    }
  }

  async function handleDelete(_id: string) {
    try {
      await deleteProduto(_id);
      refetch();
    } catch (error) {
      throw new Error("Erro ao deletar produto!");
    }
  }

  return (
    <Flex flexDir={"column"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"600px"}>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text
              fontSize={"2xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              mt={"15px"}
            >
              Atualizar produto
            </Text>
            <Formik initialValues={initialValues} onSubmit={handleEdit}>
              {({ handleChange, values, handleSubmit, setFieldValue }) => (
                <>
                  <Center mt={"50px"} display={"flex"} flexDir={"column"}>
                    <Stack spacing={5}>
                      <CustonInput
                        value={values.nome}
                        onChangeText={(value) => {
                          handleChange("nome")(value);
                        }}
                        name="Nome"
                        placeHolder="Informe o nome do produto"
                      />
                      <HStack>
                        <Text
                          color={"black"}
                          textAlign={"right"}
                          w={"100px"}
                          fontWeight={"bold"}
                        >
                          Categoria
                        </Text>
                        <Select
                          w={"400px"}
                          borderWidth={"1px"}
                          borderColor={"F2F2F2"}
                          borderRadius={"15px"}
                          p={"5px"}
                          bg={"#F2F2F2"}
                          value={values.categoria ?? ""}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            setFieldValue("categoria", selectedValue);
                          }}
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="energetico">Enegético</option>
                          <option value="refrigerante">Refrigerante</option>
                          <option value="cerveja">Cerveja</option>
                          <option value="suco">Suco</option>
                        </Select>
                      </HStack>

                      <CustonInput
                        value={values.preço === 0 ? "" : values.preço}
                        onChangeText={(value) => {
                          handleChange("preço")(value);
                        }}
                        name="Preço"
                        placeHolder="Informe o preço do produto"
                      />
                      <CustonInput
                        value={values.quantidade === 0 ? "" : values.quantidade}
                        onChangeText={(value) => {
                          handleChange("quantidade")(value);
                        }}
                        name="Quantidade"
                        placeHolder="Informe a quantidade do produto"
                      />
                    </Stack>
                  </Center>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => handleSubmit()}
                    >
                      Salvar
                    </Button>
                    <Button onClick={onClose}>Cancelar</Button>
                  </ModalFooter>
                </>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

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
                  onClick={() => saveId_OpenModal(item._id)}
                  bg={"transparent"}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>

                <Button
                  onClick={() => handleDelete(item._id)}
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
