import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  work: "",
  password: "",
  confirmpassword: "",
};

export default function Signup() {
  const Navigate = useNavigate();
  const [user, setUser] = useState(initialState);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, work, phone, password, confirmpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        phone,
        password,
        confirmpassword, // if key and value are same no need to writing both name:name
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      window.alert("Registration Failed");
      // console.log("Invalid Registration");
    } else {
      window.alert("Registration Successfull");
      // console.log("Registration Successfull");

      Navigate("/login");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <form method="POST" onSubmit={postData}>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  autoComplete="off"
                  name="name"
                  // required
                  value={user.name}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  autoComplete="off"
                  // required
                  value={user.email}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mobile</FormLabel>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  autoComplete="off"
                  // required
                  value={user.phone}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Profession</FormLabel>
                <Input
                  type="text"
                  id="work"
                  name="work"
                  placeholder="Profession"
                  autoComplete="off"
                  // required
                  value={user.work}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="off"
                  // required
                  value={user.password}
                  onChange={handleInput}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  id="confirmpassword"
                  name="confirmpassword"
                  placeholder="Password"
                  autoComplete="off"
                  // required
                  value={user.confirmpassword}
                  onChange={handleInput}
                />
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  textAlign={"center"}
                >
                  <Text textAlign={""}>
                    Already registered <Link to={"/login"}>Login</Link>
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
