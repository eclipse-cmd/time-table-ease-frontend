'use client';
import { setLocalStorage } from '@/core';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider as Provider } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function ChakraProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => setLocalStorage('light', 'chakra-ui-color-mode', false));

  return (
    <CacheProvider>
      <Provider>{children}</Provider>
    </CacheProvider>
  );
}
