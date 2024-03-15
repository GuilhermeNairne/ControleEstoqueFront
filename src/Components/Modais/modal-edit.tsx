import {
  Button,
  Center,
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
} from "@chakra-ui/react";
import { Formik } from "formik";
import { CustonInput } from "../custom-input";
import { Form } from "../listar";

interface Props {
  InitialValues: Form;
  HandleEdit: (Produtos: Form) => void;
  OpenModalEdit: boolean;
  SetOpenModalEdit: (open: boolean) => void;
}

export function ModalEdit({
  InitialValues,
  HandleEdit,
  OpenModalEdit,
  SetOpenModalEdit,
}: Props) {
  return (
    <Modal isOpen={OpenModalEdit} onClose={() => SetOpenModalEdit(false)}>
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
          <Formik initialValues={InitialValues} onSubmit={HandleEdit}>
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
                  <Button onClick={() => SetOpenModalEdit(false)}>
                    Cancelar
                  </Button>
                </ModalFooter>
              </>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
