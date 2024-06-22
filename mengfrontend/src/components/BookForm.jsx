import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
  VStack,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook, editBook } from "../modules/fetch";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook(
          bookData.id,
          formData.get("title"),
          formData.get("author"),
          formData.get("publisher"),
          parseInt(formData.get("year")),
          parseInt(formData.get("pages"))
        );
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setSelectedImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:8000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <Box maxW="5xl" mx="auto" p={6} boxShadow="xl" borderRadius="lg" bg="white">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        {bookData ? "Edit Book" : "Create Book"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          <Box flexShrink={0}>
            {selectedImage && (
              <Box mb={4}>
                <Image w={64} src={selectedImage} alt="Selected Image" />
                {!bookData && (
                  <Button
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                    colorScheme="red"
                    mt={2}
                  >
                    Remove Image
                  </Button>
                )}
              </Box>
            )}
          </Box>
          <VStack spacing={4} flex="1">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input name="title" required defaultValue={bookData?.title} />
            </FormControl>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input name="author" required defaultValue={bookData?.author} />
            </FormControl>
            <FormControl>
              <FormLabel>Publisher</FormLabel>
              <Input
                name="publisher"
                required
                defaultValue={bookData?.publisher}
              />
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input
                  name="year"
                  type="number"
                  required
                  defaultValue={bookData?.year}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Pages</FormLabel>
                <Input
                  name="pages"
                  type="number"
                  required
                  defaultValue={bookData?.pages}
                />
              </FormControl>
            </SimpleGrid>
            {!bookData?.image && (
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedImage(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
            )}
            <HStack w="full" spacing={4}>
              <Button
                onClick={() => navigate(-1)}
                colorScheme="red"
                w="full"
              >
                Cancel
              </Button>
              <Button type="submit" colorScheme="teal" w="full">
                {bookData ? "Edit Book" : "Create Book"}
              </Button>
            </HStack>
          </VStack>
        </Flex>
      </form>
    </Box>
  );
}
