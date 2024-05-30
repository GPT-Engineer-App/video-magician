import { useState } from "react";
import { Container, VStack, HStack, Button, Box, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, IconButton } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStop, FaUpload } from "react-icons/fa";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    const videoElement = document.getElementById("video-player");
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    const videoElement = document.getElementById("video-player");
    videoElement.pause();
    videoElement.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(videoURL);
    }
  };

  const handleTimeUpdate = () => {
    const videoElement = document.getElementById("video-player");
    setCurrentTime(videoElement.currentTime);
  };

  const handleLoadedMetadata = () => {
    const videoElement = document.getElementById("video-player");
    setVideoDuration(videoElement.duration);
  };

  const handleSliderChange = (value) => {
    const videoElement = document.getElementById("video-player");
    videoElement.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <input type="file" accept="video/*" onChange={handleUpload} style={{ display: "none" }} id="upload-input" />
        <Button as="label" htmlFor="upload-input" leftIcon={<FaUpload />}>
          Upload Video
        </Button>
        {videoFile && (
          <Box width="100%">
            <video id="video-player" width="100%" src={videoFile} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} controls={false} />
            <HStack spacing={4} mt={4} justifyContent="center">
              <IconButton aria-label="Play/Pause" icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={handlePlayPause} />
              <IconButton aria-label="Stop" icon={<FaStop />} onClick={handleStop} />
            </HStack>
            <Slider aria-label="slider-ex-1" value={currentTime} min={0} max={videoDuration} onChange={handleSliderChange} mt={4}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt={2}>
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")}{" "}
              / {Math.floor(videoDuration / 60)}:
              {Math.floor(videoDuration % 60)
                .toString()
                .padStart(2, "0")}
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
