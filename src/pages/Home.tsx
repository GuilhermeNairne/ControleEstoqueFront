import { Box, Flex, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import {
  faList,
  faPlus,
  faRightFromBracket,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { CadastrarProdutos } from "./cadastrarProdutos";
import { ListarProdutos } from "./listarProdutos";
import { ListarCategorias } from "./listarCategorias";
import { AuthContext } from "../context/auth-context";

export function Home() {
  const [tab, setTab] = useState<string>("listarProdutos");
  const { singOut } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  function selectTab(
    tab: "cadastrarProduto" | "listarProdutos" | "listarCategorias"
  ) {
    if (tab === "cadastrarProduto") {
      setTab("cadastrarProduto");
    }
    if (tab === "listarProdutos") {
      setTab("listarProdutos");
    }
    if (tab === "listarCategorias") {
      setTab("listarCategorias");
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
      >
        <HStack>
          <Image
            src={
              user?.urlImage
                ? user?.urlImage
                : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Duser&psig=AOvVaw1JpsFdRNOnIO6CebNTtfsr&ust=1712236575917000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCODk7biQpoUDFQAAAAAdAAAAABAE"
            }
            w={"100px"}
            h={"100px"}
            borderRadius={"100%"}
          />
          <Stack>
            <Text
              fontSize={"x-large"}
              fontWeight={"bold"}
              color={"white"}
              maxW={"150px"}
            >
              {user?.usuario}
            </Text>
            <Text fontSize={"large"} fontWeight={"light"} color={"white"}>
              {user?.funcao}
            </Text>
          </Stack>
        </HStack>
        <Stack mt={"100px"} alignItems={"center"} spacing={5}>
          <Link onClick={() => selectTab("cadastrarProduto")}>
            <HStack>
              <FontAwesomeIcon
                icon={faPlus}
                color={tab === "cadastrarProduto" ? "#54bcd1" : "white"}
                size="lg"
              />
              <Text
                color={tab === "cadastrarProduto" ? "#54bcd1" : "white"}
                fontSize={"large"}
                fontWeight={"bold"}
              >
                Cadastrar produtos
              </Text>
            </HStack>
          </Link>
          <Link onClick={() => selectTab("listarProdutos")}>
            <HStack>
              <FontAwesomeIcon
                icon={faList}
                color={tab === "listarProdutos" ? "#54bcd1" : "white"}
                size="lg"
              />
              <Text
                color={tab === "listarProdutos" ? "#54bcd1" : "white"}
                fontSize={"large"}
                fontWeight={"bold"}
              >
                Lista de produtos
              </Text>
            </HStack>
          </Link>
          <Link onClick={() => selectTab("listarCategorias")}>
            <HStack>
              <FontAwesomeIcon
                icon={faClipboardList}
                color={tab === "listarCategorias" ? "#54bcd1" : "white"}
                size="lg"
              />
              <Text
                color={tab === "listarCategorias" ? "#54bcd1" : "white"}
                fontSize={"large"}
                fontWeight={"bold"}
              >
                Lista de Categorias
              </Text>
            </HStack>
          </Link>
        </Stack>

        <Link onClick={singOut}>
          <HStack position="fixed" bottom={0} p={4} w="100%" left="6%">
            <FontAwesomeIcon
              icon={faRightFromBracket}
              color={"white"}
              size="lg"
            />
            <Text fontSize={"x-large"} color={"white"} fontWeight={"bold"}>
              Sair
            </Text>
          </HStack>
        </Link>
      </Box>

      <Box p={"20px"} w={"80%"} h={"100%"} bg={"white"}>
        {tab === "cadastrarProduto" && <CadastrarProdutos />}
        {tab === "listarProdutos" && <ListarProdutos />}
        {tab === "listarCategorias" && <ListarCategorias />}
      </Box>
    </Flex>
  );
}
