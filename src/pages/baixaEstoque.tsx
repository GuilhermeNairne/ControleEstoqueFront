import { Button, Flex, HStack, Select, Text } from "@chakra-ui/react";
import {
  faAdd,
  faArrowsRotate,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useQuery } from "react-query";
import { CustonInput } from "../Components/custom-input";
import { useProdutos } from "../hooks/useProdutos";
import { ProdutoForm } from "../types/produtosTypes";

export function BaixaEstoque() {
  const [qtBaixaProdutos, setQtBaixaProdutos] = useState(1);

  return (
    <Flex flexDir={"column"} flex={1} alignItems={"center"}>
      <Text
        color={"#1A1741"}
        fontSize={"xx-large"}
        fontWeight={"bold"}
        textAlign={"center"}
        mt={"30px"}
      >
        Baixa de estoque
      </Text>
      <Flex
        mt={"100px"}
        p={"20px"}
        w={"70%"}
        borderRadius={"10px"}
        flexDir={"column"}
        style={{ gap: 35 }}
        alignItems={"center"}
      >
        {[...Array(qtBaixaProdutos)].map((_, index) => (
          <ProdutoBaixa
            key={index}
            setQtProdutos={(value) =>
              setQtBaixaProdutos(qtBaixaProdutos - value)
            }
          />
        ))}
        <Button
          w={"200px"}
          borderRadius={"10px"}
          bg={"#adadad"}
          _hover={{ opacity: 0.8 }}
          onClick={() => setQtBaixaProdutos(qtBaixaProdutos + 1)}
          rightIcon={<FontAwesomeIcon icon={faAdd} color={"white"} size="lg" />}
        >
          <Text color={"white"}>Adicionar produto</Text>
        </Button>
        <Button
          mt={"200px"}
          w={"300px"}
          borderRadius={"10px"}
          fontSize={"large"}
          bg={"#1A1741"}
          _hover={{ opacity: 0.8 }}
          onClick={() => setQtBaixaProdutos(qtBaixaProdutos + 1)}
          rightIcon={
            <FontAwesomeIcon icon={faArrowsRotate} color={"white"} size="lg" />
          }
        >
          <Text color={"white"}>Atualizar estoque</Text>
        </Button>
      </Flex>
    </Flex>
  );
}

type Props = {
  setQtProdutos: (value: number) => void;
};

function ProdutoBaixa({ setQtProdutos }: Props) {
  const { getProdutos } = useProdutos();
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoForm>();
  const { data: produtos } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => getProdutos(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = event.target.value;

    setProdutoSelecionado(JSON.parse(selectedProductId));
  };

  return (
    <HStack spacing={10}>
      <HStack>
        <Text fontWeight={"bold"}>Produto</Text>

        <Select
          w={"200px"}
          borderWidth={"1px"}
          borderColor={"F2F2F2"}
          borderRadius={"15px"}
          p={"5px"}
          bg={"#F2F2F2"}
          value={JSON.stringify(produtoSelecionado)}
          onChange={handleChange}
        >
          <option value="">Selecione um produto</option>
          {produtos?.map((produto) => (
            <option key={produto._id} value={JSON.stringify(produto)}>
              {produto.nome}
            </option>
          ))}
        </Select>
      </HStack>
      <CustonInput
        name="Qt. Disponível"
        onChangeText={() => ""}
        placeHolder=""
        value={produtoSelecionado?.quantidade ?? ""}
        isDisabled={true}
        width="50px"
      />
      <CustonInput
        name="Qt. Baixa"
        onChangeText={() => ""}
        placeHolder=""
        value={""}
        width="50px"
      />

      <FontAwesomeIcon
        icon={faTrashAlt}
        color={"red"}
        size="lg"
        onClick={() => setQtProdutos(1)}
      />
    </HStack>
  );
}
