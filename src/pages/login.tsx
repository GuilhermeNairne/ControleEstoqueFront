import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth-context";

type LoginProps = {
  usuario: string;
  senha: string;
};

export function Login() {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toast = useToast();

  const { login } = useContext(AuthContext);

  const inicialValues = {
    usuario: "",
    senha: "",
  };

  async function handleLogin({ usuario, senha }: LoginProps) {
    try {
      await login({ usuario, senha });

      return toast({
        title: "Login realizado com sucesso",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    } catch (error) {
      return toast({
        title: "Falha ao realizar login, tente novamente!",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  }

  return (
    <Flex h={"100vh"}>
      <Box
        p={"20px"}
        h={"100%"}
        w={"20%"}
        bgGradient="linear(to bottom, #1A1741, #110f2b)"
        shadow={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack>
          <Text
            color={"white"}
            fontSize={"42px"}
            textAlign={"center"}
            fontFamily={"inriaSerif"}
            fontWeight={"bold"}
            mb={"-20px"}
          >
            Bem - vindo
          </Text>
          <Text
            color={"white"}
            fontSize={"42px"}
            textAlign={"center"}
            fontWeight={"bold"}
            fontFamily={"inriaSerif"}
          >
            de volta!
          </Text>
          <Text
            color={"#dbdbdb"}
            fontSize={"18px"}
            textAlign={"center"}
            fontWeight={"100"}
            fontFamily={"Iria Serif"}
          >
            acesse sua conta ao lado
          </Text>
        </Stack>
      </Box>
      <Box
        p={"20px"}
        w={"80%"}
        h={"100%"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Text
          my={"100px"}
          color={"#1A1741"}
          fontSize={"xx-large"}
          textAlign={"center"}
          fontWeight={"bold"}
          fontFamily={"Iria Serif"}
        >
          LOGIN
        </Text>
        <Formik initialValues={inicialValues} onSubmit={handleLogin}>
          {({ handleSubmit, handleChange }) => (
            <Stack spacing={"30px"}>
              <Box display={"flex"} flexDir={"column"}>
                <Text fontFamily={"Iria Serif"} fontSize={"large"}>
                  Usuário
                </Text>
                <Input
                  boxShadow="md"
                  placeholder={"Informe seu usuário"}
                  w={"600px"}
                  borderWidth={"1px"}
                  borderRadius={"5px"}
                  p={"5px"}
                  fontFamily={"Iria Serif"}
                  fontSize={"large"}
                  bg={"#F2F2F2"}
                  onChange={(value) => {
                    handleChange("usuario")(value);
                  }}
                />
              </Box>
              <Box display={"flex"} flexDir={"column"}>
                <Text fontFamily={"Iria Serif"} fontSize={"large"}>
                  Senha
                </Text>
                <InputGroup>
                  <Input
                    type={isVisiblePassword ? "text" : "password"}
                    boxShadow="md"
                    placeholder={"Informe sua senha"}
                    w={"600px"}
                    borderWidth={"1px"}
                    borderRadius={"5px"}
                    p={"5px"}
                    fontFamily={"Iria Serif"}
                    fontSize={"large"}
                    bg={"#F2F2F2"}
                    onChange={(value) => {
                      handleChange("senha")(value);
                    }}
                  />
                  <InputRightElement>
                    {isVisiblePassword === false ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        color="black"
                        size="sm"
                        onClick={() => setIsVisiblePassword(true)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        color="black"
                        size="sm"
                        onClick={() => setIsVisiblePassword(false)}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Stack>
                <Button
                  w={"600px"}
                  bg={"#1A1741"}
                  h={"50px"}
                  boxShadow="xl"
                  _hover={{ opacity: 0.8 }}
                  onClick={() => handleSubmit()}
                >
                  <Text
                    fontSize={"large"}
                    color={"white"}
                    fontFamily={"Iria Serif"}
                  >
                    LOGAR
                  </Text>
                </Button>
                <Link>
                  <Text
                    textAlign={"center"}
                    fontFamily={"Iria Serif"}
                    fontSize={"medium"}
                  >
                    Esqueci minha senha
                  </Text>
                </Link>
              </Stack>
            </Stack>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
