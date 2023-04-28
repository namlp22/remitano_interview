import React from "react";

import { ChakraProvider } from "@chakra-ui/react";
import AppRoute from "./router";

function App() {
  return (
    <ChakraProvider>
      <div data-testid="app-component">
        <AppRoute />
      </div>
    </ChakraProvider>
  );
}
export default App;
