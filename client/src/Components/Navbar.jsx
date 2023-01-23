import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "../assests/mern1.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const NavMenu = () => {
  //   if (state) {
  //     return (
  //       <>
  //         <Link to={"/"}>
  //           <Text>Home</Text>
  //         </Link>
  //         <Link to={"/about"}>
  //           <Text>About</Text>
  //         </Link>
  //         <Link to={"/contact"}>
  //           <Text>Contact</Text>
  //         </Link>
  //         <Link to={"/logout"}>
  //           <Text>Logout</Text>
  //         </Link>
  //       </>
  //     );
  //   } else {
  //     <>
  //       <Link to={"/"}>
  //         <Text>Home</Text>
  //       </Link>
  //       <Link to={"/about"}>
  //         <Text>About</Text>
  //       </Link>
  //       <Link to={"/contact"}>
  //         <Text>Contact</Text>
  //       </Link>
  //       <Link to={"/login"}>
  //         <Text>Login</Text>
  //       </Link>
  //       <Link to={"/signup"}>
  //         <Text>Signup</Text>
  //       </Link>
  //     </>;
  //   }
  // };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={10} alignItems={"center"}>
            <Link to={"/"}><Image src={logo} alt="logo" w={100} /></Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link to={"/"}><Text>Home</Text></Link>
              <Link to={"/about"}><Text>About</Text></Link>
              <Link to={"/contact"}><Text>Contact</Text></Link>
              <Link to={"/login"}><Text>Login</Text></Link>
              <Link to={"/signup"}><Text>Signup</Text></Link>
              {/* <Link to={"/logout"}><Text>Logout</Text></Link> */}
              {/* <NavMenu /> */}
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link to={"/"}>
                <Text>Home</Text>
              </Link>
              <Link to={"/about"}>
                <Text>About</Text>
              </Link>
              <Link to={"/contact"}>
                <Text>Contact</Text>
              </Link>
              <Link to={"/login"}>
                <Text>Login</Text>
              </Link>
              <Link to={"/signup"}>
                <Text>Signup</Text>
              </Link>
              <Link to={"/logout"}>
                <Text>Logout</Text>
              </Link>
              {/* <NavMenu /> */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
