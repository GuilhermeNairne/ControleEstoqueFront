import { Box, Flex, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import {
  faList,
  faPlus,
  faRightFromBracket,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CadastrarProdutos } from "./pages/cadastrarProdutos";
import { ListarProdutos } from "./pages/listarProdutos";
import { ListarCategorias } from "./pages/listarCategorias";

export function Home() {
  const [tab, setTab] = useState<string>("listarProdutos");

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
            src={"https://avatars.githubusercontent.com/u/77353839?v=4"}
            w={"100px"}
            h={"100px"}
            borderRadius={"100%"}
          />
          <Stack>
            <Text fontSize={"x-large"} fontWeight={"bold"} color={"white"}>
              Renan
            </Text>
            <Text fontSize={"large"} fontWeight={"light"} color={"white"}>
              Administrador
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
      </Box>

      <Box p={"20px"} w={"80%"} h={"100%"} bg={"white"}>
        {tab === "cadastrarProduto" && <CadastrarProdutos />}
        {tab === "listarProdutos" && <ListarProdutos />}
        {tab === "listarCategorias" && <ListarCategorias />}
      </Box>
    </Flex>
  );
}
