import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ProdutoForm } from "../../types/produtosTypes";

interface Prosp {
  OpenModalDelete: boolean;
  SetOpenModalDelete: (open: boolean) => void;
  Produtos?: ProdutoForm;
  HandleDelete: () => void;
}

export function ModalDelete({
  OpenModalDelete,
  SetOpenModalDelete,
  Produtos,
  HandleDelete,
}: Prosp) {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      isOpen={OpenModalDelete}
      leastDestructiveRef={cancelRef}
      onClose={() => SetOpenModalDelete(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Apagar produto
          </AlertDialogHeader>

          <AlertDialogBody>
            <HStack>
              <Text fontSize={"large"}>Deseja excluir o produto</Text>
              <Text fontSize={"large"} fontWeight={"bold"}>
                {Produtos?.nome} ?
              </Text>
            </HStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => SetOpenModalDelete(false)}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={HandleDelete} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
