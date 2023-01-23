import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
// import Navbar from "./Navbar";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
    {/* <Navbar /> */}
    <Flex h={"90vh"} alignItems="center" textAlign="center">
      <Box w={"100%"}>
        <Text color="violet" fontSize="xl" fontWeight="bold">
          Hello,
        </Text>
        <Heading as="h2" size="2xl" mt={6} mb={2} color="orange.400">
          {userName}
        </Heading>
        <Text color="blueviolet" fontSize="xl" fontWeight="bold" mt="10">
          {show ? "WELCOME back" : "WELCOME"}
        </Text>
        <Text color="burlywood" fontSize="xl" fontWeight="bold">
          to the member of
        </Text>
        <Heading as="h2" size="2xl" mt={6} mb={2}>
          "The MERN Stack Developer Family"
        </Heading>
      </Box>
      <Box></Box>
    </Flex>
    </>
  );
}
