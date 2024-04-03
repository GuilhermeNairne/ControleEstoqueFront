import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Link,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { CustonInput } from "./custom-input";
import { filtrosType } from "../types/produtosTypes";
import { faChevronDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { useCategorias } from "../hooks/useCategorias";

interface FilterProps {
  filtros: filtrosType;
  setFiltros: (filtros: filtrosType) => void;
}

export const inicialFiltrosValues = {
  nome: "",
  categoriaId: "",
  preço: "asc",
};

export function ProdutosFilter({ filtros, setFiltros }: FilterProps) {
  const { getCategorias } = useCategorias();

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => getCategorias(),
  });

  return (
    <Formik initialValues={filtros} onSubmit={(values) => setFiltros(values)}>
      {({ handleChange, values, handleSubmit, setFieldValue }) => (
        <Box w={"full"} mt={"20px"} justifyContent={"center"} display={"flex"}>
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
                      <Text color={"red"}>Limpar</Text>
                    </Link>
                  </HStack>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      )}
    </Formik>
  );
}
