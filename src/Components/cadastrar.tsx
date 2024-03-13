import { Button, Center, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { CustonInput } from "./customInput";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useProdutos } from "../useProdutos";

interface Form {
    nome: string;
    categoria: string;
    preço: number;
    quantidade: number;
}

export function Cadastrar() {
    const { createProdutos } =  useProdutos();

    const [produtos, setProdutos] = useState<Form>({
        nome: '',
        categoria: '',
        preço: 0,
        quantidade: 0,
      })

      const handleInputChange = (fieldName: keyof Form, value: string | number) => {
        setProdutos((prevForm) => ({ ...prevForm, [fieldName]: value }));
      };

      function handleSave() {
        try {
            createProdutos(produtos)
        } catch (error) {
            console.log("Erro ao cadastrar produto!")
        }
      }


    return (
        <Flex flexDir={'column'}>
            <Text color={'#1A1741'} fontSize={'xx-large'} fontWeight={'bold'} textAlign={'center'}>Cadastrar Produtos</Text>
        <Center mt={'50px'} display={'flex'} flexDir={'column'}>
            <Stack spacing={5}>
                <CustonInput 
                    onChangeText={(value: any) => handleInputChange('nome', value)}
                    name="Nome"
                    placeHolder="Informe o nome do produto"/>
                <CustonInput 
                     onChangeText={(value: any) => handleInputChange('categoria', value)}
                    name="Categoria"
                    placeHolder="Informe a categoria do produto"             
                    />
                <CustonInput 
                    onChangeText={(value: any) => handleInputChange('preço', value)}
                    name="Preço"
                    placeHolder="Informe o preço do produto"/>
                <CustonInput
                    onChangeText={(value: any) => handleInputChange('quantidade', value)} 
                    name="Quantidade" 
                    placeHolder="Informe a quantidade do produto"/>
            </Stack>

            <HStack mt={'30px'}>
                <Button leftIcon={
                   <FontAwesomeIcon icon={faClose} color="white" size="lg"/>
                } borderRadius={'20px'} borderColor={'white'} borderWidth={'1px'} w={'150px'} h={'30px'} bg={'#1A1741'}>
                    <Text color={'white'} fontWeight={'bold'}>Cancelar</Text>
                </Button>
                <Button 
                onClick={handleSave}
                leftIcon={
                    <FontAwesomeIcon icon={faSave} color="white" size="lg"/>
                } borderRadius={'20px'} borderColor={'white'} borderWidth={'1px'} w={'150px'} h={'30px'} bg={'#1A1741'}>
                    <Text color={'white'} fontWeight={'bold'}>Cadastrar</Text>
                </Button>
            </HStack>
        </Center>
        </Flex>
    )
}