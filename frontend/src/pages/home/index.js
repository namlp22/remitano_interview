import React, { useEffect, useState } from "react";
import { Container, Flex, Box, Button, Text } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { getMovieList } from "../../services/movie";

const MovieSection = (movie) => {
  const { title, videoKey, author } = movie.movie;

  return (
    <Flex>
      <Box p="5">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Box>
      <Box p="5">
        <Text>{title}</Text>
        <Text>Shared by: {author}</Text>
        <Flex gap={2}>
          <Button>
            <ArrowUpIcon w={8} h={8} color="black" />
          </Button>
          <Button>
            <ArrowDownIcon w={8} h={8} color="black" />
          </Button>
        </Flex>
        <Text>Description:</Text>
      </Box>
    </Flex>
  );
};

const Home = () => {
  const [movieList, setMovieList] = useState(null)

  const handleFetchMovieList = async () => {
    const movie = await getMovieList();
    if(movie) {
      setMovieList(movie);
    }
  }

  useEffect(() => {
    handleFetchMovieList()
  }, []);
  return (
    <Container maxW="960px"> 
     {movieList?.map((movie, index) => {
      return (
        <MovieSection key={index} movie={movie} />
      )
     })}
    </Container>
  );
};

export default Home;
