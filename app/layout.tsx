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
      <body>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}