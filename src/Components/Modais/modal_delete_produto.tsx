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

type propsSetModal = "modalEdit" | "modalDelete" | null | undefined;

interface Prosp {
  OpenModalDelete: string | null | undefined;
  setOpenModais: (value: propsSetModal) => void;
  Produtos?: ProdutoForm;
  HandleDelete: () => void;
}

export function ModalDeleteProduto({
  OpenModalDelete,
  setOpenModais,
  Produtos,
  HandleDelete,
}: Prosp) {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      isOpen={OpenModalDelete === "modalDelete"}
      leastDestructiveRef={cancelRef}
      onClose={() => setOpenModais(null)}
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
            <Button ref={cancelRef} onClick={() => setOpenModais(null)}>
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
