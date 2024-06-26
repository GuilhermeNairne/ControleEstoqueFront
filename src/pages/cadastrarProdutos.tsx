import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faClose, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useProdutos } from "../hooks/useProdutos";
import { CustonInput } from "../Components/custom-input";
import { useQuery } from "react-query";
import { useCategorias } from "../hooks/useCategorias";

interface Form {
  _id?: string;
  nome: string;
  categoriaId: string;
  preço: number;
  quantidade: number;
}

export function CadastrarProdutos() {
  const { createProdutos } = useProdutos();
  const toast = useToast();
  const { getCategorias, updateCategorias, getCategoriaById } = useCategorias();

  const initialValues = {
    nome: "",
    categoriaId: "",
    preço: 0,
    quantidade: 0,
  };

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => getCategorias(),
  });

  async function handleSave(Produtos: Form) {
    try {
      const categoriaNome = await getCategoriaById(Produtos.categoriaId);

      const createProduto = {
        nome: Produtos.nome,
        preço: Produtos.preço,
        categoria: categoriaNome.nome ?? "",
        categoriaId: Produtos.categoriaId,
        quantidade: Produtos.quantidade,
      };
      const createdProduto = await createProdutos(createProduto);

      await updateCategorias(Produtos.categoriaId, {
        idsProdutos: [createdProduto._id],
      });

      toast({
        title: "Produto cadastrado com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao cadastrar o produto!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex flexDir={"column"}>
      <Text
        color={"#1A1741"}
        fontSize={"xx-large"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        Cadastrar Produtos
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSave}>
        {({ handleChange, values, handleSubmit, setFieldValue }) => (
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
                  value={values.categoriaId ?? ""}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setFieldValue("categoriaId", selectedValue);
                  }}
                >
                  <option value="">Selecione uma opção</option>
                  {categorias?.map((cat) => (
                    <option value={cat._id}>{cat.nome}</option>
                  ))}
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

            <HStack mt={"30px"}>
              <Button
                leftIcon={
                  <FontAwesomeIcon icon={faClose} color="white" size="lg" />
                }
                borderRadius={"20px"}
                borderColor={"white"}
                borderWidth={"1px"}
                w={"150px"}
                h={"40px"}
                bg={"#1A1741"}
                _hover={{
                  transition: 0.5,
                  transform: "scale(1.1)",
                }}
              >
                <Text color={"white"} fontWeight={"bold"}>
                  Cancelar
                </Text>
              </Button>
              <Button
                onClick={() => handleSubmit()}
                leftIcon={
                  <FontAwesomeIcon icon={faSave} color="white" size="lg" />
                }
                borderRadius={"20px"}
                borderColor={"white"}
                borderWidth={"1px"}
                w={"150px"}
                h={"40px"}
                bg={"#1A1741"}
                _hover={{
                  transition: 0.5,
                  transform: "scale(1.1)",
                }}
              >
                <Text color={"white"} fontWeight={"bold"}>
                  Cadastrar
                </Text>
              </Button>
            </HStack>
          </Center>
        )}
      </Formik>
    </Flex>
  );
}
