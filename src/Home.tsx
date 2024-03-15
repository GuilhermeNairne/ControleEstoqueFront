import { Box, Flex, HStack, Image, Link, Stack, Text } from "@chakra-ui/react";
import {
  faList,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Cadastrar } from "./Components/cadastrar";
import { Listar } from "./Components/listar";

export function Home() {
  const [tab, setTab] = useState<string>("listar");

  function selectTab(tab: "cadastrar" | "listar") {
    if (tab === "cadastrar") {
      setTab("cadastrar");
    } else {
      setTab("listar");
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
          <Link onClick={() => selectTab("cadastrar")}>
            <HStack>
              <FontAwesomeIcon
                icon={faPlus}
                color={tab === "cadastrar" ? "#54bcd1" : "white"}
                size="lg"
              />
              <Text
                color={tab === "cadastrar" ? "#54bcd1" : "white"}
                fontSize={"large"}
                fontWeight={"bold"}
              >
                Cadastrar produtos
              </Text>
            </HStack>
          </Link>
          <Link onClick={() => selectTab("listar")}>
            <HStack>
              <FontAwesomeIcon
                icon={faList}
                color={tab === "listar" ? "#54bcd1" : "white"}
                size="lg"
              />
              <Text
                color={tab === "listar" ? "#54bcd1" : "white"}
                fontSize={"large"}
                fontWeight={"bold"}
              >
                Lista de produtos
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
        {tab === "cadastrar" ? <Cadastrar /> : <Listar />}
      </Box>
    </Flex>
  );
}
