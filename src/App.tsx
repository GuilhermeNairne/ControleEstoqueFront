import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import { Home } from './Home';

const { Container } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Container,
  },
})


function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Home />
  </ChakraBaseProvider>
  );
}

export default App;
