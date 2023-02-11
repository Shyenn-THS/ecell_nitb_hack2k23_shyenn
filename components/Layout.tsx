import { ReactNode } from 'react';
import Footer from './Layout/Footer';
import Navbar from './Layout/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pb-10">{children}</main>
      <Footer />
    </>
  );
}
