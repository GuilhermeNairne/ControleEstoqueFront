import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import { Home } from './Home';
import { QueryClient, QueryClientProvider } from 'react-query';

const { Container } = chakraTheme.components
const queryClient = new QueryClient();

const theme = extendBaseTheme({
  components: {
    Container,
  },
})


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ChakraBaseProvider theme={theme}>
      <Home />
  </ChakraBaseProvider>
    </QueryClientProvider>
  );
}

export default App;
