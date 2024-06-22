import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
  Box,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";
import Logo from "../assets/Bookie.svg";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token && isLogin) {
      fetchUserInfo(token);
    }
  }, [isLogin]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }
      const data = await response.json();
      setUserName(data.userName);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setIsLogin(false);
    setUserName("");
    navigate("/");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(
        e.target.email.value,
        e.target.password.value
      );
      if (!token.token) {
        throw new Error("Invalid token received");
      }
      window.localStorage.setItem("token", token.token);
      setIsLogin(true);
      toast({
        title: "Login",
        description: "Login Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.8rem"
      marginRight={"1rem"}
      bg="teal.500"
      color="white"
    >
      <Link to="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Box boxSize="35px">
            <Image src={Logo} alt="Bookie Logo" />
          </Box>
          <Text fontSize="xl" fontWeight="bold" textColor="white">
            Bookie
          </Text>
        </Flex>
      </Link>
      <HStack spacing={4}>
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Menu>
            <Flex align="center">
              <Switch
                id="darkModeSwitch"
                onChange={toggleColorMode}
                colorScheme="blackAlpha"
                size="md"
              />
            </Flex>
            <MenuButton
              as={Flex}
              align="center"
              cursor="pointer"
              p={2}
              borderRadius="md"
              _hover={{}}
              _focus={{ boxShadow: "none" }}
            >
              <Avatar size="sm" name={userName} />
              <Text ml={2}>{userName}</Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Flex}
                onClick={handleLogout}
                _hover={{}}
                boxShadow={"none"}
                textColor={"black"}
                bg={"white"}
                cursor={"pointer"}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            handleLogin(e);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Link to="/register" onClick={onClose}>
                <Button variant="ghost">
                  Doesn't Have Account? Click here
                </Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
