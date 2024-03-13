import { Center, Flex, HStack, Stack, Text, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useProdutos } from "../useProdutos";
import { useQuery } from "react-query";

export function Listar() {
  const { getProdutos, deleteProduto } = useProdutos();
  
  const {data, refetch} = useQuery({
    queryKey: ['produtos'],
    queryFn: async () => getProdutos() 
  })

  function handleEdit() {}

 async function handleDelete(_id: string) {
    try {
      await deleteProduto(_id)
       refetch()
    } catch (error) {
      throw new Error('Erro ao deletar produto!')
    }
  }

    return (
        <Flex flexDir={'column'} >
        <Text fontSize={'xx-large'} fontWeight={'bold'} textAlign={'center'}>Listagem de Produtos</Text>

        <Center mt={'40px'}>
            <Stack>
                <HStack h={'30px'} px={'5px'}  >
                    <Text fontWeight={'bold'} w={'300px'}>Produto</Text>
                    <Text fontWeight={'bold'} w={'100px'}>Preço</Text>
                    <Text  fontWeight={'bold'} w={'100px'}>Quant.</Text>
                </HStack>
                {data?.map((item, index) => (
                    <HStack p={'5px'} borderRadius={'8px'} bg={index % 2 === 0 ? '#EEFCFF' : '#F6F6F6'}  >                        
                       
                        <Text w={'300px'}> {item.nome} </Text>
                        <Text w={'100px'}> R$ {item.preço} </Text>
                        <Text  w={'100px'}> {item.quantidade} </Text> 
                        <HStack w={'55px'} spacing={5}>
                          <Button onClick={handleEdit}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>

                          <Button onClick={() => handleDelete(item._id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        </HStack>                       
                    </HStack>
                ))}
            </Stack>
        </Center>
        </Flex>
    )
}
      
