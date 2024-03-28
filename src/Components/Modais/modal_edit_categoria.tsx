import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { CustonInput } from "../custom-input";
import { categoriaType } from "../../pages/listarCategorias";

interface Props {
  InitialValues: categoriaType;
  HandleEdit: (Props: categoriaType) => void;
  OpenModalEdit: boolean;
  SetOpenModalEdit: (open: boolean) => void;
}

export function ModalEditCategoria({
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
                  <CustonInput
                    value={values.categoriaName}
                    onChangeText={(value) => {
                      handleChange("categoriaName")(value);
                    }}
                    name="Categoria"
                    placeHolder="Informe o nome da categoria"
                  />
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
