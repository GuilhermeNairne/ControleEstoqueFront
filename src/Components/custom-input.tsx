import { HStack, Input, Stack, Text } from "@chakra-ui/react";

interface Props {
  name: string;
  placeHolder: string;
  onChangeText: (value: string) => void;
  value: string | number;
  width?: string
}

export function CustonInput({ name, placeHolder, onChangeText, value, width }: Props) {
  return (
    <HStack>
      <Text color={"black"} textAlign={"right"} w={"100px"} fontWeight={"bold"}>
        {name}
      </Text>
      <Input
        placeholder={placeHolder}
        w={width ?? "400px"}
        borderWidth={"1px"}
        borderColor={"F2F2F2"}
        borderRadius={"15px"}
        p={"5px"}
        bg={"#F2F2F2"}
        onChange={(e) => {
          const newValue = e.target.value;
          onChangeText(newValue);
        }}
        value={value}
      />
    </HStack>
  );
}
