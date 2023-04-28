import { Flex, Input, Text, Button, Spacer, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginOrRegister } from "../../services/auth";

import {
  isUserLoggedIn,
  logOut,
  getUserEmail,
  setUserEmail,
  setToken,
} from "../../utils";

const Header = () => {
  const [credential, setCredential] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(isUserLoggedIn());

  const toast = useToast()

  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    const username = event.target.value;
    setCredential({
      ...credential,
      email: username,
    });
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setCredential({
      ...credential,
      password: password,
    });
  };

  const handleLogout = () => {
    logOut();
    setIsAuthenticated(isUserLoggedIn());
    navigate("/");
  };
  const handleShareMovie = () => {
    navigate("/share");
  };
  const handleClickLogo = () => {
    navigate("/");
  };
  const handleLoginOrRegister = async () => {
    console.log("credential :", credential);
    const response = await loginOrRegister(credential);
    if (response.token !=null) {
      const token = response.token
      setUserEmail(credential.email);
      setToken(token);
      setIsAuthenticated(isUserLoggedIn());
    } else {
      const message = response.response.data.message
      toast({
        title: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  };

  return (
    <Flex p="5" data-testid="header">
      <Text
        onClick={handleClickLogo}
        fontSize={35}
      >
        Funny Movies
      </Text>
      <Spacer />
      {isAuthenticated ? (
        <Flex gap={2}>
          <Text p={2}>Welcome {getUserEmail()}</Text>
          <Button
            onClick={handleShareMovie}
            colorScheme="white"
            color="black"
            variant="outline"
            minW="fit-content"
          >
            Share a movie
          </Button>
          <Button
            onClick={handleLogout}
            colorScheme="white"
            color="black"
            variant="outline"
            minW="fit-content"
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex gap={2}>
          <Input placeholder="email" onChange={handleEmailChange} />
          <Input placeholder="password" type="password" onChange={handlePasswordChange} />
          <Button
            onClick={handleLoginOrRegister}
            colorScheme="white"
            color="black"
            variant="outline"
            minW="fit-content"
          >
            Login/Register
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
