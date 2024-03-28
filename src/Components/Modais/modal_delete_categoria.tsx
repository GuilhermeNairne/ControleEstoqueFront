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

interface Prosp {
  OpenModalDelete: boolean;
  SetOpenModalDelete: (open: boolean) => void;
  Categoria?: string;
  HandleDelete: () => void;
}

export function ModalDeleteCategoria({
  OpenModalDelete,
  SetOpenModalDelete,
  Categoria,
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
            Apagar categoria
          </AlertDialogHeader>

          <AlertDialogBody>
            <HStack>
              <Text fontSize={"large"}>Deseja excluir a categoria</Text>
              <Text fontSize={"large"} fontWeight={"bold"}>
                {Categoria} ?
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
