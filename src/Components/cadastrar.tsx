import {
  Button,
  Center,
  Flex,
  HStack,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useProdutos } from "../useProdutos";
import { CustonInput } from "./customInput";

interface Form {
  nome: string;
  categoria: string;
  preço: number;
  quantidade: number;
}

export function Cadastrar() {
  const { createProdutos } = useProdutos();
  const toast = useToast();

  const initialValues = { nome: "", categoria: "", preço: 0, quantidade: 0 };

  async function handleSave(Produtos: Form) {
    try {
      await createProdutos(Produtos);

      toast({
        title: "Produto cadastrado com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
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

              {/* <CustonInput
                value={values.categoria}
                onChangeText={(value) => {
                  handleChange("categoria")(value);
                }}
                name="Categoria"
                placeHolder="Informe a categoria do produto"
              /> */}
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
