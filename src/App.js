import "./App.css";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import ContentFooter from "./components/ContentFooter";

function App() {
  return (
    <Box maxW="container.lg" mx="auto" h="100vh" pb="20">
      <Flex alignItems="center" flexDirection="column" h="100%">
        <Header />
        <Content />
        <ContentFooter />
        <Footer />
      </Flex>
    </Box>
  );
}

export default App;
