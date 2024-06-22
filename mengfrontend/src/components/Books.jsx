import { Card, Heading, Image, Text, VStack, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
    <Link to={`/books/${id}`}>
      <Card
        key={id}
        my={10}
        mx={3}
        p={6}
        cursor="pointer"
        boxShadow="lg"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
        w="250px" 
        h="100%" 
      >
        <VStack spacing={4}>
          <Image
            w="100%"
            h="200px" 
            src={`http://localhost:8000/${image}`}
            alt={title}
            borderRadius="md"
            objectFit="cover"
          />
          <Box textAlign="center">
            <Heading size="md" mb={2} noOfLines={2}>
              {title} ({year})
            </Heading>
            <Text fontSize="smaller" color="gray.500" noOfLines={1}>
              by {author}
            </Text>
          </Box>
          <Text fontSize="sm" color="gray.600">
            <strong>Publisher:</strong> {publisher}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}
