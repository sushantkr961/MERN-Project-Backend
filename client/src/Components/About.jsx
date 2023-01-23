import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/icon.png";
import dp from "../assests/mern1.jpg";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Tag,
} from "@chakra-ui/react";

const About = () => {
  const Navigate = useNavigate();

  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include", // this is for using cookies it reaches the backend for getting data
      });

      const data = await res.json();
      // console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        // console.log(error);
        throw error;
      }
    } catch (error) {
      // console.log(error);
      Navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={logo}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {userData.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {userData.work}
        </Text>
        <Box
          textAlign={"left"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={5}
        >
          <Tag bg={"none"}>Email: </Tag> {userData.email}
        </Box>
        <Box
          textAlign={"left"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={5}
        >
          <Tag bg={"none"}>Phone: </Tag> {userData.phone}
        </Box>
        <Box
          textAlign={"left"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={5}
        >
          <Tag bg={"none"}>Work: </Tag> {userData.work}
        </Box>
        <Link to={"/logout"}>
          <Stack mt={8} direction={"row"} spacing={4}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Logout
            </Button>
          </Stack>
        </Link>
      </Box>
    </Center>
  );
};

export default About;
