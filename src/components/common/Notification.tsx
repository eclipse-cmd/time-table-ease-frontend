'use client';
import { GlobalContext, actionCreator } from '@/store';
import { Alert, AlertDescription, AlertIcon, AlertProps, Box, Button } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

// TODO: Fix the notification timeout bug

export const Notification: React.FC<AlertProps> = ({ width = '98%', ...rest }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { message, type } = state.notification;

  const closeNotification = () => {
    dispatch({
      type: actionCreator.SET_NOTIFICATION,
      payload: { message: '' },
    });
  };

  return message && message.length > 1 ? (
    <Box className="relative w-full mb-4">
      <Box className="relative z-0" width={width} mx="auto">
        <Alert {...rest} status={type} borderRadius="4" p="3">
          <AlertIcon />
          <AlertDescription fontSize="md" fontWeight="medium" className="text-black">
            {message}
          </AlertDescription>
        </Alert>
      </Box>
      <Button
        onClick={closeNotification}
        className="absolute right-[12px] top-[50%] z-1 translate-y-[-50%]"
        _hover={{ background: '#1d2a3912' }}
      >
        <AiOutlineClose />
      </Button>
    </Box>
  ) : null;
};
