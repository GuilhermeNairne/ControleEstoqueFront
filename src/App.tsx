import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";
import myTheme from "./mytheme";
import { Login } from "./pages/login";

function App() {
  const queryClient = new QueryClient();
  return (
    <ChakraProvider theme={myTheme} cssVarsRoot={"aaaaaaa"}>
      <QueryClientProvider client={queryClient}>
        {/* <Home /> */}
        <Login />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
