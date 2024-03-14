import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";
import myTheme from "./mytheme";

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={myTheme} cssVarsRoot={"aaaaaaa"}>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
