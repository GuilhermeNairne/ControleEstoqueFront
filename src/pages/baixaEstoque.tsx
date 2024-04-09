import {
  Box,
  Button,
  Flex,
  HStack,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
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
import { Produto, ProdutoForm } from "../types/produtosTypes";

export function BaixaEstoque() {
  const { updateEstoque } = useProdutos();
  const [qtBaixaProdutos, setQtBaixaProdutos] = useState(1);
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);

  function atualizaLista(_id: string, quantidade: number) {
    const produtoExistente = listaProdutos.find(
      (produto) => produto._id === _id
    );

    if (produtoExistente) {
      const novaListaProdutos: Produto[] = listaProdutos.map((produto) =>
        produto._id === _id ? { ...produto, quantidade } : produto
      );
      setListaProdutos(novaListaProdutos);
    } else {
      const novoProduto: Produto = { _id, quantidade };
      setListaProdutos((prevListaProdutos) => [
        ...prevListaProdutos,
        novoProduto,
      ]);
    }
  }

  function removeDaLista(_id: string) {
    const produtos = listaProdutos.filter((prod) => prod._id !== _id);

    setListaProdutos(produtos);

    setQtBaixaProdutos(qtBaixaProdutos - 1);
  }

  return (
    <Flex flexDir={"column"} flex={1} alignItems={"center"} mt={"50px"}>
      <Text
        color={"#1A1741"}
        fontSize={"xx-large"}
        fontWeight={"bold"}
        textAlign={"center"}
        my={"20px"}
      >
        Baixa de estoque
      </Text>

      <Box
        overflowY="auto"
        h="500px"
        p={"20px"}
        alignItems={"center"}
        display={"flex"}
        flexDir={"column"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >
        {[...Array(qtBaixaProdutos)].map((_, index) => (
          <ProdutoBaixa
            index={index}
            key={index}
            setRemoveProduto={(value) => removeDaLista(value)}
            setProdutoLista={(_id: string, quantidade: number) =>
              atualizaLista(_id, quantidade)
            }
          />
        ))}
        <Button
          w={"200px"}
          mt={"10px"}
          flexShrink={0}
          borderRadius={"10px"}
          bg={"#c4c4c4"}
          _hover={{ opacity: 0.8 }}
          onClick={() => setQtBaixaProdutos(qtBaixaProdutos + 1)}
          rightIcon={<FontAwesomeIcon icon={faAdd} color={"white"} size="lg" />}
        >
          <Text color={"white"}>Adicionar produto</Text>
        </Button>
      </Box>
      <Button
        mt={"100px"}
        w={"300px"}
        borderRadius={"10px"}
        fontSize={"large"}
        bg={"#1A1741"}
        _hover={{ opacity: 0.8 }}
        onClick={() => updateEstoque(listaProdutos)}
        rightIcon={
          <FontAwesomeIcon icon={faArrowsRotate} color={"white"} size="lg" />
        }
      >
        <Text color={"white"}>Atualizar estoque</Text>
      </Button>
    </Flex>
  );
}

type Props = {
  index: number;
  setRemoveProduto: (_id: string) => void;
  setProdutoLista: (_id: string, quantidade: number) => void;
};

function ProdutoBaixa({ setProdutoLista, setRemoveProduto }: Props) {
  const toast = useToast();
  const { getProdutos } = useProdutos();
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoForm>();
  const [quantidadeAtualizada, setQuantidadeAtualizada] = useState(0);
  const { data: produtos } = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => getProdutos(),
  });

  function atualizaQuantidade(qnt: number) {
    if (qnt > produtoSelecionado!.quantidade) {
      setTimeout(() => {
        toast({
          title: "Quantidade de baixa não pode ser maior que o estoque!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });

        return setQuantidadeAtualizada(0);
      }, 700);
    }

    setQuantidadeAtualizada(qnt);
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = event.target.value;

    setProdutoSelecionado(JSON.parse(selectedProductId));
  };

  return (
    <HStack spacing={10} mb={"15px"}>
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
        onChangeText={(value) => {
          atualizaQuantidade(Number(value));
          setProdutoLista(produtoSelecionado?._id ?? "", Number(value));
        }}
        placeHolder=""
        value={quantidadeAtualizada}
        width="50px"
        isDisabled={!produtoSelecionado}
      />

      <FontAwesomeIcon
        icon={faTrashAlt}
        color={"red"}
        size="lg"
        onClick={() => setRemoveProduto(produtoSelecionado?._id ?? "")}
      />
    </HStack>
  );
}
