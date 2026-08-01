import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
export const metadata = {
  title: 'RentNest',
  description: 'Rental property marketplace',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}