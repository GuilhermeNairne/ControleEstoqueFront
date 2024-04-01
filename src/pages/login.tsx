import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

export function Login() {
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
          <Text color={"white"} fontSize={"xx-large"} textAlign={"center"}>
            Bem-vindo
          </Text>
          <Text color={"white"} fontSize={"xx-large"} textAlign={"center"}>
            de volta!
          </Text>
          <Text
            color={"white"}
            fontSize={"medium"}
            textAlign={"center"}
            fontWeight={"regular"}
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
        // justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          my={"100px"}
          color={"#1A1741"}
          fontSize={"xx-large"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          LOGIN
        </Text>
        <Stack spacing={"30px"}>
          <Box display={"flex"} flexDir={"column"}>
            <Text>Usuário</Text>
            <Input
              placeholder={"Informe seu usuário"}
              w={"600px"}
              borderWidth={"1px"}
              borderRadius={"5px"}
              p={"5px"}
              bg={"#F2F2F2"}
            />
          </Box>
          <Box display={"flex"} flexDir={"column"}>
            <Text>Senha</Text>
            <Input
              placeholder={"Informe sua senha"}
              w={"600px"}
              borderWidth={"1px"}
              borderRadius={"5px"}
              p={"5px"}
              bg={"#F2F2F2"}
            />
          </Box>
          <Stack>
            <Button w={"600px"} bg={"#1A1741"} h={"50px"}>
              <Text fontSize={"large"} color={"white"}>
                LOGAR
              </Text>
            </Button>
            <Text textAlign={"center"}>Esqueci minha senha</Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
