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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  OnClose: () => void;
  IsOpen: boolean;
  OnPress?: (value: string) => void;
}

export function ModalAddCategoria({ OnClose, IsOpen, OnPress }: Props) {
  const cancelRef = React.useRef(null);
  const [categoria, setCategoria] = useState("");

  const handlePress = () => {
    if (OnPress) {
      OnPress(categoria);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategoria(value);
  };

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
          <Input placeholder="Nome da categoria" onChange={handleInputChange} />
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
            onClick={handlePress}
          >
            Adicionar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
