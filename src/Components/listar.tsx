import { Center, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export function Listar() {
    return (
        <Flex flexDir={'column'} >
        <Text fontSize={'xx-large'} fontWeight={'bold'} textAlign={'center'}>Listagem de Produtos</Text>

        <Center mt={'40px'}>
            <Stack>
                <HStack h={'30px'} px={'5px'}  >
                    <Text fontWeight={'bold'} w={'50px'}>ID</Text>
                    <Text fontWeight={'bold'} w={'400px'}>Produto</Text>
                    <Text fontWeight={'bold'} w={'100px'}>Preço</Text>
                    <Text  fontWeight={'bold'} w={'100px'}>Quant.</Text>
                </HStack>
                {data.map((item, index) => (
                    <HStack p={'5px'} borderRadius={'8px'} bg={index % 2 === 0 ? '#EEFCFF' : '#F6F6F6'}  >                        
                        <Text w={'50px'}>{item.ID}</Text>
                        <Text w={'400px'}> {item.Produto} </Text>
                        <Text w={'100px'}> R$ {item.Preco} </Text>
                        <Text  w={'100px'}> {item.Quantidade} </Text> 
                        <HStack w={'55px'} spacing={5}>
                          <FontAwesomeIcon icon={faPencilAlt} />
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </HStack>                       
                    </HStack>
                ))}
            </Stack>
        </Center>
        </Flex>
    )
}

const data = 
    [
        {
          "ID": 1,
          "Produto": "Monster Manga",
          "Preco": 5.99,
          "Quantidade": 10
        },
        {
          "ID": 2,
          "Produto": "RedBull Pytaya",
          "Preco": 4.50,
          "Quantidade": 15
        },
        {
          "ID": 3,
          "Produto": "Redbull",
          "Preco": 6.75,
          "Quantidade": 8
        },
        {
          "ID": 4,
          "Produto": "Monster white",
          "Preco": 7.25,
          "Quantidade": 12
        }
      ]
      
