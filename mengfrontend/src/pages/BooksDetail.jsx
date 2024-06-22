import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBook, getBookDetailById } from "../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookDetailById(id);
        setBook(response.book);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box maxW="5xl" mx="auto" p={4}>
      {isLoading ? (
        <Skeleton height="400px" my={6} />
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          my={6}
          boxShadow="lg"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box w={{ base: "100%", md: "300px" }} h="auto">
            <Image
              src={`http://localhost:8000/${book.image}`}
              alt={book.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Box>
          <Box p={6} flex="1" bg="white">
            <VStack align="start" spacing={4}>
              <Heading as="h1" size="xl" color="black">
                {book.title}
              </Heading>
              <Text fontSize="lg" color="gray.700">
                <strong>By: </strong>{book.author}
              </Text>
              <Text fontSize="lg" color="gray.700">
                <strong>Publisher:</strong> {book.publisher}
              </Text>
              <Text fontSize="lg" color="gray.700">
                <strong>Year:</strong> {book.year}
              </Text>
              <Text fontSize="lg" color="gray.700">
                <strong>Pages:</strong> {book.pages}
              </Text>
              {localStorage.getItem("token") && (
                <HStack spacing={4} mt={6} w="full">
                  <Popover>
                    <PopoverTrigger>
                      <Button colorScheme="red" w="full">
                        Delete
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to delete this book?
                        <Button
                          onClick={handleDeleteBook}
                          colorScheme="red"
                          mt={3}
                          w="full"
                        >
                          Delete
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  <Link to={`/editbook/${id}`} style={{ width: "100%" }}>
                    <Button colorScheme="teal" w="full">
                      Edit
                    </Button>
                  </Link>
                </HStack>
              )}
            </VStack>
          </Box>
        </Flex>
      )}
    </Box>
  );
}
