import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const colors = {
  brand: {
    primary: "#e80909",
    orange: "#ea9f0e"
  }
};
const extendedTheme = extendTheme({ colors })

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider theme={extendedTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); // I've deleted the reportWebVitals file that was created on create-react map. I left the comment if I want to include it sometime later.
