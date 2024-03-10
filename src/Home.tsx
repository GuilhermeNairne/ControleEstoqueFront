import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    Link,
    Stack,
    Text,
    
  } from '@chakra-ui/react'
import { useState } from 'react'
import { Listar } from './Components/listar'
import { Cadastrar } from './Components/cadastrar'

export function Home() {
   const [tab, setTab] = useState<string>("listar")
   console.log(tab)

    function selectTab(tab: "cadastrar" | "listar") {
        if(tab === 'cadastrar') {
            setTab('cadastrar')
        } else {
            setTab('listar')
        }
    }

    return (
        <Flex  h={'100vh'}>
            <Box p={'20px'} h={'100%'} w={'20%'} bg={'#1A1741'} shadow={5}>
                <HStack>
                    <Box w={'100px'} h={'100px'} borderRadius={'100%'} bg={'black'}/>
                    <Text fontSize={'x-large'} fontWeight={'bold'} color={'white'}>Renan</Text> 
                </HStack>
                <Stack mt={'100px'} alignItems={'center'}>
                    <Button onClick={() => selectTab("cadastrar")}>
                        <Text color={tab === 'cadastrar' ? '#54bcd1' : 'white'} fontSize={'large'} fontWeight={'bold'}>Cadastrar</Text>
                    </Button>
                    <Button onClick={() => selectTab("listar")}>
                        <Text color={tab === 'listar' ? '#54bcd1' : 'white'} fontSize={'large'} fontWeight={'bold'}>Listar</Text>
                    </Button>                   
                </Stack>
            </Box>

            <Box p={'20px'} w={'80%'} h={'100%'} bg={'white'}>
                {tab === 'cadastrar' ? <Cadastrar /> : <Listar />} 
            </Box>
        </Flex>
    )
}