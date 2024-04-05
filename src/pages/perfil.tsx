import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useContext } from "react";
import { CustonInput } from "../Components/custom-input";
import { AuthContext } from "../context/auth-context";
import { LoginResponse } from "../context/contestTypes";
import { useUsuario } from "../hooks/useUsuario";

export function Perfil() {
  const { user } = useContext(AuthContext);
  const { updateUsuario } = useUsuario();
  const toast = useToast();

  const inicialValues = {
    usuario: "",
    funcao: "",
    email: "",
    urlImage: "",
  };

  async function updateUser(userProps: Partial<LoginResponse>) {
    try {
      const body = {
        usuario: userProps.usuario,
        email: userProps.email,
        funcao: userProps.funcao,
        urlImage: userProps.urlImage,
      };

      await updateUsuario(userProps._id ?? "", body);

      return toast({
        title: "Informações atualizadas com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      return toast({
        title: "Erro ao atulizar informações!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex flexDir={"column"} alignItems={"center"}>
      <Text
        fontSize={"xx-large"}
        fontWeight={"bold"}
        my={"20px"}
        color={"#1A1741"}
      >
        Meu perfil
      </Text>

      <Formik initialValues={user ? user : inicialValues} onSubmit={updateUser}>
        {({ handleChange, values, handleSubmit }) => (
          <Stack spacing={5} alignItems={"center"}>
            <Box display={"flex"}>
              <Image
                src={
                  user?.urlImage
                    ? user?.urlImage
                    : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Duser&psig=AOvVaw1JpsFdRNOnIO6CebNTtfsr&ust=1712236575917000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODk7biQpoUDFQAAAAAdAAAAABAE"
                }
                w={"200px"}
                h={"200px"}
                borderRadius={"100%"}
              />
            </Box>
            <CustonInput
              name="Usuário"
              onChangeText={(value) => {
                handleChange("usuario")(value);
              }}
              placeHolder=""
              value={values.usuario ?? ""}
            />
            <CustonInput
              name="E-mail"
              onChangeText={(value) => {
                handleChange("email")(value);
              }}
              placeHolder=""
              value={values.email ?? ""}
            />
            <CustonInput
              name="Função"
              onChangeText={(value) => {
                handleChange("funcao")(value);
              }}
              placeHolder=""
              value={values.funcao ?? ""}
              isDisabled={true}
            />
            <CustonInput
              name="Url Image"
              onChangeText={(value) => {
                handleChange("urlImage")(value);
              }}
              placeHolder=""
              value={values.urlImage ?? ""}
            />

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
                Salvar
              </Text>
            </Button>
          </Stack>
        )}
      </Formik>
    </Flex>
  );
}
