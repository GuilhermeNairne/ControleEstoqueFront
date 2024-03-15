import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  OnClose: () => void;
  IsOpen: boolean;
}

export function ModalAddCategoria({ OnClose, IsOpen }: Props) {
  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={OnClose}
      isOpen={IsOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Adicionar Categoria</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Input placeholder="Nome da categoria" />
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={OnClose}>
            Cancelar
          </Button>
          <Button
            bg={"#1A1741"}
            ml={3}
            color={"white"}
            _hover={{ bg: "#1A1741" }}
          >
            Adicionar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
