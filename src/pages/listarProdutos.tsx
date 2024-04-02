import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  faChevronDown,
  faPencilAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { ModalDeleteProduto } from "../Components/Modais/modal_delete_produto";
import { ModalEditProduto } from "../Components/Modais/modal_edit_produto";
import { useCategorias } from "../hooks/useCategorias";
import { useProdutos } from "../hooks/useProdutos";
import { ProdutoForm, filtrosType } from "../types/produtosTypes";
import { CustonInput } from "../Components/custom-input";
import { Formik } from "formik";

export function ListarProdutos() {
  const toast = useToast();
  const { getProdutos, deleteProduto } = useProdutos();
  const { updateCategorias, getCategorias } = useCategorias();
  const initialValues = {
    _id: "",
    nome: "",
    categoriaId: "",
    preço: 0,
    quantidade: 0,
  };

  const inicialFiltrosValues = {
    nome: "",
    categoriaId: "",
    preço: "asc",
  };
  const { patchProdutos } = useProdutos();
  const [filtros, setFiltros] = useState<filtrosType>(inicialFiltrosValues);
  const [produtoEdit, setProdutoEdit] = useState<ProdutoForm>();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [categoriaAntiga, setCategoriaAntiga] = useState<string | undefined>(
    ""
  );

  const { data, refetch } = useQuery({
    queryKey: ["produtos", filtros],
    queryFn: async () => getProdutos(filtros),
  });

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => getCategorias(),
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
        idCategoriaAntiga: categoriaAntiga,
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
      <ModalEditProduto
        HandleEdit={handleEdit}
        InitialValues={produtoEdit ? produtoEdit : initialValues}
        OpenModalEdit={openModalEdit}
        SetOpenModalEdit={setOpenModalEdit}
        CategoriaAntiga={(value) => setCategoriaAntiga(value)}
      />

      <ModalDeleteProduto
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

      <Formik initialValues={filtros} onSubmit={(values) => setFiltros(values)}>
        {({ handleChange, values, handleSubmit, setFieldValue }) => (
          <Box
            w={"full"}
            mt={"20px"}
            justifyContent={"center"}
            display={"flex"}
          >
            <Accordion defaultIndex={[1]} allowMultiple w={"90%"}>
              <AccordionItem borderColor={"transparent"}>
                <AccordionButton
                  ml={"45%"}
                  w={"10%"}
                  _hover={{ bg: "transparent" }}
                >
                  <HStack as="span" flex="1" textAlign="left">
                    <Text>Filtros</Text>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      color={"gray"}
                      size="lg"
                    />
                  </HStack>
                </AccordionButton>
                <AccordionPanel py={5}>
                  <Box display={"flex"} flexDir={"row"} w={"full"} h={"30px"}>
                    <CustonInput
                      name="Produto"
                      placeHolder="Filtre pelo produto"
                      value={values.nome}
                      onChangeText={(value) => {
                        handleChange("nome")(value);
                      }}
                      width="120px"
                    />

                    <HStack>
                      <Text
                        color={"black"}
                        textAlign={"right"}
                        w={"90px"}
                        fontWeight={"bold"}
                      >
                        Categoria
                      </Text>
                      <Select
                        w={"130px"}
                        borderWidth={"1px"}
                        borderColor={"F2F2F2"}
                        borderRadius={"15px"}
                        p={"5px"}
                        bg={"#F2F2F2"}
                        value={values.categoriaId}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setFieldValue("categoriaId", selectedValue);
                        }}
                      >
                        <option value="">Categoria</option>
                        {categorias?.map((cat) => (
                          <option value={cat._id}>{cat.nome}</option>
                        ))}
                      </Select>
                    </HStack>

                    <HStack>
                      <Text
                        color={"black"}
                        textAlign={"right"}
                        w={"60px"}
                        fontWeight={"bold"}
                      >
                        Preço
                      </Text>
                      <RadioGroup
                        value={values.preço}
                        onChange={(value) => {
                          setFieldValue("preço", value);
                        }}
                      >
                        <Stack direction="row">
                          <Radio value="desc">Maior</Radio>
                          <Radio value="asc">Menor</Radio>
                        </Stack>
                      </RadioGroup>
                    </HStack>
                    <HStack spacing={5}>
                      <Button
                        ml={"20px"}
                        bg={"#1A1741"}
                        _hover={{ opacity: 0.8 }}
                        onClick={() => handleSubmit()}
                      >
                        <Text color={"white"}>Filtrar</Text>
                      </Button>
                      <Link
                        onClick={() => {
                          setFiltros(inicialFiltrosValues);
                          setFieldValue("nome", "");
                          setFieldValue("categoriaId", "");
                          setFieldValue("preço", "asc");
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          color={"red"}
                          size="lg"
                        />
                      </Link>
                    </HStack>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        )}
      </Formik>
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
