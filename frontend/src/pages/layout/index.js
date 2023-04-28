import React from "react";
import { Container } from "@chakra-ui/react";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container maxW="1200px">
      <Header />
      <Outlet />
    </Container>
  );
};

export default Layout;
