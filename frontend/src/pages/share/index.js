import React, { useState } from "react";
import axios from "axios";
import {
  useToast,
  Button,
  Input,
  Text,
  Flex,
  Container,
} from "@chakra-ui/react";
import { shareMovie } from "../../services/movie";
import { getUserEmail, getYouTubeVideoKey } from "../../utils";
const Share = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const toast = useToast();
  const handleVideoUrlChange = async (event) => {
    const url = event.target.value;
    setVideoUrl(url);
  };
  const handleShareVideo = async () => {
    if (videoUrl != null) {
      const videoKey = getYouTubeVideoKey(videoUrl);
      if (videoKey != null) {
        try {
          const response = await axios.get(
            `http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoKey}&format=json`
          );
          if (response) {
            const videoCredential = {
              author: getUserEmail(),
              title: response.data.title,
              videoKey: videoKey,
            };
            const video = await shareMovie(videoCredential);
            if (video.video != null) {
              toast({
                title: "Shared Video Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            } else {
              const message = video.message;
              toast({
                title: message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        toast({
          title: "Invalid URL",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container maxW="600px">
      <Text>Share a Youtube movie</Text>
      <Flex justifyContent="center" flexDirection="column" gap={2}>
        <Flex gap={2} alignItems="center">
          <Text minW="fit-content">Youtube URL:</Text>
          <Input onChange={handleVideoUrlChange} />
        </Flex>
        <Button onClick={handleShareVideo}>Share</Button>
      </Flex>
    </Container>
  );
};

export default Share;
