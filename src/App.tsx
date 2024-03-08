import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'
import { Home } from './Home';

const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
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
