import { Button, Center, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { CustonInput } from "./customInput";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Form {
    nome: string;
    categoria: string;
    preco: number;
    quantidade: number;
}

export function Cadastrar() {
    const [form, setForm] = useState<Form>({
        nome: '',
        categoria: '',
        preco: 0,
        quantidade: 0,
      })

      const handleInputChange = (fieldName: keyof Form, value: string | number) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
      };

      function handleSave() {
        
      }


    return (
        <Flex flexDir={'column'}>
            <Text color={'#1A1741'} fontSize={'xx-large'} fontWeight={'bold'} textAlign={'center'}>Cadastrar Produtos</Text>
        <Center mt={'50px'} display={'flex'} flexDir={'column'}>
            <Stack spacing={5}>
                <CustonInput 
                    onChangeText={(value) => handleInputChange('nome', value)}
                    name="Nome"
                    placeHolder="Informe o nome do produto"/>
                <CustonInput 
                     onChangeText={(value) => handleInputChange('categoria', value)}
                    name="Categoria"
                    placeHolder="Informe a categoria do produto"             
                    />
                <CustonInput 
                    onChangeText={(value) => handleInputChange('preco', value)}
                    name="Preço"
                    placeHolder="Informe o preço do produto"/>
                <CustonInput
                    onChangeText={(value) => handleInputChange('quantidade', value)} 
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