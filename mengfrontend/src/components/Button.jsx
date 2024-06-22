import { Link } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";

const FloatingCreateButton = () => {
  return (
    <Box position="fixed" bottom="20px" right="20px" zIndex="100">
      <Link to="/newbook">
        <Button colorScheme="teal.700" bg="teal.500" size="lg">
          Create Book
        </Button>
      </Link>
    </Box>
  );
};

export default FloatingCreateButton;
