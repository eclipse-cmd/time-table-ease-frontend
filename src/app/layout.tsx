import { ChakraProvider } from '@/core';
import { AuthProvider, GlobalProvider } from '@/store';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Time table ease',
  description: 'Timetable auto generator for schools',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <AuthProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
