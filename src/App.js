import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
  Alert,
  AlertIcon,
  AlertDescription,
  Button,
  Container,
  Box,
  AlertTitle,
} from '@chakra-ui/react';

function App() {
  const [userResponse, setUserResponse] = useState(false);

  const notifyUser = async (
    notificationText = 'Thank you for enabling notification'
  ) => {
    if (!('Notification' in window)) {
      alert('Browser does not support notifications');
    } else if (Notification.permission === 'granted') {
      const notification = new Notification(notificationText);
    } else if (Notification.permission !== 'denied') {
      await Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const notification = new Notification(notificationText);
        }
      });
    }
  };

  const enableNotifications = async () => {
    await notifyUser();
    setUserResponse(true);
  };

  const disableNotifications = () => {
    setUserResponse(true);
  };

  return !userResponse && !(Notification.permission === 'granted') ? (
    <ChakraProvider theme={theme}>
      <Container>
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Notifications</AlertTitle>
            <AlertDescription>
              Would you like to enable notifications
            </AlertDescription>
          </Box>
          <Button colorScheme={'teal'} size="sm" onClick={enableNotifications}>
            Sure
          </Button>
          <Button colorScheme={'gray'} size="sm" onClick={disableNotifications}>
            Pass
          </Button>
        </Alert>
      </Container>
    </ChakraProvider>
  ) : Notification.permission === 'granted' ? (
    <ChakraProvider theme={theme}>
      <Button
        colorScheme={'gray'}
        size="sm"
        onClick={() => notifyUser('Thank you for enabling!')}
      >
        Click to show a thank you
      </Button>
    </ChakraProvider>
  ) : (
    <>
      <h1>You have disabled notifications</h1>
    </>
  );
}

export default App;
