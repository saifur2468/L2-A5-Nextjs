import './globals.css';
import type { Metadata } from 'next';

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './components/ui/theme-provider';

export const metadata: Metadata = {
  title: 'RentNest',
  description: 'Rental property marketplace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />

          <Navbar />

          <main>{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}