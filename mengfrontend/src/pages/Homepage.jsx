import { Flex, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";
import FloatingCreateButton from "../components/Button";

export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        setBooks(booksData.books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <Flex w="100%" justify="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={3}
        justifyItems="center"
        alignItems="start"
      >
        {books.map((book, index) => (
          <Books key={`${book.id} ${book.title}`} {...book} boxSize="250px" />
        ))}
      </Grid>
      <FloatingCreateButton />
    </Flex>
  );
}
